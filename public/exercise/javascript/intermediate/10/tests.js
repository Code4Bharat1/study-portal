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
  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  } else {
    console.log('❌ JavaScript syntax is not valid:');
    results[0].messages.forEach(msg => console.log(`- [${msg.ruleId}] ${msg.message} (line ${msg.line})`));
    return false;
  }
}

// DOM Manipulation with Datasets Verification
function codeVerify() {
  let allPassed = true;
  let ast;
  try {
    ast = esprima.parseScript(js, { tolerant: true });
  } catch (err) {
    console.log(`✘ Failed to parse JavaScript: ${err.message}`);
    return false;
  }

  let datasetAccess = 0;
  function traverse(node) {
    if (node.type === 'MemberExpression' && node.property.name === 'dataset') {
      datasetAccess++;
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(ast);

  if (datasetAccess === 0) {
    console.log('✘ No dataset property access found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${datasetAccess} dataset property access(es)`);
  }

  let domMethods = 0;
  traverse(ast);
  ast.body.forEach(node => {
    if (node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression' && node.expression.callee.type === 'MemberExpression' && node.expression.callee.object.name === 'document' && ['getElementById', 'querySelector'].includes(node.expression.callee.property.name)) {
      domMethods++;
    }
  });

  if (domMethods === 0) {
    console.log('✘ No DOM selection methods (getElementById or querySelector) found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${domMethods} DOM selection method(s)`);
  }

  if (allPassed) {
    console.log('\n🎉 Success! DOM manipulation with datasets is correct.');
  } else {
    console.log('\n❗ DOM manipulation with datasets check failed. Please review your JavaScript.');
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