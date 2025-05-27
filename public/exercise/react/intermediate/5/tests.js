console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');

// File paths
const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'result.txt';

// Read JavaScript code
const code = fs.readFileSync('App.jsx', 'utf-8');

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

// Structural verification for React Router elements
function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let routeElements = 0;
    let linkElements = 0;

    traverse(ast, {
      JSXElement(path) {
        const name = path.node.openingElement.name;
        // Support for nested JSX names (e.g. ReactRouterDOM.Route)
        const elementName = name.type === 'JSXIdentifier' ? name.name : null;
        if (elementName === 'Route') {
          routeElements++;
        }
        if (elementName === 'Link') {
          linkElements++;
        }
      },
    });

    if (routeElements === 0) {
      console.log('✘ No Route elements found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${routeElements} Route element(s)`);
    }
    if (linkElements === 0) {
      console.log('✘ No Link elements found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${linkElements} Link element(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

// Functional verification for React Router navigation
async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default;

    render(
      <MemoryRouter initialEntries={['/']}>
        <Component />
      </MemoryRouter>
    );

    const home = screen.getByTestId('home');
    if (!home) {
      console.log('✘ Home page is not rendered');
      allPassed = false;
    } else {
      console.log('✔ Home page is rendered');
    }

    const aboutLink = screen.getByTestId('about-link');
    fireEvent.click(aboutLink);

    // Wait for about page render (optional: add wait or timeout here if needed)
    const about = screen.queryByTestId('about');
    if (!about) {
      console.log('✘ About page is not rendered after navigation');
      allPassed = false;
    } else {
      console.log('✔ About page is rendered after navigation');
    }

    if (allPassed) {
      console.log('\n🎉 Success! React Router behavior is correct.');
    } else {
      console.log('\n❗ React Router behavior check failed. Please review your React code.');
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
