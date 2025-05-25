// Page 5 
console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { rest } = require('msw');
const { setupServer } = require('msw/node');

const code = fs.readFileSync('script.js', 'utf-8');

const server = setupServer(
  rest.post('/api/advanced', async (req, res, ctx) => {
    const body = await req.json();
    if (!body.data) {
      return res(ctx.status(400), ctx.json({ error: 'Data is required' }));
    }
    return res(ctx.status(200), ctx.json({ message: `Received: ${body.data}` }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function readAttempts() {
  if (fs.existsSync('attempts.json')) {
    try {
      const data = JSON.parse(fs.readFileSync('attempts.json', 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
      console.log('Error parsing attempts.json. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.json', JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to attempts.json: ${e}`);
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
    const ast = parser.parse(code, { sourceType: 'module' });
    let handlerFunctions = 0;
    let tryCatchBlocks = 0;

    traverse(ast, {
      ExportDefaultDeclaration(path) {
        if (path.node.declaration && path.node.declaration.id && path.node.declaration.id.name === 'handler') {
          handlerFunctions++;
        }
      },
      TryStatement(path) {
        tryCatchBlocks++;
      },
    });

    if (handlerFunctions === 0) {
      console.log('✘ No handler function found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${handlerFunctions} handler function(s)`);
    }
    if (tryCatchBlocks === 0) {
      console.log('✘ No try-catch blocks found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${tryCatchBlocks} try-catch block(s)`);
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
    const module = await import('./script.js');
    const handler = module.default;

    // Test valid POST request
    const validReq = { method: 'POST', body: { data: 'test' } };
    const validRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await handler(validReq, validRes);
    if (!validRes.status.mock.calls[0] || validRes.status.mock.calls[0][0] !== 200) {
      console.log('✘ API did not return status 200 for valid request');
      allPassed = false;
    } else {
      console.log('✔ API returned status 200 for valid request');
    }
    if (!validRes.json.mock.calls[0] || validRes.json.mock.calls[0][0].message !== 'Received: test') {
      console.log('✘ API did not return correct message');
      allPassed = false;
    } else {
      console.log('✔ API returned correct message');
    }

    // Test invalid method
    const invalidMethodReq = { method: 'GET', body: {} };
    const invalidMethodRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await handler(invalidMethodReq, invalidMethodRes);
    if (!invalidMethodRes.status.mock.calls[0] || invalidMethodRes.status.mock.calls[0][0] !== 405) {
      console.log('✘ API did not return status 405 for invalid method');
      allPassed = false;
    } else {
      console.log('✔ API returned status 405 for invalid method');
    }

    // Test missing data
    const missingDataReq = { method: 'POST', body: {} };
    const missingDataRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await handler(missingDataReq, missingDataRes);
    if (!missingDataRes.status.mock.calls[0] || missingDataRes.status.mock.calls[0][0] !== 400) {
      console.log('✘ API did not return status 400 for missing data');
      allPassed = false;
    } else {
      console.log('✔ API returned status 400 for missing data');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Advanced API Routes behavior is correct.');
    } else {
      console.log('\n❗ Advanced API Routes behavior check failed. Please review your Next.js code.');
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
      fs.writeFileSync('result.txt', JSON.stringify(resultData, null, 2), 'utf-8');
      console.log(`\n✅ All tests passed. Results saved to result.txt.`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to result.txt: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();