// Page 1 (adapted for App.jsx, require, no jest-dom, ESLint new ESLint())
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, waitFor } = require('@testing-library/react');

const ATTEMPTS_FILE = 'attempts.tests';
const RESULT_FILE = 'results.tests';

const code = fs.readFileSync('App.jsx', 'utf-8');

function readAttempts() {
  if (fs.existsSync(ATTEMPTS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(ATTEMPTS_FILE, 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch {
      console.log('Error parsing attempts.tests. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to ${ATTEMPTS_FILE}: ${e}`);
  }
}

async function syntaxVerify() {
  const eslint = new ESLint();

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter(msg => msg.severity === 2);
    if (errors.length === 0) {
      console.log('✔ JavaScript/JSX syntax is valid.');
      return true;
    } else {
      console.log('❌ JavaScript/JSX syntax is not valid:');
      errors.forEach(err => console.log(`  ${err.message} (line ${err.line})`));
      return false;
    }
  } catch (e) {
    console.log(`✘ ESLint failed: ${e}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let useEffectCalls = 0;
    let cleanupFunctions = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'useEffect') {
          useEffectCalls++;
          if (path.node.arguments[0].body && path.node.arguments[0].body.body) {
            path.node.arguments[0].body.body.forEach(node => {
              if (node.type === 'ReturnStatement') {
                cleanupFunctions++;
              }
            });
          }
        }
      },
    });

    if (useEffectCalls === 0) {
      console.log('✘ No useEffect calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${useEffectCalls} useEffect call(s)`);
    }
    if (cleanupFunctions === 0) {
      console.log('✘ No cleanup functions found in useEffect');
      allPassed = false;
    } else {
      console.log(`✔ Found ${cleanupFunctions} cleanup function(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const module = require('./App.jsx');
    const Component = module.default || module;

    render(<Component />);
    const data = screen.getByTestId('data');

    if (data.textContent !== 'Loading...') {
      console.log('✘ Initial data is not Loading...');
      allPassed = false;
    } else {
      console.log('✔ Initial data is Loading...');
    }

    await waitFor(() => {
      if (data.textContent !== 'API Data') {
        throw new Error('Data did not update to API Data');
      }
    }, { timeout: 1500 }).then(() => {
      console.log('✔ Data updated to API Data');
    }).catch(() => {
      console.log('✘ Data did not update to API Data');
      allPassed = false;
    });

    if (allPassed) {
      console.log('\n🎉 Success! useEffect behavior is correct.');
    } else {
      console.log('\n❗ useEffect behavior check failed. Please review your React code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e.message || e}`);
    return false;
  }
}

const performance = global.performance || { now: () => Date.now() };

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
      console.log(`\n✅ All tests passed. Results saved to ${RESULT_FILE}.`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to ${RESULT_FILE}: ${e}`);
      ;
    }
  } else {
    attempts++;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();
