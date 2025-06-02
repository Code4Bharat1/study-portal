require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

console.clear();

const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/dom'); // no jest-dom here

const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';
const code = fs.readFileSync('App.jsx', 'utf-8');

function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      console.log('Warning: Failed to parse attempts.tests. Resetting to 1.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Error: Could not save attempts: ${e.message}`);
  }
}

async function syntaxVerify() {
  const eslint = new ESLint();

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((msg) => msg.severity === 2);

    if (errors.length === 0) {
      console.log('Syntax Check Passed: No errors found.');
      return true;
    } else {
      console.log('Syntax Error: Your code has the following issue(s):');
      errors.forEach((err) =>
        console.log(
          `  Line ${err.line}, Column ${err.column}: ${err.message} [Rule: ${err.ruleId || 'unknown'}]`
        )
      );
      console.log(
        '\nTip: Check for missing brackets, semicolons, or typos in your JSX or JavaScript.'
      );
      return false;
    }
  } catch (e) {
    console.log(`ESLint failed to run:\nReason: ${e.message}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let customHooks = 0;
    let useEffectCalls = 0;

    traverse(ast, {
      FunctionDeclaration(path) {
        if (
          path.node.id.name.startsWith('use') &&
          path.node.body.body.some((node) => node.type === 'ReturnStatement')
        ) {
          customHooks++;
        }
      },
      VariableDeclarator(path) {
        if (
          path.node.id.name.startsWith('use') &&
          path.node.init &&
          path.node.init.type === 'ArrowFunctionExpression'
        ) {
          customHooks++;
        }
      },
      CallExpression(path) {
        if (path.node.callee.name === 'useEffect') {
          useEffectCalls++;
        }
      },
    });

    if (customHooks === 0) {
      console.log('Structure Error: No custom hooks found.');
      allPassed = false;
    } else {
      console.log(`Structure Check Passed: Found ${customHooks} custom hook(s).`);
    }

    if (useEffectCalls === 0) {
      console.log('Structure Error: No useEffect calls found in custom hook.');
      allPassed = false;
    } else {
      console.log(`Structure Check Passed: Found ${useEffectCalls} useEffect call(s).`);
    }

    return allPassed;
  } catch (e) {
    console.log(`JSX Parsing Failed:\nReason: ${e.message}`);
    console.log(
      'Tip: Ensure your return statement includes valid and properly closed JSX tags.'
    );
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default || module;

    render(<Component />);

    const loading = screen.getByTestId('loading');
    if (loading.textContent !== 'Loading...') {
      console.log('Functional Error: Initial state is not "Loading...".');
      allPassed = false;
    } else {
      console.log('Functional Check Passed: Initial state is "Loading...".');
    }

    await waitFor(() => {
      const data = screen.getByTestId('data');
      if (data.textContent !== 'Fetched Data') {
        console.log('Functional Error: Data did not load as expected.');
        allPassed = false;
      } else {
        console.log('Functional Check Passed: Data loaded successfully.');
      }
    }, { timeout: 1500 });

    if (allPassed) {
      console.log('\nAll functional tests passed.');
    } else {
      console.log('\nFunctional tests failed. Please review your React code.');
    }

    return allPassed;
  } catch (e) {
    console.log(`Functional Test Failed:\nReason: ${e.message}`);
    console.log(
      'Tip: Ensure your component exports a valid default function and renders the expected loading and data states.'
    );
    return false;
  }
}

(async () => {
  const startTime = Date.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\nAborting: Fix syntax errors before continuing.');
    process.exit(1);
  }

  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = Number((Date.now() - startTime) / 1000).toFixed(3);
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
      fs.writeFileSync(RESULT_FILE, JSON.stringify(resultData, null, 2), 'utf-8');
      console.log(`\nAll checks passed. Result saved to ${RESULT_FILE}.`);
      process.exit(0);
    } catch (e) {
      console.log(`Error writing result: ${e.message}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(
      `\nOne or more checks failed. This was attempt #${attempts - 1}. Please review the messages and try again.`
    );
    process.exit(1);
  }
})();
