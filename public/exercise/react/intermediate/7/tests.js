console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');

// File paths
const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';

// Read JavaScript code
const code = fs.readFileSync('App.jsx', 'utf-8');

// Helper: Read attempts (default to 1)
function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
      console.log('Error parsing attempts.tests. Resetting counter.');
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

// Structural verification for performance optimization
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let useMemoCalls = 0;
    let useCallbackCalls = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'useMemo') {
          useMemoCalls++;
        }
        if (path.node.callee.name === 'useCallback') {
          useCallbackCalls++;
        }
      },
    });

    if (useMemoCalls === 0 && useCallbackCalls === 0) {
      console.log('✘ No useMemo or useCallback calls found');
      allPassed = false;
    } else {
      if (useMemoCalls > 0) console.log(`✔ Found ${useMemoCalls} useMemo call(s)`);
      if (useCallbackCalls > 0) console.log(`✔ Found ${useCallbackCalls} useCallback call(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for performance optimization
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default;

    render(<Component />);
    const result = screen.getByTestId('result');
    if (result.textContent !== 'Result: 0') {
      console.log('✘ Initial result is not 0');
      allPassed = false;
    } else {
      console.log('✔ Initial result is 0');
    }

    const incrementButton = screen.getByTestId('increment');
    fireEvent.click(incrementButton);
    if (result.textContent !== 'Result: 2') {
      console.log('✘ Result did not update to 2');
      allPassed = false;
    } else {
      console.log('✔ Result updated to 2');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Performance optimization behavior is correct.');
    } else {
      console.log('\n❗ Performance optimization behavior check failed. Please review your React code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

// Polyfill performance.now()
if (typeof performance === 'undefined') {
  global.performance = { now: () => Date.now() };
}

// Main execution
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
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();
