const { ESLint } = require('eslint');
const esprima = require('esprima');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust as needed
const js = fs.readFileSync(jsFile, 'utf8');

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

    // We test the logger by making any request and checking for expected logging side-effects.
    // Since we can't capture console.log easily, we will check if the user created a middleware that sets a header (common test pattern).
    // For example, user could add `res.set('X-Logger', 'active')` inside the logger middleware.
    const res = await request.get('/').send();

    if (res.headers['x-logger']) {
      console.log('✔ Logger middleware detected via "X-Logger" header.');
      return true;
    }

    // Otherwise, fail with hint
    console.log('⚠️ Logger middleware header "X-Logger" not found. ' +
      'Please ensure your logger middleware sets a response header "X-Logger" for testing.');

    return false;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const loggerOk = await checkLoggerMiddleware();

  if (syntaxOk && exportOk && loggerOk) {
    console.log('\n✅ All checks passed for "Custom Logger".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Custom Logger".');
    process.exit(1);
  }
})();
