const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
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

async function checkSendEmail() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // Assumes route POST /send-email that accepts JSON { to, subject, body }

    const res = await request
      .post('/send-email')
      .send({
        to: 'test@example.com',
        subject: 'Test Email',
        body: 'This is a test email body',
      })
      .set('Accept', 'application/json');

    if (res.status !== 200 && res.status !== 201) {
      console.log(`✘ Expected status 200 or 201 but got ${res.status}`);
      return false;
    }

    if (!res.body) {
      console.log('✘ No response body found.');
      return false;
    }

    if (!('success' in res.body)) {
      console.log('✘ Response body missing "success" property.');
      return false;
    }

    if (res.body.success !== true) {
      console.log('✘ Email sending was not successful.');
      return false;
    }

    console.log('✔ Send Email endpoint works correctly.');

    return true;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const sendEmailOk = await checkSendEmail();

  if (syntaxOk && exportOk && sendEmailOk) {
    console.log('\n✅ All checks passed for "Send Email".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Send Email".');
    process.exit(1);
  }
})();
