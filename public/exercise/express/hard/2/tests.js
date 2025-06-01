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
    const exportFound = js.includes('module.exports') || js.includes('export default') || js.includes('exports.app');
    console.log(exportFound ? '✔ App export detected.' : '✘ No export found.');
    return exportFound;
  } catch (err) {
    console.log('✘ Failed to parse AST:', err.message);
    return false;
  }
}

async function functionalityVerify() {
  let app;
  try {
    const m = require(path.join(process.cwd(), 'index.js'));
    app = m.app || m.default || m;
  } catch (err) {
    console.log('✘ Failed to load app from index.js:', err.message);
    return false;
  }

  try {
    // Check both v1 and v2 versioned API endpoints as example
    const resV1 = await supertest(app).get('/api/v1');
    const resV2 = await supertest(app).get('/api/v2');
    if ((resV1.statusCode >= 200 && resV1.statusCode < 300) &&
        (resV2.statusCode >= 200 && resV2.statusCode < 300)) {
      console.log('✔ GET /api/v1 and /api/v2 responded successfully.');
      return true;
    } else {
      console.log(`✘ Versioned API routes responded with status: v1=${resV1.statusCode}, v2=${resV2.statusCode}`);
      return false;
    }
  } catch (err) {
    console.log('✘ Supertest request failed:', err.message);
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
      task: 'API Versioning',
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
