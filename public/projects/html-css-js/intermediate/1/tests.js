const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const htmlhint = require("htmlhint").HTMLHint;
const { ESLint } = require("eslint");

const projectDir = path.resolve(__dirname, "../intermediate/1");
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

  // Check presence of navigation bar
  if ($("nav").length === 0) errors.push("Missing <nav> element");

  // Check presence of hero section
  if ($("section.hero, .hero, #hero").length === 0) errors.push("Missing hero section (.hero, #hero or <section class='hero'>)");

  // Check presence of contact form
  if ($("form").length === 0) errors.push("Missing <form> element for contact");

  // CSS Flexbox or Grid check (simple check)
  if (!/(display\s*:\s*flex|display\s*:\s*grid)/i.test(css)) errors.push("CSS does not use Flexbox or Grid for layout");

  // Media queries presence (responsiveness)
  if (!/@media/.test(css)) errors.push("CSS missing media queries for responsiveness");

  // JS form validation check (simple heuristic)
  if (!/(form|submit).*(addEventListener|onsubmit|validate)/i.test(js)) errors.push("JS does not appear to validate form on submit");

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
      project: "intermediate/1 Responsive Landing Page",
      
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
    console.log("All tests passed for Responsive Landing Page!");
  } else {
    console.error(`Tests failed. Attempt #${result.attempts}`);
    result.errors.forEach((e) => console.error("- " + e));
  }
});
