const { HTMLHint } = require('htmlhint');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.json');
const resultFile = path.join(__dirname, 'result.txt');

// Read HTML
const html = fs.readFileSync('index.html', 'utf8');

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
  fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
}

// Syntax Verification
function syntaxVerify() {
  const results = HTMLHint.verify(html);

  if (results.length === 0) {
    console.log('✔ HTML syntax is valid.');
    return true;
  } else {
    console.log('❌ HTML Syntax is not valid: ');
    results.forEach((msg) => {
      console.log(`- [${msg.rule.id}] ${msg.message} (line ${msg.line})`);
    });
    return false;
  }
}

// Code Structure Verification
function codeVerify($) {
  let allPassed = true;

  function check(tag, description) {
    if ($(tag).length > 0) {
      console.log(`✔ ${description} exists`);
    } else {
      console.log(`✘ ${description} is missing`);
      allPassed = false;
    }
  }

  check('title', '<title>');
  check('h1', '<h1> heading');
  check('p', '<p> paragraph');

  if (allPassed) {
    console.log('\n🎉 Success! All elements are present.');
  } else {
    console.log('\n❗ One or more elements are missing. Please try again.');
  }

  return allPassed;
}

// Start execution timer
const startTime = process.hrtime();
const $ = cheerio.load(html);

// Run syntax verification first
const syntaxPassed = syntaxVerify();

if (!syntaxPassed) {
  console.log('🚨 Syntax failed, skipping structure verification.');
  process.exit(); // Exit if syntax is invalid
}

// Run structure verification only if syntax passed
const structurePassed = codeVerify($);
const allPassed = syntaxPassed && structurePassed;

// Execution metrics
const [sec, nanosec] = process.hrtime(startTime);
const executionTime = +(sec + nanosec / 1e9).toFixed(3);
const linesOfCode = html.split('\n').filter((line) => line.trim()).length;

// Read current attempts
let attempts = readAttempts();

// Save results only if all tests passed
if (allPassed) {
  const resultData = {
    attempts,
    linesOfCode,
    executionTime,
    syntaxCheckPassed: syntaxPassed,
    structureCheckPassed: structurePassed,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(resultFile, JSON.stringify(resultData, null, 2));
  console.log(`\n✅ All tests passed.`);
} else {
  // Only increment attempts if tests failed
  attempts += 1;
  writeAttempts(attempts);
  console.log(`\n❌ One or more tests failed.`);
}