console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');

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

// Structural verification for error boundaries
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let errorBoundaryClasses = 0;

    traverse(ast, {
      ClassDeclaration(path) {
        if (
          path.node.superClass &&
          ((path.node.superClass.type === 'Identifier' &&
            path.node.superClass.name === 'Component') ||
           (path.node.superClass.type === 'MemberExpression' &&
            path.node.superClass.property.name === 'Component'))
        ) {
          const hasGetDerivedState = path.node.body.body.some(
            (node) =>
              (node.type === 'ClassMethod' || node.type === 'ClassProperty') &&
              node.key.name === 'getDerivedStateFromError'
          );
          if (hasGetDerivedState) {
            errorBoundaryClasses++;
          }
        }
      },
    });

    if (errorBoundaryClasses === 0) {
      console.log('✘ No error boundary classes found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${errorBoundaryClasses} error boundary class(es)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for error boundaries
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default;

    // Suppress console.error for React error boundary logs during test
    const originalConsoleError = console.error;
    console.error = () => {};

    render(<Component />);

    console.error = originalConsoleError;

    const errorMessage = screen.getByTestId('error');
    if (!errorMessage || errorMessage.textContent !== 'Something went wrong') {
      console.log('✘ Error boundary did not render error message');
      allPassed = false;
    } else {
      console.log('✔ Error boundary rendered error message');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Error boundary behavior is correct.');
    } else {
      console.log('\n❗ Error boundary behavior check failed. Please review your React code.');
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
