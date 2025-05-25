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

async function testJsonParsing() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Cannot import app.");
    return false;
  }

  try {
    const res = await supertest(app)
      .post('/items')
      .send({ name: 'Sample' })
      .set('Content-Type', 'application/json');
    assert.ok(res.statusCode >= 200 && res.statusCode < 400);
    assert.ok(res.body && typeof res.body === 'object');
    console.log('✔ JSON body parsed and POST /items returned:', res.body);
    return true;
  } catch (err) {
    console.log('❌ POST with JSON body failed:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const parseOk = await testJsonParsing();
  if (syntaxOk && parseOk) {
    console.log('\n✅ All tests passed for JSON Parsing');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for JSON Parsing');
    process.exit(1);
  }
})();
