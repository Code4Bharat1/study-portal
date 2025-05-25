const { ESLint } = require('eslint');
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

async function checkErrorHandler() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // We trigger an error by requesting a route that throws or returns next(error)
    // Assumes user has a route /error for testing or similar; otherwise, test for 404 fallback error handling

    // First try a route known to cause error
    let res;
    try {
      res = await request.get('/error').send();
    } catch {
      // fallback to 404
      res = await request.get('/nonexistent-route').send();
    }

    // Check if response status is 500 or 404 with proper error message (JSON or text)
    if ([500, 404].includes(res.status) && res.text) {
      console.log(`✔ Error handler returned status ${res.status} with message.`);
      return true;
    }

    console.log('✘ Error handler did not respond correctly to error route.');
    return false;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const errorHandlerOk = await checkErrorHandler();

  if (syntaxOk && exportOk && errorHandlerOk) {
    console.log('\n✅ All checks passed for "Error Handler".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Error Handler".');
    process.exit(1);
  }
})();
