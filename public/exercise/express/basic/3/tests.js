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

async function testPostData() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Could not import Express app.");
    return false;
  }

  try {
    const response = await supertest(app)
      .post('/data')
      .send({ name: 'Test', value: 123 })
      .set('Content-Type', 'application/json');

    assert.ok(response.statusCode >= 200 && response.statusCode < 400);
    assert.ok(response.body);
    console.log(`✔ POST /data responded with status ${response.statusCode}`);
    return true;
  } catch (err) {
    console.log('❌ POST /data failed:', err.message);
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxOk = await checkSyntax();
  const postOk = await testPostData();

  const allPassed = syntaxOk && postOk;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();

  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      console.log('\n✅ All tests passed for POST Data');
      process.exit(0);
    } catch (e) {
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log('\n❌ Test failed for POST Data');
    console.log(`❌ Tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();
