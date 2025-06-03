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
const js = fs.readFileSync('index.js', 'utf8');

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

// Handling HTTP Requests Verification
function codeVerify() {
  let allPassed = true;
  let ast;
  try {
    ast = esprima.parseScript(js, { tolerant: true });
  } catch (err) {
    console.log(`✘ Failed to parse JavaScript: ${err.message}`);
    return false;
  }

  let requestHandling = 0;
  function traverse(node) {
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'http' && node.callee.property.name === 'createServer') {
      if (node.arguments[0].type === 'FunctionExpression' && node.arguments[0].body.body.some(child => child.type === 'IfStatement' && child.test.type === 'BinaryExpression' && child.test.left.type === 'MemberExpression' && child.test.left.property.name === 'method')) {
        requestHandling++;
      }
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(ast);

  if (requestHandling === 0) {
    console.log('✘ No HTTP request method handling (e.g., req.method) found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${requestHandling} HTTP request method handling instance(s)`);
  }

  let responseWrite = 0;
  traverse(ast);
  ast.body.forEach(node => {
    if (node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression' && node.expression.callee.type === 'MemberExpression' && node.expression.callee.property.name === 'write' && node.expression.callee.object.type === 'Identifier') {
      responseWrite++;
    }
  });

  if (responseWrite === 0) {
    console.log('✘ No res.write calls found');
    allPassed = false;
  } else {
    console.log(`✔ Found ${responseWrite} res.write call(s)`);
  }

  if (allPassed) {
    console.log('\n🎉 Success! HTTP request handling is correct.');
  } else {
    console.log('\n❗ HTTP request handling check failed. Please review your JavaScript.');
  }
  return allPassed;
}

// Main execution
(async () => {
  const startTime = process.hrtime();
const syntaxPassed = await syntaxVerify();
if (!syntaxPassed) {
  console.log('\n❌ Syntax errors prevent further checks.');
  ;
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
    ;
  }
})();