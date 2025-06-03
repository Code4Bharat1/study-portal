const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const { ESLint } = require('eslint');

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

function readAttempts() {
  try {
    return fs.existsSync('attempts.tests') ? JSON.parse(fs.readFileSync('attempts.tests')).count || 1 : 1;
  } catch {
    return 1;
  }
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.tests', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write attempts.tests: ${e}`);
  }
}

async function checkSyntax() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  return results[0].errorCount === 0;
}

function checkMiddlewareUsage() {
  try {
    const ast = esprima.parseScript(js);
    let foundUse = false;

    function walk(node) {
      if (
        node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.property.name === 'use'
      ) {
        foundUse = true;
      }

      for (const key in node) {
        if (typeof node[key] === 'object' && node[key] !== null) {
          walk(node[key]);
        }
      }
    }

    walk(ast);
    return foundUse;
  } catch (err) {
    console.log('❌ Failed to parse JavaScript:', err.message);
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxOk = await checkSyntax();
  const middlewareOk = checkMiddlewareUsage();

  const allPassed = syntaxOk && middlewareOk;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();

  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      console.log('\n✅ All tests passed for Logger Middleware');
      process.exit(0);
    } catch (e) {
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log('\n❌ Test failed for Logger Middleware');
    console.log(`❌ Tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();
