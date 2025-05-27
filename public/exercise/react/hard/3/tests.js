// Page 3
console.clear();
console.clear();

const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');
const React = require('react');

// File paths
const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'result.txt';

// Read React code from App.jsx
const code = fs.readFileSync('App.jsx', 'utf-8');

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

// Syntax verification with ESLint (default config)
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
      errors.forEach((err) =>
        console.log(`  ${err.message} (line ${err.line})`)
      );
      return false;
    }
  } catch (e) {
    console.log(`✘ ESLint failed: ${e}`);
    return false;
  }
}

// Structural verification for useTransition usage
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let useTransitionCalls = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'useTransition') {
          useTransitionCalls++;
        }
      },
    });

    if (useTransitionCalls === 0) {
      console.log('✘ No useTransition calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${useTransitionCalls} useTransition call(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse App.jsx: ${e}`);
    return false;
  }
}

// Functional verification for concurrent rendering behavior
async function functionalVerify() {
  let allPassed = true;
  try {
    // Require React component module
    const module = require('./App.jsx');
    // The default export could be a React component function or class
    const Component = module.default || module;

    // Render React component (without JSX - use React.createElement)
    render(React.createElement(Component));

    const status = screen.getByTestId('status');
    if (status.textContent !== 'Idle') {
      console.log('✘ Initial status is not Idle');
      allPassed = false;
    } else {
      console.log('✔ Initial status is Idle');
    }

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test' } });

    if (screen.getByTestId('status').textContent !== 'Updating...') {
      console.log('✘ Status did not change to Updating...');
      allPassed = false;
    } else {
      console.log('✔ Status changed to Updating...');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Concurrent Rendering behavior is correct.');
    } else {
      console.log('\n❗ Concurrent Rendering behavior check failed. Please review your React code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

// Main execution
(async () => {
  const startTime = performance.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further checks.');
    process.exit(1);
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
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
