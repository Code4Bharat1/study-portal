const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');
const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
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

async function checkMongoConnection() {
  try {
    // 1 means connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      console.log('✘ Mongoose is not connected.');
      return false;
    }
    console.log('✔ Mongoose is connected.');
    return true;
  } catch (err) {
    console.log('✘ Error checking mongoose connection:', err.message);
    return false;
  }
}

async function checkRoute() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);
    const res = await request.get('/mongodb');

    if (res.status === 200 && res.body) {
      console.log('✔ MongoDB route returned 200 OK.');
      return true;
    }

    console.log('✘ MongoDB test route did not return expected response.');
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
  const mongoOk = await checkMongoConnection();
  const routeOk = await checkRoute();
  const allPassed = syntaxOk && exportOk && mongoOk && routeOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'MongoDB Setup',
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
