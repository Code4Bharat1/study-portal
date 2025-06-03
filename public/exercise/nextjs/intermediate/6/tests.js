// Page 6 
console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { rest } = require('msw');
const { setupServer } = require('msw/node');

const code = fs.readFileSync('script.js', 'utf-8');

const server = setupServer(
  rest.get('/api/data', (req, res, ctx) => {
    return res(ctx.json({ message: 'Client Data' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
      env: { browser: true, es2021: true },
      parserOptions: { ecmaVersion: 12, sourceType: 'module', ecmaFeatures: { jsx: true } },
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'warn',
        'react-hooks/rules-of-hooks': 'error',
      },
    },
  });

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((msg) => msg.severity === 2);
    if (errors.length === 0) {
      console.log('✔ JavaScript/JSX syntax is valid.');
      return true;
    } else {
      console.log('❌ JavaScript/JSX syntax is not valid:');
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
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let useSWRCalls = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'useSWR') {
          useSWRCalls++;
        }
      },
    });

    if (useSWRCalls === 0) {
      console.log('✘ No useSWR calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${useSWRCalls} useSWR call(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const module = await import('./script.js');
    const Component = module.default;

    // Test successful fetch
    render(<Component />);
    let loadingText = screen.getByTestId('loading');
    if (loadingText.textContent !== 'Loading...') {
      console.log('✘ Loading state is not rendered');
      allPassed = false;
    } else {
      console.log('✔ Loading state is rendered');
    }

    await screen.findByTestId('data');
    const dataText = screen.getByTestId('data');
    if (dataText.textContent !== 'Client Data') {
      console.log('✘ Data is not rendered correctly');
      allPassed = false;
    } else {
      console.log('✔ Data is rendered correctly');
    }

    // Test error state
    server.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<Component />);
    await screen.findByTestId('error');
    const errorText = screen.getByTestId('error');
    if (errorText.textContent !== 'Error') {
      console.log('✘ Error state is not rendered');
      allPassed = false;
    } else {
      console.log('✔ Error state is rendered');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Client-Side Data Fetching behavior is correct.');
    } else {
      console.log('\n❗ Client-Side Data Fetching behavior check failed. Please review your Next.js code.');
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
  ;
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
      structurePassed: structurePassed,
      functionalCheckPassed: functionalPassed,
      timestamp: new Date().toISOString(),
    };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2), 'utf-8');
      
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to results.tests: ${e}`);
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();