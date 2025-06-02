const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const supertest = require('supertest');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust as needed
const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');
const js = fs.readFileSync(jsFile, 'utf8');

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
  try {
    const hasExport = js.includes('module.exports') || js.includes('export default') || js.includes('exports.app');
    if (!hasExport) {
      console.log('✘ No valid export detected.');
    } else {
      console.log('✔ Export found.');
    }
    return hasExport;
  } catch (err) {
    console.log('✘ JS parsing error:', err.message);
    return false;
  }
}

async function checkLoggerMiddleware() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);
    const res = await request.get('/').send();

    if (res.headers['x-logger']) {
      console.log('✔ Logger middleware detected via "X-Logger" header.');
      return true;
    }

    console.log('⚠️ Logger middleware header "X-Logger" not found. ' +
      'Please ensure your logger middleware sets a response header "X-Logger" for testing.');

    return false;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();

  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const loggerOk = await checkLoggerMiddleware();

  const allPassed = syntaxOk && exportOk && loggerOk;
  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'Custom Logger',
      attempts,
      linesOfCode,
      executionTime,
      timestamp: new Date().toISOString()
    }, null, 2));
    console.log('\n✅ All checks passed for "Custom Logger". Result saved.');
    process.exit(0);
  } else {
    writeAttempts(attempts + 1);
    console.log(`\n❌ One or more checks failed for "Custom Logger". Attempt #${attempts + 1} saved.`);
    ;
  }
})();
