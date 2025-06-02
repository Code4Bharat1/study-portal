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
    const exportFound = js.includes('module.exports') || js.includes('export default') || js.includes('exports.app');
    console.log(exportFound ? '✔ App export detected.' : '✘ No export found.');
    return exportFound;
  } catch (err) {
    console.log('✘ Failed to parse AST:', err.message);
    return false;
  }
}

async function functionalityVerify() {
  // We check if the user uses cluster module and exports app
  try {
    const ast = esprima.parseScript(js, { tolerant: true, loc: true });
    let clusterUsed = false;
    esprima.tokenize(js).forEach(token => {
      if (token.value === 'cluster') clusterUsed = true;
    });
    if (!clusterUsed) {
      console.log('✘ cluster module is not used.');
      return false;
    }
    // Try to require app and do a basic request
    const m = require(path.join(process.cwd(), 'index.js'));
    const app = m.app || m.default || m;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }
    const res = await supertest(app).get('/');
    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log('✔ App responds successfully on GET /');
      return true;
    } else {
      console.log(`✘ GET / responded with status ${res.statusCode}`);
      return false;
    }
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
      task: 'Clustering',
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
