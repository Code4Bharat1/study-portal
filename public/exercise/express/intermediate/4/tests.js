const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust this path if needed
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

async function checkInputValidation() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // We assume the user has an input validation on a POST route at /validate or similar
    // Send invalid payload to trigger validation errors
    // This might be adjusted depending on the actual route you want to test

    const invalidPayload = { username: '', email: 'not-an-email' }; // example invalid data

    // Try POST request to /validate (or adjust the route to the known input validation route)
    const res = await request.post('/validate').send(invalidPayload);

    // Expect response status 400 or similar for validation errors
    if (res.status === 400 && res.body) {
      // Expect error message keys or array to exist
      const hasErrors = res.body.errors || res.body.message || typeof res.body === 'string';

      if (hasErrors) {
        console.log('✔ Input validation returned errors as expected.');
        return true;
      }
    }

    console.log('✘ Input validation did not behave as expected.');
    return false;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const validationOk = await checkInputValidation();

  if (syntaxOk && exportOk && validationOk) {
    console.log('\n✅ All checks passed for "Input Validation".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Input Validation".');
    process.exit(1);
  }
})();
