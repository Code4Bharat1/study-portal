const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const { ESLint } = require('eslint');

const filePath = path.join(__dirname, 'index.js');
const js = fs.readFileSync(filePath, 'utf8');

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
  const syntaxOk = await checkSyntax();
  const middlewareOk = checkMiddlewareUsage();
  if (syntaxOk && middlewareOk) {
    console.log('\n✅ All tests passed for Logger Middleware');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed for Logger Middleware');
    process.exit(1);
  }
})();
