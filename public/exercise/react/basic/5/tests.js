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
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

// Paths
const APP_FILE = path.resolve(__dirname, 'App.jsx');
const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';
const code = fs.readFileSync(APP_FILE, 'utf-8');

// Attempt Handling
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

// ESLint Syntax Check
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

// AST Check for JSX event handlers like onClick
function astVerify() {
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let handlers = 0;

    traverse(ast, {
      JSXAttribute(path) {
        if (
          path.node.name.name &&
          path.node.name.name.startsWith('on') &&
          path.node.value
        ) {
          handlers++;
        }
      },
    });

    if (handlers > 0) {
      console.log(`✔ Found ${handlers} event handler(s)`);
      return true;
    } else {
      console.log('✘ No JSX event handlers found');
      return false;
    }
  } catch (e) {
    console.log(`✘ AST parsing error: ${e}`);
    return false;
  }
}

// Functional test: toggle Off -> On -> Off
async function functionalVerify() {
  try {
    const Component = require(`${APP_FILE}?cacheBust=${Date.now()}`).default;
    render(React.createElement(Component));

    const status = screen.queryByText(/^off$/i);
    const toggleBtn = screen.queryByText(/toggle/i);

    if (!status || !toggleBtn) {
      console.log('✘ Could not find toggle button or initial status');
      return false;
    }
    console.log('✔ Found initial status: Off');

    fireEvent.click(toggleBtn);
    if (!screen.queryByText(/^on$/i)) {
      console.log('✘ Status did not change to On after first click');
      return false;
    }
    console.log('✔ Status toggled to On');

    fireEvent.click(toggleBtn);
    if (!screen.queryByText(/^off$/i)) {
      console.log('✘ Status did not change back to Off after second click');
      return false;
    }
    console.log('✔ Status toggled back to Off');

    return true;
  } catch (e) {
    console.log(`✘ Functional test error: ${e}`);
    return false;
  }
}

// Main runner
(async () => {
  const startTime = Date.now();
  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax check failed. Stopping...');
    process.exit(1);
  }

  const structurePassed = astVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const linesOfCode = code.split('\n').filter((l) => l.trim()).length;
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
    attempts++;
    writeAttempts(attempts);
    console.log(`\n❌ Test failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
