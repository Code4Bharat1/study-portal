const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
console.clear();

const attemptsFile = path.join(__dirname, 'attempts.json');
const resultFile = path.join(__dirname, 'results.tests');
const js = fs.readFileSync('index.js', 'utf8');

function readAttempts() {
  if (fs.existsSync(attemptsFile)) {
    try {
      return Math.max(1, JSON.parse(fs.readFileSync(attemptsFile)).count);
    } catch {
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
}

async function syntaxVerify() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  }
  console.log('❌ Syntax errors:');
  results[0].messages.forEach(msg =>
    console.log(`- [${msg.ruleId}] ${msg.message} (line ${msg.line})`)
  );
  return false;
}

function structureVerify() {
  try {
    const ast = esprima.parseScript(js);
    const hasExport = js.includes('module.exports') || js.includes('export default') || js.includes('exports.app');
    console.log(hasExport ? '✔ Export detected.' : '✘ No export detected.');
    return hasExport;
  } catch (err) {
    console.log('✘ Failed to parse JS:', err.message);
    return false;
  }
}

async function functionalityVerify() {
  try {
    const ast = esprima.parseScript(js, { tolerant: true, loc: true });
    const usesPassport = js.includes('passport') || js.includes('OAuth2') || js.includes('passport-oauth2');
    if (!usesPassport) {
      console.log('✘ OAuth2 or passport not detected in code.');
      return false;
    }
    const m = require(path.join(process.cwd(), 'index.js'));
    const app = m.app || m.default || m;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }
    // Basic endpoint test for /auth or /login
    const endpoints = ['/auth', '/login', '/oauth2', '/auth/google', '/auth/facebook'];
    let passed = false;
    for (const ep of endpoints) {
      try {
        const res = await supertest(app).get(ep);
        if ([200, 302].includes(res.statusCode)) {
          console.log(`✔ OAuth2 endpoint "${ep}" responded with status ${res.statusCode}`);
          passed = true;
          break;
        }
      } catch {
        // Ignore errors, try next
      }
    }
    if (!passed) {
      console.log('✘ No OAuth2 auth endpoints responded correctly.');
    }
    return passed;
  } catch (err) {
    console.log('✘ Error during functionality test:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await syntaxVerify();
  const structureOk = structureVerify();
  const funcOk = await functionalityVerify();
  const allPassed = syntaxOk && structureOk && funcOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'OAuth2 Auth',
      attempts,
      linesOfCode,
      executionTime,
      timestamp: new Date().toISOString()
    }, null, 2));
    console.log('\n✅ All checks passed. Result saved.');
    process.exit(0);
  } else {
    writeAttempts(attempts + 1);
    console.log(`\n❌ One or more checks failed. Attempt #${attempts + 1} saved.`);
    process.exit(1);
  }
})();
