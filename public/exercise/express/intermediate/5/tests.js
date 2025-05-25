const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

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

async function checkMongoConnection() {
  try {
    // Check if mongoose is connected (readyState 1 means connected)
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

    // Check if there is a GET route /mongodb or /mongo-test or similar for testing
    // This is user-dependent, so adjust route if needed.
    // We try /mongodb here.

    const res = await request.get('/mongodb');

    if (res.status === 200 && res.body) {
      // Expect some confirmation that mongo is working, e.g., a JSON object
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
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const mongoOk = await checkMongoConnection();
  const routeOk = await checkRoute();

  if (syntaxOk && exportOk && mongoOk && routeOk) {
    console.log('\n✅ All checks passed for "MongoDB Setup".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "MongoDB Setup".');
    process.exit(1);
  }
})();