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
const { render, screen, fireEvent } = require('@testing-library/react');

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const APP_FILE = path.resolve(__dirname, 'App.jsx');
const code = fs.readFileSync(APP_FILE, 'utf-8');

const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'result.txt';

function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify({ count }, null, 2), 'utf-8');
}

// ESLint syntax verification
async function syntaxVerify() {
  const eslint = new ESLint();
  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((m) => m.severity === 2);
    if (errors.length === 0) {
      console.log('✔ Syntax is valid');
      return true;
    } else {
      console.log('❌ Syntax errors:');
      errors.forEach((e) => console.log(`  ${e.message} (line ${e.line})`));
      return false;
    }
  } catch (e) {
    console.log(`✘ ESLint error: ${e}`);
    return false;
  }
}

// Check JSX conditionals in AST
function astVerify() {
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let count = 0;

    traverse(ast, {
      ConditionalExpression(path) {
        if (
          path.node.consequent.type?.includes('JSX') ||
          path.node.alternate?.type?.includes('JSX')
        ) {
          count++;
        }
      },
      IfStatement(path) {
        const cons = path.node.consequent;
        if (
          cons &&
          cons.type === 'BlockStatement' &&
          cons.body.some(
            (stmt) =>
              stmt.type === 'ReturnStatement' &&
              stmt.argument &&
              stmt.argument.type.includes('JSX')
          )
        ) {
          count++;
        }
      },
    });

    if (count > 0) {
      console.log(`✔ Found ${count} conditional rendering instance(s)`);
      return true;
    } else {
      console.log('✘ No JSX conditional rendering found');
      return false;
    }
  } catch (e) {
    console.log(`✘ AST parsing error: ${e}`);
    return false;
  }
}

// Functional test: toggle controls visibility of a message
async function functionalVerify() {
  try {
    const Component = require(`${APP_FILE}?v=${Date.now()}`).default;
    render(React.createElement(Component));

    const toggleButton = screen.queryByText(/toggle/i);

    if (!toggleButton) {
      console.log('✘ Toggle button not found');
      return false;
    }

    const messageBefore = screen.queryByText(/visible/i);
    if (messageBefore) {
      console.log('✘ Message is visible initially (should be hidden)');
      return false;
    } else {
      console.log('✔ Message is hidden initially');
    }

    fireEvent.click(toggleButton);
    const messageAfter = screen.queryByText(/visible/i);
    if (!messageAfter) {
      console.log('✘ Message did not appear after toggle');
      return false;
    } else {
      console.log('✔ Message appeared after toggle');
    }

    fireEvent.click(toggleButton);
    const messageGone = screen.queryByText(/visible/i);
    if (messageGone) {
      console.log('✘ Message did not disappear after second toggle');
      return false;
    } else {
      console.log('✔ Message disappeared after second toggle');
    }

    return true;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

// Main test execution
(async () => {
  const startTime = Date.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further testing.');
    process.exit(1);
  }

  const structurePassed = astVerify();
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
    fs.writeFileSync(RESULT_FILE, JSON.stringify(resultData, null, 2), 'utf-8');
    console.log(`\n✅ All tests passed. Results saved to ${RESULT_FILE}.`);
    process.exit(0);
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
