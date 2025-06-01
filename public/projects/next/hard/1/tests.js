const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { JSDOM } = require("jsdom");
const htmlhint = require("htmlhint").HTMLHint;
const { ESLint } = require("eslint");

const attemptsFilePath = path.resolve(__dirname, "../attempts.txt");
const resultFilePath = path.resolve(__dirname, "../results.tests");
const baseDir = path.resolve(__dirname, "../");
const indexPath = path.join(baseDir, "index.html");

// Load attempts count from attempts.txt or start at 0
function loadAttempts() {
  if (!fs.existsSync(attemptsFilePath)) return 0;
  try {
    const attemptsStr = fs.readFileSync(attemptsFilePath, "utf8").trim();
    const attemptsNum = parseInt(attemptsStr, 10);
    return isNaN(attemptsNum) ? 0 : attemptsNum;
  } catch {
    return 0;
  }
}

// Save attempts count to attempts.txt
function saveAttempts(attempts) {
  fs.writeFileSync(attemptsFilePath, attempts.toString(), "utf8");
}

function readFileSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function validateBasicHTMLProject(projectDir) {
  const indexPath = path.join(projectDir, "index.html");
  const results = {
    indexHtmlExists: false,
    linkedCssFiles: [],
    linkedJsFiles: [],
  };
  if (!fs.existsSync(indexPath)) return results;
  results.indexHtmlExists = true;
  const htmlContent = fs.readFileSync(indexPath, "utf8");
  const $ = cheerio.load(htmlContent);

  const cssLinks = $('link[rel="stylesheet"]')
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter((href) => href && href.endsWith(".css"));

  const jsLinks = $('script[src]')
    .map((_, el) => $(el).attr("src"))
    .get()
    .filter((src) => src && src.endsWith(".js"));

  results.linkedCssFiles = cssLinks;
  results.linkedJsFiles = jsLinks;

  return results;
}

function loadFiles(projectDir, files) {
  return files
    .map((file) => {
      const fullPath = path.join(projectDir, file);
      return readFileSafe(fullPath);
    })
    .join("\n");
}

function testPortfolioProject(html, css, js) {
  const $ = cheerio.load(html);
  return {
    hasHeader: $("header").length > 0,
    hasBioSection: $("section").text().toLowerCase().includes("bio"),
    hasFooter: $("footer").length > 0,
    hasContactButton: $('button:contains("Contact Me")').length > 0,
    htmlHints: htmlhint.verify(html),
    jsIncludesAlert: js.includes("alert("),
  };
}

