// Page 8 
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');

// File paths
const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'result.txt';

// Read JavaScript code
const code = fs.readFileSync('script.js', 'utf-8');

// Helper: Read attempts (default to 1)
function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
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
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, es2021: true },
      parserOptions: { ecmaVersion: 12, sourceType: 'module', ecmaFeatures: { jsx: true } },
      plugins: ['react'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'warn',
      },
    },
  });

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

// Structural verification for Advanced Error Handling
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let suspenseElements = 0;
    let errorBoundaryClasses = 0;

    traverse(ast, {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'Suspense') {
          suspenseElements++;
        }
      },
      ClassDeclaration(path) {
        if (path.node.superClass && path.node.superClass.name === 'Component') {
          const hasGetDerivedState = path.node.body.body.some(
            (node) => node.type === 'ClassMethod' && node.key.name === 'getDerivedStateFromError'
          );
          if (hasGetDerivedState) {
            errorBoundaryClasses++;
          }
        }
      },
    });

    if (suspenseElements === 0) {
      console.log('✘ No Suspense elements found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${suspenseElements} Suspense element(s)`);
    }
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

// Functional verification for Advanced Error Handling
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = await import('./script.js');
    const Component = module.default;

    const consoleError = console.error;
    console.error = jest.fn(); // Suppress error logs
    render(<Component />);
    console.error = consoleError;

    const fallback = screen.getByTestId('fallback');
    if (fallback.textContent !== 'Loading...') {
      console.log('✘ Fallback is not Loading...');
      allPassed = false;
    } else {
      console.log('✔ Fallback is Loading...');
    }

    await waitFor(() => {
      const error = screen.getByTestId('error');
      if (error.textContent !== 'Error Caught') {
        console.log('✘ Error boundary did not catch error');
        allPassed = false;
      } else {
        console.log('✔ Error boundary caught error');
      }
    }, { timeout: 1500 });

    if (allPassed) {
      console.log('\n🎉 Success! Advanced Error Handling behavior is correct.');
    } else {
      console.log('\n❗ Advanced Error Handling behavior check failed. Please review your React code.');
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