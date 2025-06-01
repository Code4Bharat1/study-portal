require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

console.clear();

const { JSDOM } = require('jsdom');

// Setup DOM environment
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
require('@testing-library/dom');

// Files
const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'results.tests';
const code = fs.readFileSync('App.jsx', 'utf-8');

// Helpers for attempts tracking
function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      console.log('Warning: Failed to parse attempts.json. Resetting to 1.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync(
      ATTEMPTS_FILE,
      JSON.stringify({ count }, null, 2),
      'utf-8'
    );
  } catch (e) {
    console.log(`Error: Could not save attempts: ${e.message}`);
  }
}

// Syntax verification using ESLint
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
          `  Line ${err.line}, Column ${err.column}: ${err.message} [Rule: ${
            err.ruleId || 'unknown'
          }]`
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

// Structural verification
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let jsxElements = 0;
    let jsxExpressions = 0;

    traverse(ast, {
      JSXElement() {
        jsxElements++;
      },
      JSXExpressionContainer() {
        jsxExpressions++;
      },
    });

    if (jsxElements === 0) {
      console.log('Structure Error: No JSX elements found.');
      console.log(
        'Tip: Make sure your component returns JSX like <h1>Hello</h1>.'
      );
      allPassed = false;
    } else {
      console.log(
        `Structure Check Passed: Found ${jsxElements} JSX element(s).`
      );
    }

    if (jsxExpressions === 0) {
      console.log('Structure Error: No JSX expressions found.');
      console.log(
        'Tip: Include dynamic expressions inside JSX using curly braces, e.g., <p>{username}</p>.'
      );
      allPassed = false;
    } else {
      console.log(
        `Structure Check Passed: Found ${jsxExpressions} JSX expression(s).`
      );
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

// Functional verification using visible text
async function functionalVerify() {
  let allPassed = true;
  try {
    const Component = require('./App.jsx').default;
    render(Component());
    const greeting = screen.queryByRole('heading', { name: /Hello,\s*User!/i });

    if (!greeting) {
      console.log(`Functional Error: Could not find "Hello, User!" on screen.`);
      console.log(
        'Tip: Ensure your component renders text exactly as "Hello, User!".'
      );
      allPassed = false;
    } else {
      console.log(
        'Functional Check Passed: Greeting contains the expected text.'
      );
    }

    return allPassed;
  } catch (e) {
    console.log(`Functional Test Failed:\nReason: ${e.message}`);
    console.log(
      'Tip: Ensure your component exports a valid default function and renders the expected greeting text.'
    );
    return false;
  }
}

// Main test runner
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
      fs.writeFileSync(
        RESULT_FILE,
        JSON.stringify(resultData, null, 2),
        'utf-8'
      );
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
      `\nOne or more checks failed. This was attempt #${attempts -1}. Please review the messages and try again.`
    );
    process.exit(1);
  }
})();
