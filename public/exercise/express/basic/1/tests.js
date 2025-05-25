const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const assert = require('assert');

console.clear();

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

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
  const syntaxOk = await checkSyntax();
  const structureOk = checkStructure();
  const serverOk = await checkServer();

  if (syntaxOk && structureOk && serverOk) {
    console.log('\n✅ All tests passed for Question 1: Setup Server');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for Question 1');
    process.exit(1);
  }
})();
