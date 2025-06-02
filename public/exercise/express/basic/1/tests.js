const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const supertest = require('supertest');
const assert = require('assert');

console.clear();

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

function readAttempts() {
  try {
    return fs.existsSync('attempts.tests')
      ? JSON.parse(fs.readFileSync('attempts.tests')).count || 1
      : 1;
  } catch {
    return 1;
  }
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.tests', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write attempts.tests: ${e}`);
  }
}

async function checkSyntax() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  return results[0].errorCount === 0;
}

function checkStructure() {
  const lower = js.toLowerCase();
  let passed = true;

  if (!lower.includes("require('express'") && !lower.includes('require("express"')) {
    console.log("❌ Missing: require('express')");
    passed = false;
  } else {
    console.log("✔ Found: require('express')");
  }

  if (!lower.includes('express()')) {
    console.log("❌ Missing: express() app creation");
    passed = false;
  } else {
    console.log("✔ Found: express() call");
  }

  if (!lower.includes('listen(')) {
    console.log("❌ Missing: app.listen()");
    passed = false;
  } else {
    console.log("✔ Found: app.listen()");
  }

  return passed;
}

async function checkServer() {
  let app;
  try {
    app = require(filePath);
  } catch (err) {
    console.log("❌ Could not import Express app. Make sure to export app using `module.exports = app`.");
    return false;
  }

  try {
    const res = await supertest(app).get('/');
    const ok = res.statusCode >= 200 && res.statusCode < 400;
    assert.ok(ok, `Expected 2xx/3xx status, got ${res.statusCode}`);
    console.log(`✔ Server responded with status ${res.statusCode}`);
    return true;
  } catch (err) {
    console.log("❌ Server failed to respond to GET /");
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxOk = await checkSyntax();
  if (!syntaxOk) {
    console.log('\n❌ Syntax errors prevent further checks.');
    process.exit(1);
  }

  const structureOk = checkStructure();
  const serverOk = await checkServer();

  const allPassed = syntaxOk && structureOk && serverOk;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();

  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write results.tests: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ Tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
