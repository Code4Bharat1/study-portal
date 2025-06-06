// Page 6 (adapted for App.jsx, require, no jest-dom, use dom only)
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/dom');
const { MemoryRouter } = require('react-router-dom');

// File paths
const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';

// Read JavaScript code from App.jsx
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

// Syntax verification using ESLint (default config)
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

// Structural verification for SSR: check getServerSideProps export
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let getServerSidePropsCount = 0;

    traverse(ast, {
      ExportNamedDeclaration(path) {
        const decl = path.node.declaration;
        if (decl && decl.id && decl.id.name === 'getServerSideProps') {
          getServerSidePropsCount++;
        }
      },
    });

    if (getServerSidePropsCount === 0) {
      console.log('✘ No getServerSideProps function found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${getServerSidePropsCount} getServerSideProps function(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for SSR (using require)
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default || module;
    const getServerSideProps = module.getServerSideProps;

    if (typeof getServerSideProps !== 'function') {
      console.log('✘ getServerSideProps is not a function');
      return false;
    }

    const { props } = await getServerSideProps();

    render(<Component {...props} />, { wrapper: MemoryRouter });

    const data = screen.getByTestId('data');
    if (data.textContent !== 'SSR Data') {
      console.log('✘ SSR data is not rendered');
      allPassed = false;
    } else {
      console.log('✔ SSR data is rendered');
    }

    if (allPassed) {
      console.log('\n🎉 Success! SSR behavior is correct.');
    } else {
      console.log('\n❗ SSR behavior check failed. Please review your React code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e.message || e}`);
    return false;
  }
}

// Main execution
(async () => {
  const startTime = Date.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further checks.');
    ;
  }

  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = Number((Date.now() - startTime) / 1000).toFixed(3);
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
