const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { ESLint } = require("eslint");
const { HTMLHint } = require("htmlhint");

const projectDir = path.resolve(__dirname);
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
  if (fs.existsSync(resultFile)) fs.unlinkSync(resultFile);
}

function validateProjectStructure() {
  if (!fs.existsSync(indexPath)) {
    return { valid: false, error: "index.html not found" };
  }

  const html = readFileSafe(indexPath);
  const $ = cheerio.load(html);
  const cssFiles = $('link[rel="stylesheet"]').map((_, el) => $(el).attr("href")).get();
  const jsFiles = $('script[src]').map((_, el) => $(el).attr("src")).get();

  return { valid: true, html, $, cssFiles, jsFiles };
}

function loadFilesContent(baseDir, files) {
  return files.map((file) => readFileSafe(path.join(baseDir, file))).join("\n");
}

async function checkJSSyntax(jsCode) {
  const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: {
      env: { browser: true, es2021: true },
      extends: "eslint:recommended"
    }
  });

  const results = await eslint.lintText(jsCode);
  const errors = results[0].messages.filter((msg) => msg.severity === 2);
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  clearResultFile();

  const struct = validateProjectStructure();
  if (!struct.valid) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors: [struct.error] };
  }

  const { html, $, cssFiles, jsFiles } = struct;
  const css = loadFilesContent(projectDir, cssFiles);
  const js = loadFilesContent(projectDir, jsFiles);
  const errors = [];

  // HTML Checks
  const navLinks = $("nav a").map((_, el) => $(el).attr("href")).get();
  if (!navLinks.includes("#home") || !navLinks.includes("#about") || !navLinks.includes("#contact")) {
    errors.push("Navigation links for Home, About, and Contact sections are missing.");
  }

  // CSS Checks
  if (!/transition\s*:/i.test(css)) {
    errors.push("Missing CSS transitions for smooth page changes.");
  }

  // JS Checks
  if (!/addEventListener\s*\(\s*["']popstate["']\s*,/i.test(js)) {
    errors.push("Missing JS handling for popstate event to manage routing.");
  }

  // HTMLHint
  const htmlHints = HTMLHint.verify(html);
  if (htmlHints.length > 0) {
    errors.push("HTMLHint errors:\n" + htmlHints.map(h => `${h.line}:${h.col} ${h.message}`).join("\n"));
  }

  // JS Linting
  const jsLint = await checkJSSyntax(js);
  if (!jsLint.valid) {
    errors.push("JS Lint errors:\n" + jsLint.errors.map(e => `${e.line}:${e.column} ${e.message}`).join("\n"));
  }

  // Final outcome
  if (errors.length > 0) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors };
  }

  // All tests passed
  fs.writeFileSync(resultFile, JSON.stringify({
    project: "hard/1 Single Page Application",
    passed: true,
    timestamp: new Date().toISOString()
  }, null, 2));

  if (fs.existsSync(attemptsFile)) fs.unlinkSync(attemptsFile);
  return { success: true, attempts: 0, errors: [] };
}

runTests().then(res => {
  if (res.success) {
    console.log("✅ All tests passed for Single Page Application!");
  } else {
    console.error(`❌ Attempt #${res.attempts} failed:`);
    res.errors.forEach(err => console.error(" - " + err));
  }
});
