// Page 9 
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');
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

// Structural verification for forms
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let inputElements = 0;
    let valueProps = 0;

    traverse(ast, {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'input') {
          inputElements++;
        }
      },
      JSXAttribute(path) {
        if (path.node.name.name === 'value' && path.node.value.type === 'JSXExpressionContainer') {
          valueProps++;
        }
      },
    });

    if (inputElements === 0) {
      console.log('✘ No input elements found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${inputElements} input element(s)`);
    }
    if (valueProps === 0) {
      console.log('✘ No controlled input value props found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${valueProps} controlled input value prop(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for form handling
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = await import('./script.js');
    const Component = module.default;

    render(Component());
    const input = screen.getByTestId('name-input');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'Alice' } });
    if (input.value !== 'Alice') {
      console.log('✘ Input did not update to Alice');
      allPassed = false;
    } else {
      console.log('✔ Input updated to Alice');
    }

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(submitButton);
    if (!alertSpy.mock.calls.some((call) => call[0].includes('Submitted: Alice'))) {
      console.log('✘ Form submission did not trigger correct alert');
      allPassed = false;
    } else {
      console.log('✔ Form submission triggered correct alert');
    }
    alertSpy.mockRestore();

    if (allPassed) {
      console.log('\n🎉 Success! Form handling is correct.');
    } else {
      console.log('\n❗ Form handling check failed. Please review your React code.');
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