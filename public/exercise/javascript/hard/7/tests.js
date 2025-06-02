const { ESLint } = require('eslint');
const esprima = require('esprima');
console.clear();
console.clear();
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');

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
      console.error('Error parsing attempts.tests. Resetting counter.');
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

// Module Bundling and Lazy Loading Verification
function codeVerify() {
  let allPassed = true;
  let ast;
  try {
    ast = esprima.parseModule(js, { tolerant: true });
  } catch (err) {
    console.log(`✘ Failed to parse JavaScript: ${err.message}`);
    return false;
  }

  let dynamicImports = 0;
  function traverse(node) {
    if (node.type === 'ImportExpression') {
      dynamicImports++;
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(ast);

  if (dynamicImports === 0) {
    console.log('✘ No dynamic import() expressions found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${dynamicImports} dynamic import() expression(s)`);
  }

  let asyncFunctions = 0;
  ast.body.forEach(node => {
    if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') && node.async && node.body.body.some(child => child.type === 'ExpressionStatement' && child.expression.type === 'AwaitExpression' && child.expression.argument.type === 'ImportExpression')) {
      asyncFunctions++;
    }
  });

  if (asyncFunctions === 0) {
    console.log('✘ No async functions with dynamic imports found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${asyncFunctions} async function(s) with dynamic imports`);
  }

  if (allPassed) {
    console.log('\n🎉 Success! Module bundling and lazy loading are correct.');
  } else {
    console.log('\n❗ Module bundling or lazy loading check failed. Please review your JavaScript.');
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