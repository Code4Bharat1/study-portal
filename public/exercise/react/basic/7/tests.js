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
const { JSDOM } = require('jsdom');
const { render, screen } = require('@testing-library/react');

// Setup JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const APP_FILE = path.resolve(__dirname, 'App.jsx');
const code = fs.readFileSync(APP_FILE, 'utf-8');

const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';

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

// Structural check for .map and key props
function astVerify() {
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let mapCalls = 0;
    let keyProps = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.property?.name === 'map') {
          mapCalls++;
        }
      },
      JSXAttribute(path) {
        if (path.node.name.name === 'key') {
          keyProps++;
        }
      },
    });

    const mapOK = mapCalls > 0;
    const keyOK = keyProps > 0;

    if (mapOK) {
      console.log(`✔ Found ${mapCalls} .map() call(s) for list rendering`);
    } else {
      console.log('✘ No .map() calls found for list rendering');
    }

    if (keyOK) {
      console.log(`✔ Found ${keyProps} key prop(s)`);
    } else {
      console.log('✘ No key props found in JSX');
    }

    return mapOK && keyOK;
  } catch (e) {
    console.log(`✘ AST parsing error: ${e}`);
    return false;
  }
}

// Functional test to check list renders items correctly
async function functionalVerify() {
  try {
    const Component = require(`${APP_FILE}?v=${Date.now()}`).default;
    render(Component());

    const list = screen.getByTestId('item-list');
    const items = [
      screen.getByTestId('item-0'),
      screen.getByTestId('item-1'),
      screen.getByTestId('item-2'),
    ];

    const expected = ['Apple', 'Banana', 'Orange'];
    const allPresent = items.every((item, i) => list.contains(item));
    const contentCorrect = items.every((item, i) => item.textContent === expected[i]);

    if (!allPresent) {
      console.log('✘ Not all items are in the list');
      return false;
    } else {
      console.log('✔ All items are in the list');
    }

    if (!contentCorrect) {
      console.log('✘ List item content is incorrect');
      return false;
    } else {
      console.log('✔ List item content is correct');
    }

    return true;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

// Main execution
(async () => {
  const startTime = Date.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further testing.');
    ;
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
    ;
  }
})();
