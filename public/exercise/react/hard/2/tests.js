require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

console.clear();

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/dom');

const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'result.txt';
const code = fs.readFileSync('script.js', 'utf-8');

// Track attempts
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
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Error: Could not save attempts: ${e.message}`);
  }
}

// Syntax check
async function syntaxVerify() {
  const eslint = new ESLint();
  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter(msg => msg.severity === 2);

    if (errors.length === 0) {
      console.log('Syntax Check Passed: No errors found.');
      return true;
    } else {
      console.log('Syntax Error: Your code has the following issue(s):');
      errors.forEach(err =>
        console.log(`  Line ${err.line}, Column ${err.column}: ${err.message} [Rule: ${err.ruleId || 'unknown'}]`)
      );
      return false;
    }
  } catch (e) {
    console.log(`ESLint failed to run:\nReason: ${e.message}`);
    return false;
  }
}

// Structure check
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let suspenseCount = 0;

    traverse(ast, {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'Suspense') {
          suspenseCount++;
        }
      },
    });

    if (suspenseCount === 0) {
      console.log('Structure Error: No <Suspense> element found.');
      allPassed = false;
    } else {
      console.log(`Structure Check Passed: Found ${suspenseCount} <Suspense> element(s).`);
    }

    return allPassed;
  } catch (e) {
    console.log(`JSX Parsing Failed:\nReason: ${e.message}`);
    return false;
  }
}

// Functional test
async function functionalVerify() {
  let allPassed = true;
  try {
    const Component = (await import('./script.js')).default;
    render(Component());

    const fallback = screen.queryByTestId('fallback');
    if (!fallback || fallback.textContent !== 'Loading...') {
      console.log('Functional Error: Fallback text is not "Loading...".');
      allPassed = false;
    } else {
      console.log('Functional Check Passed: Fallback content is correct.');
    }

    await waitFor(() => {
      const lazy = screen.queryByTestId('lazy');
      if (!lazy || lazy.textContent !== 'Loaded Data') {
        throw new Error('Lazy component not found or incorrect content.');
      }
    }, { timeout: 1500 });

    console.log('Functional Check Passed: Lazy component rendered correctly.');
    return allPassed;
  } catch (e) {
    console.log(`Functional Test Failed:\nReason: ${e.message}`);
    return false;
  }
}

// Main runner
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
  const linesOfCode = code.split('\n').filter(line => line.trim()).length;

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
    console.log(`\nOne or more checks failed. This was attempt #${attempts - 1}.`);
    process.exit(1);
  }
})();
