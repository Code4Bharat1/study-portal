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

// Setup JSDOM for testing
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.getComputedStyle = window.getComputedStyle;

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

// AST check for styling: style or className
function astVerify() {
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let styleProps = 0;
    let classNames = 0;

    traverse(ast, {
      JSXAttribute(path) {
        if (path.node.name.name === 'style' && path.node.value.type === 'JSXExpressionContainer') {
          styleProps++;
        }
        if (path.node.name.name === 'className') {
          classNames++;
        }
      },
    });

    const styled = styleProps > 0 || classNames > 0;

    if (styleProps > 0) console.log(`✔ Found ${styleProps} style prop(s)`);
    if (classNames > 0) console.log(`✔ Found ${classNames} className prop(s)`);
    if (!styled) {
      console.log('✘ No styling found (style or className)');
    }

    return styled;
  } catch (e) {
    console.log(`✘ AST parsing error: ${e}`);
    return false;
  }
}

// Functional test for styling and content
async function functionalVerify() {
  try {
    const Component = require(`${APP_FILE}?v=${Date.now()}`).default;
    render(Component());

    const box = screen.getByTestId('box');
    const styles = getComputedStyle(box);

    const hasCorrectText = box.textContent.trim() === 'Styled Box';
    const hasCorrectBg = styles.backgroundColor === 'rgb(0, 0, 255)';
    const hasCorrectColor = styles.color === 'rgb(255, 255, 255)';

    if (!hasCorrectText) {
      console.log('✘ Box does not contain expected text');
    } else {
      console.log('✔ Box contains expected text');
    }

    if (!hasCorrectBg || !hasCorrectColor) {
      console.log('✘ Box does not have correct background or text color');
    } else {
      console.log('✔ Box has correct background and text color');
    }

    return hasCorrectText && hasCorrectBg && hasCorrectColor;
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
