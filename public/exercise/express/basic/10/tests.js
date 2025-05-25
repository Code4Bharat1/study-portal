const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const supertest = require('supertest');
const assert = require('assert');

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

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
  const syntaxOk = await checkSyntax();
  const notFoundOk = await test404Handler();
  if (syntaxOk && notFoundOk) {
    console.log('\n✅ All tests passed for 404 Handler');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for 404 Handler');
    process.exit(1);
  }
})();
