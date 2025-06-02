// Page 10 
console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { rest } = require('msw');
const { setupServer } = require('msw/node');

const code = fs.readFileSync('script.js', 'utf-8');

const mswServer = setupServer(
  rest.get('/custom', (req, res, ctx) => {
    return res(ctx.json({ message: 'Custom Route' }));
  })
);

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

function readAttempts() {
  if (fs.existsSync('attempts.tests')) {
    try {
      const data = JSON.parse(fs.readFileSync('attempts.tests', 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
      console.log('Error parsing attempts.tests. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.tests', JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to attempts.tests: ${e}`);
  }
}

async function syntaxVerify() {
  const eslint = new ESLint({
    overrideConfig: {
      env: { node: true, es2021: true },
      parserOptions: { ecmaVersion: 12, sourceType: 'module' },
      rules: {
        'no-undef': 'error',
        'no-unused-vars': 'warn',
      },
    },
  });

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((msg) => msg.severity === 2);
    if (errors.length === 0) {
      console.log('✔ JavaScript syntax is valid.');
      return true;
    } else {
      console.log('❌ JavaScript syntax is not valid:');
      errors.forEach((err) => console.log(`  ${err.message} (line ${err.line})`));
      return false;
    }
  } catch (e) {
    console.log(`✘ ESLint failed: ${e}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'script' });
    let expressCalls = 0;
    let customRoutes = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'express') {
          expressCalls++;
        }
        if (
          path.node.callee &&
          path.node.callee.object &&
          path.node.callee.object.name === 'server' &&
          path.node.callee.property.name === 'get' &&
          path.node.arguments[0].value === '/custom'
        ) {
          customRoutes++;
        }
      },
    });

    if (expressCalls === 0) {
      console.log('✘ No express calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${expressCalls} express call(s)`);
    }
    if (customRoutes === 0) {
      console.log('✘ No custom routes found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${customRoutes} custom route(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript code: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const response = await fetch('/custom');
    const data = await response.json();

    if (response.status !== 200) {
      console.log('✘ Custom route did not return status 200');
      allPassed = false;
    } else {
      console.log('✔ Custom route returned status 200');
    }

    if (!data || data.message !== 'Custom Route') {
      console.log('✘ Custom route did not return correct message');
      allPassed = false;
    } else {
      console.log('✔ Custom route returned correct message');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Custom Server Setup behavior is correct.');
    } else {
      console.log('\n❗ Custom Server Setup behavior check failed. Please review your Next.js code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

(async () => {
  const startTime = performance.now();
const syntaxPassed = await syntaxVerify();
if (!syntaxPassed) {
  console.log('\n❌ Syntax errors prevent further checks.');
  process.exit(1);
}

  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = code.split('\n').filter((line) => line.trim()).length;

  let attempts = readAttempts();
  if (allPassed) {
    const resultData = {
      attempts,
      linesOfCode,
      executionTime,
      syntaxCheckPassed: syntaxPassed,
      structureCheckPassed: structurePassed,
      functionalCheckPassed: functionalPassed,
      timestamp: new Date().toISOString(),
    };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2), 'utf-8');
      
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to results.tests: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();