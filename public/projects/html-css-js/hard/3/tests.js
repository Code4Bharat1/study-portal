const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { ESLint } = require("eslint");
const { HTMLHint } = require("htmlhint");

const projectDir = path.resolve(__dirname);
const indexPath = path.join(projectDir, "index.html");
const attemptsPath = path.join(projectDir, "attempts.txt");
const resultPath = path.join(projectDir, "results.tests");

// Helpers
function readFileSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function incrementAttempts() {
  let attempts = 0;
  if (fs.existsSync(attemptsPath)) {
    attempts = parseInt(fs.readFileSync(attemptsPath, "utf8")) || 0;
  }
  attempts++;
  fs.writeFileSync(attemptsPath, attempts.toString());
  return attempts;
}

function clearResultFile() {
  if (fs.existsSync(resultPath)) fs.unlinkSync(resultPath);
}

function validateStructure() {
  if (!fs.existsSync(indexPath)) return { valid: false, error: "Missing index.html" };

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
  const eslint = new ESLint({ useEslintrc: false, baseConfig: { extends: "eslint:recommended" } });
  const results = await eslint.lintText(jsCode);
  const errors = results[0].messages.filter((m) => m.severity === 2);
  return { valid: errors.length === 0, errors };
}

async function runTests() {
  clearResultFile();
  const errors = [];

  const struct = validateStructure();
  if (!struct.valid) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors: [struct.error] };
  }

  const { html, $, cssFiles, jsFiles } = struct;
  const css = loadFilesContent(projectDir, cssFiles);
  const js = loadFilesContent(projectDir, jsFiles);

  // --- HTML structure checks ---
  if ($(".sidebar").length === 0) errors.push("Missing sidebar (class `.sidebar`).");
  if ($("canvas").length === 0) errors.push("Missing <canvas> element for chart.");
  if ($("table").length === 0) errors.push("Missing <table> for data display.");

  // --- CSS checks ---
  if (!/display\s*:\s*grid/i.test(css)) errors.push("CSS Grid layout not detected.");
  if (!/grid-template-columns|rows/i.test(css)) errors.push("Missing grid-template in CSS.");

  // --- JS checks ---
  if (!/fetch\s*\(\s*['"]\w+\.json['"]\s*\)/i.test(js)) {
    errors.push("JS is not fetching from a JSON file.");
  }

  if (!/insertRow|createElement|innerHTML|textContent/.test(js)) {
    errors.push("JS does not populate data into table/chart.");
  }

  // --- Linting ---
  const htmlErrors = HTMLHint.verify(html);
  if (htmlErrors.length > 0) {
    errors.push("HTMLHint errors:\n" + htmlErrors.map(e => `${e.line}:${e.col} ${e.message}`).join("\n"));
  }

  const jsSyntax = await checkJSSyntax(js);
  if (!jsSyntax.valid) {
    errors.push("ESLint errors:\n" + jsSyntax.errors.map(e => `${e.line}:${e.column} ${e.message}`).join("\n"));
  }

  // --- Results ---
  if (errors.length > 0) {
    const attempts = incrementAttempts();
    return { success: false, attempts, errors };
  }

  // All tests passed
  fs.writeFileSync(resultPath, JSON.stringify({
    project: "hard/3 Custom Dashboard",
    passed: true,
    timestamp: new Date().toISOString()
  }, null, 2));
  if (fs.existsSync(attemptsPath)) fs.unlinkSync(attemptsPath);

  return { success: true, attempts: 0, errors: [] };
}

runTests().then(res => {
  if (res.success) {
    console.log("✅ All tests passed for Custom Dashboard!");
  } else {
    console.error(`❌ Attempt #${res.attempts} failed:`);
    res.errors.forEach(e => console.error(" - " + e));
  }
});
