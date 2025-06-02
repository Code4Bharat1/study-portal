const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const htmlhint = require("htmlhint").HTMLHint;
const { ESLint } = require("eslint");
const { JSDOM } = require("jsdom");

const projectDir = path.resolve(__dirname, "../basic/3");
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

  // Check for <ul>
  if ($("ul").length === 0) errors.push("Missing <ul> element");

  // Check if there are any <li> (0 or more is okay, but <ul> should be present)
  if ($("ul li").length === 0) errors.push("No <li> elements inside <ul>");

  // CSS checks for borders and hover effects
  if (!css.includes("border")) errors.push("CSS missing 'border' styling");
  if (!css.includes(":hover")) errors.push("CSS missing ':hover' effects");

  // JS checks for dynamic add/remove tasks (simple heuristics)
  const jsAddPatterns = [/appendChild/, /innerHTML/, /insertAdjacentHTML/, /push/, /\.addEventListener.*add/i];
  const jsRemovePatterns = [/remove\(/, /removeChild/, /\.addEventListener.*remove/i];

  const jsAddsTasks = jsAddPatterns.some((regex) => regex.test(js));
  const jsRemovesTasks = jsRemovePatterns.some((regex) => regex.test(js));

  if (!jsAddsTasks) errors.push("JS does not appear to add tasks dynamically");
  if (!jsRemovesTasks) errors.push("JS does not appear to remove tasks dynamically");

  // HTMLHint check
  const htmlHints = htmlhint.verify(html);
  if (htmlHints.length > 0) {
    errors.push(`HTMLHint errors: ${htmlHints.map(h => `${h.line}:${h.col} ${h.message}`).join("; ")}`);
  }

  // JS lint check
  const jsLint = await checkJSSyntax(js);
  if (!jsLint.valid) {
    const lintErrors = jsLint.errors.map(e => `${e.line}:${e.column} ${e.message}`);
    errors.push(`JS lint errors: ${lintErrors.join("; ")}`);
  }

  if (errors.length > 0) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors };
  }

  // All tests passed: write results.tests
  fs.writeFileSync(
    resultFile,
    JSON.stringify({
      project: "basic/3 Interactive To-Do List",
      
      attempts: fs.existsSync(attemptsFile) ? parseInt(fs.readFileSync(attemptsFile, "utf8"), 10) : 0,
      timestamp: new Date().toISOString(),
    })
  );

  // Reset attempts on success
  if (fs.existsSync(attemptsFile)) fs.unlinkSync(attemptsFile);

  return { success: true, attempts: 0, errors: [] };
}

// Run tests and output results
runTests().then((result) => {
  if (result.success) {
    console.log("All tests passed!");
  } else {
    console.error(`Tests failed. Attempt #${result.attempts}`);
    result.errors.forEach((e) => console.error("- " + e));
  }
});
