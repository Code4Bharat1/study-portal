const { HTMLHint } = require('htmlhint');
const cheerio = require('cheerio');
console.clear();
console.clear();
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');

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
      console.error('Error parsing attempts.tests. Resetting counter.');
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
// Syntax Verification using HTMLHint
function syntaxVerify() {
  const results = HTMLHint.verify(html);

  if (results.length === 0) {
    console.log('✔ HTML syntax is valid.');
    return true;
  } else {
    console.log('❌ HTML Syntax is not valid:');
    results.forEach((msg) => {
      console.log(`- [${msg.rule.id}] ${msg.message} (line ${msg.line})`);
    });
    return false;
  }
}

// Code Structure Verification for Basic HTML
function codeVerify($) {
  let allPassed = true;

  // Check for DOCTYPE manually from raw HTML
  if (!/^<!DOCTYPE html>/i.test(html.trim())) {
    console.log('✘ <!DOCTYPE html> declaration is missing or incorrect');
    allPassed = false;
  } else {
    console.log('✔ <!DOCTYPE html> is present');
  }

  // Structural tag checks
  function check(tag, description) {
    if ($(tag).length > 0) {
      console.log(`✔ ${description} exists`);
    } else {
      console.log(`✘ ${description} is missing`);
      allPassed = false;
    }
  }

  check('html', '<html>');
  check('head', '<head>');
  check('title', '<title>');
  check('body', '<body>');
  check('h1', '<h1> heading');

  // Specific title text check
  const titleText = $('title').text().trim();
  if (titleText === 'My First Page') {
    console.log('✔ <title> is correctly set to "My First Page"');
  } else {
    console.log(`✘ <title> should be "My First Page" but found "${titleText}"`);
    allPassed = false;
  }

  const headingText = $('h1').text().trim();
  if (headingText === 'Welcome to My Website') {
    console.log('✔ <h1> is correctly set to "Welcome to My Website"');
  } else {
    console.log(`✘ <h1> should be "Welcome to My Website" but found "${headingText}"`);
    allPassed = false;
  }

  if (allPassed) {
    console.log('\n🎉 Success! All basic HTML structure elements are correct.');
  } else {
    console.log('\n❗ Basic structure check failed. Please review your HTML.');
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