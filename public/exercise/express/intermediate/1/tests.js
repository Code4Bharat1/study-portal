const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js');
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
    esprima.parseScript(js);
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

async function checkRouterUsage() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);
    const res = await request.get('/').send();

    if (res.status === 404) {
      console.log('⚠️ No route found at "/" — ensure you mounted the router or defined routes.');
      return false;
    }

    console.log(`✔ Routes respond with status ${res.status}`);
    return true;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();

  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const routerOk = await checkRouterUsage();

  const allPassed = syntaxOk && exportOk && routerOk;
  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'Use Router',
      attempts,
      linesOfCode,
      executionTime,
      timestamp: new Date().toISOString()
    }, null, 2));
    console.log('\n✅ All checks passed for "Use Router". Result saved.');
    process.exit(0);
  } else {
    writeAttempts(attempts + 1);
    console.log(`\n❌ One or more checks failed for "Use Router". Attempt #${attempts + 1} saved.`);
    process.exit(1);
  }
})();
