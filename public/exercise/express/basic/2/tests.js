const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
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

async function checkGETHome() {
  let app;
  try {
    app = require(filePath);
  } catch {
    console.log("❌ Could not import app");
    return false;
  }

  try {
    const res = await supertest(app).get('/');
    assert.ok(res.statusCode === 200 || res.statusCode === 304);
    assert.ok(typeof res.text === 'string');
    console.log(`✔ GET / returned status ${res.statusCode}`);
    return true;
  } catch (err) {
    console.log('❌ GET / request failed:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const getOk = await checkGETHome();
  if (syntaxOk && getOk) {
    console.log('\n✅ All tests passed for GET Homepage');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for GET Homepage');
    process.exit(1);
  }
})();
