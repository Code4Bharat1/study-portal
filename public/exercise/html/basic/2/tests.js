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
  try {
    fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error(`Failed to write to ${attemptsFile}: ${err.message}`);
  }
}

// Syntax Verification using HTMLHint
function syntaxVerify() {
  const rules = {
    'tagname-lowercase': true,
    'attr-lowercase': true,
    'doctype-first': true,
    'tag-pair': true,
  };
  const results = HTMLHint.verify(html, rules);

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

// Code Structure Verification for Basic HTML and Headings
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
      return true;
    } else {
      console.log(`✘ ${description} is missing`);
      allPassed = false;
      return false;
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

  // Additional heading checks (h2 to h6)
  const headingLevels = ['h2', 'h3', 'h4', 'h5', 'h6'];
  let previousLevelFound = check('h1', '<h1> heading'); // Track if previous level exists

  headingLevels.forEach((tag, index) => {
    const level = index + 2; // h2 is level 2, h3 is level 3, etc.
    if ($(tag).length > 0) {
      console.log(`✔ <${tag}> heading exists`);
      // Check for proper nesting (no skipping levels)
      if (!previousLevelFound) {
        console.log(`✘ <${tag}> should not appear before <h${level - 1}>`);
        allPassed = false;
      }
      previousLevelFound = true;
    } else {
      console.log(`✔ <${tag}> is optional and not present`);
      previousLevelFound = false; // Reset if current level is missing
    }
  });

  if (allPassed) {
    console.log('\n🎉 Success! All basic HTML structure and heading elements are correct.');
  } else {
    console.log('\n❗ Structure or heading check failed. Please review your HTML.');
  }

  return allPassed;
}

// Start execution timer
const startTime = process.hrtime();
const $ = cheerio.load(html);

// Run both verifications
const syntaxPassed = syntaxVerify();
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

  try {
    fs.writeFileSync(resultFile, JSON.stringify(resultData, null, 2));
    console.log(`\n✅ All tests passed. Results saved to ${resultFile}.`);
  } catch (err) {
    console.error(`Failed to write to ${resultFile}: ${err.message}`);
  }
  process.exit(0);
} else {
  // Increment attempts if tests failed
  attempts += 1;
  writeAttempts(attempts);
  console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
  process.exit(1);
}