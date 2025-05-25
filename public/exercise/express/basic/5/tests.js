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
  const syntaxOk = await checkSyntax();
  const getIdOk = await testGetById();
  if (syntaxOk && getIdOk) {
    console.log('\n✅ All tests passed for GET by ID');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for GET by ID');
    process.exit(1);
  }
})();
