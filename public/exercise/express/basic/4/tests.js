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

async function testListRoute() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Cannot import app");
    return false;
  }

  try {
    const res = await supertest(app).get('/items');
    assert.ok(res.statusCode === 200);
    assert.ok(Array.isArray(res.body));
    console.log('✔ GET /items returned an array');
    return true;
  } catch (err) {
    console.log('❌ GET /items test failed:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const listOk = await testListRoute();
  if (syntaxOk && listOk) {
    console.log('\n✅ All tests passed for List Items');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for List Items');
    process.exit(1);
  }
})();
