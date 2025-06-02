const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
const js = fs.readFileSync(jsFile, 'utf8');

const attemptsFile = path.join(process.cwd(), 'attempts.txt');
const resultsFile = path.join(process.cwd(), 'results.json');

function saveAttempt(result) {
  const line = `${new Date().toISOString()} - ${result ? 'PASS' : 'FAIL'}\n`;
  fs.appendFileSync(attemptsFile, line);
}

function saveResult(result) {
  const data = { timestamp: new Date().toISOString(), passed: result, test: 'Use req.user' };
  let arr = [];
  if (fs.existsSync(resultsFile)) {
    try {
      arr = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }
  }
  arr.push(data);
  fs.writeFileSync(resultsFile, JSON.stringify(arr, null, 2));
}

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
    delete require.cache[require.resolve(jsFile)];
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

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

  const allOk = syntaxOk && exportOk && reqUserOk;

  if (allOk) {
    console.log('\n✅ All checks passed for "Use req.user".');
  } else {
    console.log('\n❌ One or more checks failed for "Use req.user".');
  }

  saveAttempt(allOk);
  saveResult(allOk);

  process.exit(allOk ? 0 : 1);
})();
