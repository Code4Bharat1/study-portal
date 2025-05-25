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
  const syntaxOk = await checkSyntax();
  const postOk = await testPostData();
  if (syntaxOk && postOk) {
    console.log('\n✅ All tests passed for POST Data');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for POST Data');
    process.exit(1);
  }
})();
