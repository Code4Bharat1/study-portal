const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
console.clear();

const attemptsFile = path.join(__dirname, 'attempts.json');
const resultFile = path.join(__dirname, 'result.txt');
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

async function sentryVerify() {
  try {
    const mod = require(path.join(process.cwd(), 'index.js'));
    const app = mod.app || mod.default || mod;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }
    const request = supertest(app);

    // Check if Sentry middleware is initialized by triggering an error route
    // We simulate an error request and expect the error handler middleware (which Sentry usually hooks)
    const res = await request.get('/error-trigger-test').send();

    if (res.status >= 400) {
      console.log('✔ Error handler (likely Sentry) middleware responded with error status.');
      return true;
    } else {
      console.log('✘ No error response detected from error route.');
      return false;
    }
  } catch (err) {
    // If /error-trigger-test does not exist, fallback to check if Sentry is imported
    if (js.includes('@sentry/node') || js.includes('@sentry/react')) {
      console.log('✔ Sentry package is imported in the code.');
      return true;
    }
    console.log('✘ Sentry test error:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await syntaxVerify();
  const structureOk = structureVerify();
  const sentryOk = await sentryVerify();
  const allPassed = syntaxOk && structureOk && sentryOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'Sentry Tracking',
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
