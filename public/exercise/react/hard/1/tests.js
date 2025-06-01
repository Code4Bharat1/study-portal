console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/dom');

const ATTEMPTS_FILE = 'attempts.json';
const RESULT_FILE = 'results.tests';
const FILE_PATH = 'App.jsx';

const code = fs.readFileSync(FILE_PATH, 'utf-8');

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
    const [result] = await eslint.lintText(code, { filePath: FILE_PATH });
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
    console.log(`✘ ESLint failed: ${e.message}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let configureStoreCalls = 0;
    let useSelectorCalls = 0;
    let useDispatchCalls = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.name === 'configureStore') {
          configureStoreCalls++;
        }
        if (path.node.callee.name === 'useSelector') {
          useSelectorCalls++;
        }
        if (path.node.callee.name === 'useDispatch') {
          useDispatchCalls++;
        }
      },
    });

    if (configureStoreCalls === 0) {
      console.log('✘ No configureStore calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${configureStoreCalls} configureStore call(s)`);
    }
    if (useSelectorCalls === 0) {
      console.log('✘ No useSelector calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${useSelectorCalls} useSelector call(s)`);
    }
    if (useDispatchCalls === 0) {
      console.log('✘ No useDispatch calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${useDispatchCalls} useDispatch call(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e.message}`);
    return false;
  }
}

function functionalVerify() {
  let allPassed = true;
  try {
    delete require.cache[require.resolve('./App.jsx')];
    const Component = require('./App.jsx').default;

    render(<Component />);

    // 🔧 Customize this block per task
    const heading = screen.getByRole('heading', { name: /My App/i });
    if (heading) {
      console.log('✔ Heading with "My App" found.');
    } else {
      console.log('✘ Heading with "My App" not found.');
      allPassed = false;
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e.message}`);
    return false;
  }
}

(async () => {
  const startTime = performance.now();

  const syntaxPassed = await syntaxVerify();
  if (!syntaxPassed) {
    console.log('\n❌ Syntax errors prevent further checks.');
    process.exit(1);
  }

  const structurePassed = codeVerify();
  const functionalPassed = functionalVerify();
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
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();
