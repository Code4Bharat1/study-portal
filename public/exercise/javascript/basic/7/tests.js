const { ESLint } = require('eslint');
const esprima = require('esprima');
console.clear();
console.clear();
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.json');
const resultFile = path.join(__dirname, 'result.txt');

// Read JavaScript
const js = fs.readFileSync('script.js', 'utf8');

// Helper: Read Attempts (default to 1)
function readAttempts() {
  if (fs.existsSync(attemptsFile)) {
    const data = fs.readFileSync(attemptsFile, 'utf8');
    try {
      const parsed = JSON.parse(data);
      return parsed.count >= 1 ? parsed.count : 1;
    } catch (err) {
      console.error('Error parsing attempts.json. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

// Helper: Write Attempt Count
function writeAttempts(count) {
  try {
    fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error(`Failed to write to ${attemptsFile}: ${err.message}`);
  }
}

// Syntax Verification using ESLint
async function syntaxVerify() {
  const eslint = new ESLint();
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          window: 'readonly',
          document: 'readonly',
        },
      },
      rules: {
        // Example: 'no-unused-vars': 'error'
      },
    },
  ]);    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          window: 'readonly',
          document: 'readonly',
        },
      },
      rules: {
        // Example: 'no-unused-vars': 'error'
      },
    },
  ]);  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  } else {
    console.log('❌ JavaScript syntax is not valid:');
    results[0].messages.forEach(msg => console.log(`- [${msg.ruleId}] ${msg.message} (line ${msg.line})`));
    return false;
  }
}

// DOM Manipulation Basics Verification
function codeVerify() {
  let allPassed = true;
  let ast;
  try {
    ast = esprima.parseScript(js, { tolerant: true });
  } catch (err) {
    console.log(`✘ Failed to parse JavaScript: ${err.message}`);
    return false;
  }

  let domMethods = 0;
  let domProperties = 0;
  function traverse(node) {
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'document' && node.callee.property.name === 'getElementById') {
      domMethods++;
    }
    if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && ['textContent', 'innerText', 'innerHTML'].includes(node.left.property.name)) {
      domProperties++;
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(ast);

  if (domMethods === 0) {
    console.log('✘ No document.getElementById calls found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${domMethods} document.getElementById call(s)`);
  }
  if (domProperties === 0) {
    console.log('✘ No DOM property assignments (textContent, innerText, or innerHTML) found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${domProperties} DOM property assignment(s)`);
  }

  if (allPassed) {
    console.log('\n🎉 Success! DOM manipulation is correct.');
  } else {
    console.log('\n❗ DOM manipulation check failed. Please review your JavaScript.');
  }
  return allPassed;
}

// Main execution
(async () => {
  const startTime = process.hrtime();
const syntaxPassed = await syntaxVerify();
if (!syntaxPassed) {
  console.log('\n❌ Syntax errors prevent further checks.');
  process.exit(1);
}

  const structurePassed = codeVerify();
  const allPassed = syntaxPassed && structurePassed;

  const [sec, nanosec] = process.hrtime(startTime);
  const executionTime = +(sec + nanosec / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();
  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, syntaxCheckPassed: syntaxPassed, structureCheckPassed: structurePassed, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync(resultFile, JSON.stringify(resultData, null, 2));
      console.log(`\n✅ All tests passed. Results saved to ${resultFile}.`);
    } catch (err) {
      console.error(`Failed to write to ${resultFile}: ${err.message}`);
    }
    process.exit(0);
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();