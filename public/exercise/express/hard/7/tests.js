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

async function awsS3UploadVerify() {
  try {
    const mod = require(path.join(process.cwd(), 'index.js'));
    const app = mod.app || mod.default || mod;
    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }
    // Use supertest to check the upload endpoint exists and accepts POST
    const request = supertest(app);
    const res = await request.post('/upload').set('Content-Type', 'multipart/form-data');
    if (res.status === 200 || res.status === 201 || res.status === 400) {
      // 400 if no file sent, but endpoint exists
      console.log('✔ Upload endpoint found with expected response status:', res.status);
      return true;
    } else {
      console.log(`✘ Unexpected status code from /upload POST: ${res.status}`);
      return false;
    }
  } catch (err) {
    console.log('✘ AWS S3 upload test error:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await syntaxVerify();
  const structureOk = structureVerify();
  const funcOk = await awsS3UploadVerify();
  const allPassed = syntaxOk && structureOk && funcOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'AWS S3 Upload',
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
