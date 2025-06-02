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

async function testGetById() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Cannot import app.");
    return false;
  }

  try {
    const res = await supertest(app).get('/items/1');
    assert.ok(res.statusCode >= 200 && res.statusCode < 400);
    assert.ok(typeof res.body === 'object');
    console.log('✔ GET /items/1 returned object with status:', res.statusCode);
    return true;
  } catch (err) {
    console.log('❌ GET by ID test failed:', err.message);
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxOk = await checkSyntax();
  const getIdOk = await testGetById();

  const allPassed = syntaxOk && getIdOk;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();

  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      console.log('\n✅ All tests passed for GET by ID');
      process.exit(0);
    } catch (e) {
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log('\n❌ Test failed for GET by ID');
    console.log(`❌ Tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
