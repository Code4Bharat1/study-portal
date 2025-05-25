const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
const js = fs.readFileSync(jsFile, 'utf8');

async function checkSyntax() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  }
  console.log('❌ Syntax errors:');
  results[0].messages.forEach(m =>
    console.log(`- [${m.ruleId}] ${m.message} (line ${m.line})`)
  );
  return false;
}

function checkExport() {
  const hasExport =
    js.includes('module.exports') ||
    js.includes('export default') ||
    js.includes('exports.app');

  if (!hasExport) {
    console.log('✘ No valid export detected.');
  } else {
    console.log('✔ Export found.');
  }
  return hasExport;
}

async function checkReqUser() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // Assumes route GET /profile which uses req.user and returns user info

    const res = await request
      .get('/profile')
      .set('Accept', 'application/json');

    if (res.status !== 200) {
      console.log(`✘ Expected status 200 but got ${res.status}`);
      return false;
    }

    if (!res.body) {
      console.log('✘ No response body found.');
      return false;
    }

    // Check if response has user object or properties coming from req.user
    if (!res.body.username && !res.body.email && !res.body.id) {
      console.log('✘ Response does not contain expected user properties.');
      return false;
    }

    console.log('✔ `req.user` usage endpoint is working correctly.');

    return true;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const reqUserOk = await checkReqUser();

  if (syntaxOk && exportOk && reqUserOk) {
    console.log('\n✅ All checks passed for "Use req.user".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Use req.user".');
    process.exit(1);
  }
})();
