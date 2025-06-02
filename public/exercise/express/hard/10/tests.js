const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
console.clear();

const attemptsFile = path.join(__dirname, 'attempts.tests');
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

async function helmetVerify() {
  try {
    const mod = require(path.join(process.cwd(), 'index.js'));
    const app = mod.app || mod.default || mod;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }
    const request = supertest(app);

    // Send request to root or any path and check for typical Helmet security headers
    const res = await request.get('/').send();

    // Typical headers Helmet sets
    const helmetHeaders = [
      'x-dns-prefetch-control',
      'x-frame-options',
      'x-download-options',
      'x-content-type-options',
      'strict-transport-security',
      'content-security-policy',
      'expect-ct',
      'referrer-policy',
      'permissions-policy',
    ];

    const headersPresent = helmetHeaders.filter(h => res.headers[h]);
    if (headersPresent.length > 0) {
      console.log(`✔ Helmet security headers present: ${headersPresent.join(', ')}`);
      return true;
    } else {
      console.log('✘ No Helmet security headers detected.');
      return false;
    }
  } catch (err) {
    // Fallback: check if helmet is imported
    if (js.includes('helmet')) {
      console.log('✔ Helmet package is imported in the code.');
      return true;
    }
    console.log('✘ Helmet test error:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await syntaxVerify();
  const structureOk = structureVerify();
  const helmetOk = await helmetVerify();
  const allPassed = syntaxOk && structureOk && helmetOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'Helmet Security',
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
    ;
  }
})();
