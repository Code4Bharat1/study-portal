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

async function checkPatchUser() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // The test assumes PATCH /user/:id endpoint that patches user fields
    // We send patch data and expect the updated user object in response

    // For testing, assume id=1 or id=some fixed value
    const userId = '1';

    const patchData = {
      username: 'updateduser',
      email: 'updated@example.com',
    };

    const res = await request
      .patch(`/user/${userId}`)
      .send(patchData)
      .set('Accept', 'application/json');

    if (res.status !== 200) {
      console.log(`✘ Expected status 200 but got ${res.status}`);
      return false;
    }

    if (!res.body) {
      console.log('✘ No response body found.');
      return false;
    }

    // Check if response contains updated fields
    const updatedUsername = res.body.username;
    const updatedEmail = res.body.email;

    if (updatedUsername !== patchData.username) {
      console.log(`✘ Username not updated correctly. Got "${updatedUsername}"`);
      return false;
    }

    if (updatedEmail !== patchData.email) {
      console.log(`✘ Email not updated correctly. Got "${updatedEmail}"`);
      return false;
    }

    console.log('✔ Patch user endpoint working correctly.');

    return true;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const patchOk = await checkPatchUser();

  if (syntaxOk && exportOk && patchOk) {
    console.log('\n✅ All checks passed for "Patch User".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Patch User".');
    process.exit(1);
  }
})();
