// Page 3 
console.clear();
console.clear();
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const io = require('socket.io-client');

jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn(),
    disconnect: jest.fn(),
    emit: jest.fn(),
  };
  return jest.fn(() => mockSocket);
});

const code = fs.readFileSync('script.js', 'utf-8');

function readAttempts() {
  if (fs.existsSync('attempts.tests')) {
    try {
      const data = JSON.parse(fs.readFileSync('attempts.tests', 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
      console.log('Error parsing attempts.tests. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.tests', JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to attempts.tests: ${e}`);
  }
}

async function syntaxVerify() {
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, es2021: true },
      parserOptions: { ecmaVersion: 12, sourceType: 'module', ecmaFeatures: { jsx: true } },
      plugins: ['react', 'react-hooks'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'warn',
        'react-hooks/rules-of-hooks': 'error',
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

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let socketIoCalls = 0;

    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee && path.node.callee.name === 'io') {
          socketIoCalls++;
        }
      },
    });

    if (socketIoCalls === 0) {
      console.log('✘ No socket.io calls found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${socketIoCalls} socket.io call(s)`);
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
    const module = await import('./script.js');
    const Component = module.default;

    render(<Component />);
    const socket = io();
    const messageHandler = socket.on.mock.calls.find((call) => call[0] === 'message')[1];

    messageHandler('Test Message');
    const messageText = screen.getByTestId('message');
    if (messageText.textContent !== 'Test Message') {
      console.log('✘ WebSocket message is not rendered');
      allPassed = false;
    } else {
      console.log('✔ WebSocket message is rendered');
    }

    if (allPassed) {
      console.log('\n🎉 Success! WebSocket behavior is correct.');
    } else {
      console.log('\n❗ WebSocket behavior check failed. Please review your Next.js code.');
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Functional test failed: ${e}`);
    return false;
  }
}

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
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2), 'utf-8');
      
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to results.tests: ${e}`);
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();