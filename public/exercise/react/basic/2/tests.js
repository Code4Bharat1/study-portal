require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
});

console.clear();

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  userAgent: 'node.js',
};

const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
require('@testing-library/dom');

const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';

// Read code from App.jsx in current directory
const APP_FILE = path.resolve(__dirname, 'App.jsx');
const code = fs.readFileSync(APP_FILE, 'utf-8');

function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      console.log('Warning: Failed to parse attempts.tests. Resetting to 1.');
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

async function syntaxVerify() {
  const eslint = new ESLint();

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((msg) => msg.severity === 2);

    if (errors.length === 0) {
      console.log('Syntax Check Passed: No errors found.');
      return true;
    } else {
      console.log('Syntax Error: Your code has the following issue(s):');
      errors.forEach((err) =>
        console.log(`  Line ${err.line}, Column ${err.column}: ${err.message} [Rule: ${err.ruleId || 'unknown'}]`)
      );
      return false;
    }
  } catch (e) {
    console.log(`ESLint failed to run:\nReason: ${e.message}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;

  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let functionalComponents = 0;
    let componentsReturningJSX = 0;

    traverse(ast, {
      FunctionDeclaration(path) {
        if (
          path.node.id &&
          /^[A-Z]/.test(path.node.id.name) &&
          path.node.body.body.some(
            (stmt) =>
              stmt.type === 'ReturnStatement' &&
              stmt.argument &&
              (stmt.argument.type === 'JSXElement' || stmt.argument.type === 'JSXFragment')
          )
        ) {
          functionalComponents++;
          componentsReturningJSX++;
        }
      },
      VariableDeclarator(path) {
        const id = path.node.id;
        const init = path.node.init;
        if (
          id.type === 'Identifier' &&
          /^[A-Z]/.test(id.name) &&
          (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression'))
        ) {
          if (init.body.type === 'JSXElement' || init.body.type === 'JSXFragment') {
            functionalComponents++;
            componentsReturningJSX++;
          } else if (init.body.type === 'BlockStatement') {
            let returnsJSX = false;
            path.get('init').traverse({
              ReturnStatement(returnPath) {
                if (
                  returnPath.node.argument &&
                  (returnPath.node.argument.type === 'JSXElement' ||
                    returnPath.node.argument.type === 'JSXFragment')
                ) {
                  returnsJSX = true;
                }
              },
            });
            if (returnsJSX) {
              functionalComponents++;
              componentsReturningJSX++;
            }
          }
        }
      },
    });

    if (functionalComponents === 0) {
      console.log('Structure Error: No functional components found.');
      allPassed = false;
    } else {
      console.log(`Structure Check Passed: Found ${functionalComponents} functional component(s).`);
    }

    if (componentsReturningJSX === 0) {
      console.log('Structure Error: No components returning JSX found.');
      allPassed = false;
    } else {
      console.log(`Structure Check Passed: Found ${componentsReturningJSX} component(s) returning JSX.`);
    }

    return allPassed;
  } catch (e) {
    console.log(`JSX Parsing Failed:\nReason: ${e.message}`);
    return false;
  }
}


async function functionalVerify() {
  try {
    
    const Component = require('./App.jsx').default;

    render(Component());

    // Search for heading with text "My App"
    const heading = screen.queryByRole('heading', { name: /My App/i });
    if (!heading) {
      const fallback = screen.queryByText(/My App/i);
      if (!fallback) {
        console.log('Functional Error: Could not find any element containing text "My App".');
        return false;
      }
    }

    console.log('Functional Check Passed: Found element containing expected text "My App".');
    return true;
  } catch (e) {
    console.log(`Functional Test Failed:\nReason: ${e.message}`);
    return false;
  }
}

(async () => {
  const startTime = Date.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\nAborting due to syntax errors.');
    process.exit(1);
  }

  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();

  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = ((Date.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = code.split('\n').filter((line) => line.trim() !== '').length;

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
      console.log(`\nAll checks passed. Results saved to ${RESULT_FILE}.`);
      process.exit(0);
    } catch (e) {
      console.log(`Error writing result: ${e.message}`);
      process.exit(1);
    }
  } else {
    attempts++;
    writeAttempts(attempts);
    console.log(`\nOne or more checks failed. Attempt #${attempts}. Please review and try again.`);
    process.exit(1);
  }
})();
