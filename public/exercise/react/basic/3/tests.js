console.clear();

require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const React = require('react');
const { JSDOM } = require('jsdom');
const { render, screen } = require('@testing-library/react');

// Setup JSDOM environment before anything else
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// File paths
const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'results.tests';
const APP_FILE = path.resolve(__dirname, 'App.jsx');
const code = fs.readFileSync(APP_FILE, 'utf-8');

// Helper: Read attempts (default to 1)
function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      console.log('Error parsing attempts.json. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

// Helper: Write attempts
function writeAttempts(count) {
  try {
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to ${ATTEMPTS_FILE}: ${e}`);
  }
}

// Syntax verification using ESLint
async function syntaxVerify() {
  const eslint = new ESLint();
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

// Structural verification for props usage and PropTypes
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let propsUsages = 0;
    let propTypes = 0;

    traverse(ast, {
      JSXAttribute(path) {
        if (path.node.name.name !== 'key') {
          propsUsages++;
        }
      },
      MemberExpression(path) {
        if (path.node.object.name === 'PropTypes') {
          propTypes++;
        }
      },
    });

    if (propsUsages === 0) {
      console.log('✘ No props usages found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${propsUsages} props usage(s)`);
    }
    if (propTypes === 0) {
      console.log('✘ No PropTypes declarations found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${propTypes} PropTypes declaration(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for props rendering without data-testid
async function functionalVerify() {
  let allPassed = true;
  try {
    // Require component, support both ES default and commonjs exports
    const module = require(APP_FILE);
    const Component = module.default || module;
    console.log('Imported Component:', typeof Component);

    render(React.createElement(Component, { name: 'Alice', age: 25 }));
    console.log('Render succeeded');

    try {
      screen.getByText(/Name:\s*Alice/i);
      screen.getByText(/Age:\s*25/i);
      console.log('✔ User card displays props correctly');
      allPassed = true;
    } catch {
      console.log('✘ User card does not display props correctly or expected text not found');
      allPassed = false;
    }
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    allPassed = false;
  }
  return allPassed;
}

// Main runner
(async () => {
  const startTime = Date.now();
  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further checks.');
    process.exit(1);
  }

  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = ((Date.now() - startTime) / 1000).toFixed(3);
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
      console.log(`\n✅ All tests passed. Results saved to ${RESULT_FILE}.`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to ${RESULT_FILE}: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
