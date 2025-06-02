const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const supertest = require('supertest');
const assert = require('assert');

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

function readAttempts() {
  try {
    return fs.existsSync('attempts.tests') ? JSON.parse(fs.readFileSync('attempts.tests')).count || 1 : 1;
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

async function test404Handler() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Cannot import app.");
    return false;
  }

  try {
    const res = await supertest(app).get('/nonexistentroute');
    assert.strictEqual(res.statusCode, 404);
    console.log('✔ GET /nonexistentroute returned 404 as expected');
    return true;
  } catch (err) {
    console.log('❌ 404 handler test failed:', err.message);
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxOk = await checkSyntax();
  const notFoundOk = await test404Handler();

  const allPassed = syntaxOk && notFoundOk;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();

  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      console.log('\n✅ All tests passed for 404 Handler');
      process.exit(0);
    } catch (e) {
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log('\n❌ Test failed for 404 Handler');
    console.log(`❌ Tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
