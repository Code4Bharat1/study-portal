const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const htmlhint = require("htmlhint").HTMLHint;
const { ESLint } = require("eslint");

const projectDir = path.resolve(__dirname, "../basic/2");
const indexPath = path.join(projectDir, "index.html");
const attemptsFile = path.join(projectDir, "attempts.txt");
const resultFile = path.join(projectDir, "results.tests");

function readFileSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function incrementAttempts() {
  let attempts = 0;
  if (fs.existsSync(attemptsFile)) {
    attempts = parseInt(fs.readFileSync(attemptsFile, "utf8"), 10) || 0;
  }
  attempts++;
  fs.writeFileSync(attemptsFile, attempts.toString());
  return attempts;
}

function clearResultFile() {
  if (fs.existsSync(resultFile)) {
    fs.unlinkSync(resultFile);
  }
}

function validateProjectStructure() {
  if (!fs.existsSync(indexPath)) {
    return { valid: false, error: "index.html not found" };
  }
  const html = fs.readFileSync(indexPath, "utf8");
  const $ = cheerio.load(html);

  // Gather linked CSS and JS files
  const cssFiles = $('link[rel="stylesheet"]')
    .map((_, el) => $(el).attr("href"))
    .get()
    .filter((href) => href && href.endsWith(".css"));
  const jsFiles = $('script[src]')
    .map((_, el) => $(el).attr("src"))
    .get()
    .filter((src) => src && src.endsWith(".js"));

  return { valid: true, html, $, cssFiles, jsFiles };
}

function loadFilesContent(baseDir, files) {
  return files
    .map((file) => {
      const fullPath = path.join(baseDir, file);
      return readFileSafe(fullPath);
    })
    .join("\n");
}

async function checkJSSyntax(jsCode) {
  const eslint = new ESLint({ useEslintrc: false, baseConfig: { env: { browser: true, es6: true } } });
  const results = await eslint.lintText(jsCode);
  const errors = results[0].messages.filter((msg) => msg.severity === 2);
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  clearResultFile();

  const struct = validateProjectStructure();
  if (!struct.valid) {
    console.error(struct.error);
    const attempts = incrementAttempts();
    return { success: false, attempts, errors: [struct.error] };
  }

  const { html, $, cssFiles, jsFiles } = struct;

  const css = loadFilesContent(projectDir, cssFiles);
  const js = loadFilesContent(projectDir, jsFiles);

  const errors = [];

  // HTML structure tests
  if ($("h1").length === 0) errors.push("Missing <h1> title");
  if ($("h2, h3").length === 0) errors.push("No secondary headings (<h2> or <h3>)");
  if ($("p").length < 2) errors.push("Less than 2 paragraphs");
  if ($("img").length === 0) errors.push("Missing image");

  // CSS style tests (title centered and margins)
  if (!css.includes("text-align: center") && !css.includes("text-align:center")) {
    errors.push("Title is not centered in CSS");
  }
  if (!css.match(/margin|padding/)) {
    errors.push("CSS should include margins or padding");
  }

  // JS dark mode toggle detection
  const darkModeRegex = /classList\.toggle|classList\.add|classList\.remove|classList\.contains/;
  const darkModeInJS = darkModeRegex.test(js) && /dark[-_]mode/.test(js);
  if (!darkModeInJS) errors.push("JS does not toggle dark mode class");

  // HTMLHint validation
  const htmlHints = htmlhint.verify(html);
  if (htmlHints.length > 0) {
    errors.push(`HTMLHint errors: ${htmlHints.map(h => `${h.line}:${h.col} ${h.message}`).join("; ")}`);
  }

  // JS syntax check
  const jsLint = await checkJSSyntax(js);
  if (!jsLint.valid) {
    const lintErrors = jsLint.errors.map(e => `${e.line}:${e.column} ${e.message}`);
    errors.push(`JS lint errors: ${lintErrors.join("; ")}`);
  }

  if (errors.length > 0) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors };
  }

  // All tests passed
  fs.writeFileSync(
    resultFile,
    JSON.stringify({
      project: "basic/2 Styled Blog Post",
      passed: true,
      attempts: fs.existsSync(attemptsFile) ? parseInt(fs.readFileSync(attemptsFile, "utf8"), 10) : 0,
      timestamp: new Date().toISOString(),
    })
  );

  // Reset attempts since success
  if (fs.existsSync(attemptsFile)) fs.unlinkSync(attemptsFile);

  return { success: true, attempts: 0, errors: [] };
}

// Run tests and output result
runTests().then((result) => {
  if (result.success) {
    console.log("All tests passed!");
  } else {
    console.error(`Tests failed. Attempt #${result.attempts}`);
    result.errors.forEach((e) => console.error("- " + e));
  }
});
