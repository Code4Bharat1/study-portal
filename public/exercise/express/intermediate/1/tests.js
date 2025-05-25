const { ESLint } = require('eslint');
const esprima = require('esprima');
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
  try {
    const ast = esprima.parseScript(js);
    // Check if module.exports, export default, or exports.app exist
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
    // Load the user's module and get the app export
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    // Make a request to a test route to confirm router usage
    // This requires the user to have defined at least one route under a router or main app.
    // We will check if any route exists by requesting root (/) or /test (common test path)
    const res = await request.get('/').send();

    // If the response status is 404, maybe router isn't mounted or routes not defined
    if (res.status === 404) {
      console.log('⚠️ No route found at "/" — ensure you mounted the router or defined routes.');
      return false;
    }

    // Optional: Check that router is mounted by checking response body or headers for expected output.
    console.log(`✔ Routes respond with status ${res.status}`);
    return true;

  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const routerOk = await checkRouterUsage();

  if (syntaxOk && exportOk && routerOk) {
    console.log('\n✅ All checks passed for "Use Router".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Use Router".');
    process.exit(1);
  }
})();