function testBlogPostProject(html, css, js) {
  const $ = cheerio.load(html);
  return {
    hasTitle: $("h1").length > 0,
    hasHeadings: $("h2,h3").length > 0,
    hasParagraphs: $("p").length >= 2,
    hasImage: $("img").length > 0,
    titleCentered: css.includes("text-align: center"),
    jsTogglesDarkMode:
      /classList\.toggle|addEventListener\(.+dark-mode/.test(js),
  };
}

function testToDoListProject(html, css, js, document) {
  const ul = document.querySelector("ul");
  const listItems = document.querySelectorAll("ul li");
  return {
    hasUL: !!ul,
    hasListItems: listItems.length >= 0,
    cssHasBorders: css.includes("border"),
    cssHoverEffects: css.includes(":hover"),
    jsAddsTasks: /appendChild|innerHTML/.test(js),
    jsRemovesTasks: /remove\(\)|removeChild/.test(js),
  };
}

async function checkJSSyntax(js) {
  const eslint = new ESLint({ useEslintrc: false });
  const results = await eslint.lintText(js);
  const errors = results[0].messages.filter((msg) => msg.severity === 2);
  return { valid: errors.length === 0, errors };
}

async function main() {
  let attempts = loadAttempts();

  const structure = validateBasicHTMLProject(baseDir);

  function failAndExit(message, details) {
    console.error("❌ " + message);
    if (details && details.length > 0) {
      details.forEach((d) => console.error("- " + d));
    }
    attempts++;
    saveAttempts(attempts);
    console.log(`Attempts so far: ${attempts}`);
    process.exit(1);
  }

  if (!structure.indexHtmlExists) {
    return failAndExit("index.html file not found.");
  }

  if (structure.linkedCssFiles.length === 0) {
    return failAndExit("No linked CSS file found in index.html.");
  }

  if (structure.linkedJsFiles.length === 0) {
    return failAndExit("No linked JS file found in index.html.");
  }

  const html = readFileSafe(indexPath);
  const css = loadFiles(baseDir, structure.linkedCssFiles);
  const js = loadFiles(baseDir, structure.linkedJsFiles);

  // JS Syntax check
  const jsSyntax = await checkJSSyntax(js);
  if (!jsSyntax.valid) {
    const msgs = jsSyntax.errors.map(
      (e) => `${e.message} at line ${e.line}, col ${e.column}`
    );
    return failAndExit("JavaScript syntax errors:", msgs);
  }

  // Personal Portfolio tests
  const portfolio = testPortfolioProject(html, css, js);
  let portfolioErrors = [];
  if (!portfolio.hasHeader) portfolioErrors.push("Missing <header>");
  if (!portfolio.hasBioSection) portfolioErrors.push("Missing bio section");
  if (!portfolio.hasFooter) portfolioErrors.push("Missing <footer>");
  if (!portfolio.hasContactButton) portfolioErrors.push('Missing "Contact Me" button');
  if (portfolio.htmlHints.length > 0) {
    portfolioErrors.push(
      "HTMLHint errors: " +
        portfolio.htmlHints.map((h) => `${h.message} at line ${h.line}, col ${h.col}`).join("; ")
    );
  }
  if (!portfolio.jsIncludesAlert) portfolioErrors.push("Missing alert() call in JS");
  if (portfolioErrors.length > 0) {
    return failAndExit("Personal Portfolio project tests failed.", portfolioErrors);
  }

  // Styled Blog Post tests
  const blog = testBlogPostProject(html, css, js);
  let blogErrors = [];
  if (!blog.hasTitle) blogErrors.push("Missing <h1> title");
  if (!blog.hasHeadings) blogErrors.push("Missing <h2> or <h3> headings");
  if (!blog.hasParagraphs) blogErrors.push("Missing enough <p> paragraphs (at least 2)");
  if (!blog.hasImage) blogErrors.push("Missing <img>");
  if (!blog.titleCentered) blogErrors.push("Title not centered in CSS");
  if (!blog.jsTogglesDarkMode) blogErrors.push("JS does not toggle dark mode");
  if (blogErrors.length > 0) {
    return failAndExit("Styled Blog Post project tests failed.", blogErrors);
  }

  // Interactive To-Do List tests - simulate DOM with js loaded
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
  });

  structure.linkedJsFiles.forEach((jsFile) => {
    const jsCode = readFileSafe(path.join(baseDir, jsFile));
    const scriptEl = dom.window.document.createElement("script");
    scriptEl.textContent = jsCode;
    dom.window.document.body.appendChild(scriptEl);
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  const document = dom.window.document;
  const todo = testToDoListProject(html, css, js, document);
  let todoErrors = [];
  if (!todo.hasUL) todoErrors.push("Missing <ul> element");
  if (!todo.jsAddsTasks) todoErrors.push("JS does not add tasks dynamically");
  if (!todo.jsRemovesTasks) todoErrors.push("JS does not remove tasks dynamically");
  if (!todo.cssHasBorders) todoErrors.push("CSS missing border styles");
  if (!todo.cssHoverEffects) todoErrors.push("CSS missing :hover styles");
  if (todoErrors.length > 0) {
    return failAndExit("Interactive To-Do List project tests failed.", todoErrors);
  }

  // All tests passed - write results.tests and reset attempts?
  // (We can leave attempts as is, or reset to 0)
  fs.writeFileSync(
    resultFilePath,
    JSON.stringify(
      {
        attempts,
        lastRun: new Date().toISOString(),
        passed: true,
        linkedCssFiles: structure.linkedCssFiles,
        linkedJsFiles: structure.linkedJsFiles,
      },
      null,
      2
    )
  );

  console.log("✅ All tests passed!");
  console.log(`Attempts: ${attempts}`);
  process.exit(0);
}

main();
