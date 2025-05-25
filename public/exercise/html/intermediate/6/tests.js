const { HTMLHint } = require('htmlhint');
const cheerio = require('cheerio');
console.clear();
console.clear();
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
    'attr-no-duplication': true,
    'attr-value-not-empty': true,
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

// Boilerplate and ARIA Verification
function codeVerify($) {
  let allPassed = true;

  // Boilerplate Checks
  if (!/^<!DOCTYPE html>/i.test(html.trim())) {
    console.log('✘ <!DOCTYPE html> declaration is missing or incorrect');
    allPassed = false;
  } else {
    console.log('✔ <!DOCTYPE html> is present');
  }

  if ($('html').length > 0) {
    const htmlLang = $('html').attr('lang');
    if (htmlLang === 'en') {
      console.log('✔ <html> has lang="en"');
    } else {
      console.log(`✘ <html> should have lang="en", but found lang="${htmlLang || 'missing'}"`);
      allPassed = false;
    }
  } else {
    console.log('✘ <html> is missing');
    allPassed = false;
  }

  if ($('head').length > 0) {
    console.log('✔ <head> exists');
  } else {
    console.log('✘ <head> is missing');
    allPassed = false;
  }

  const metaCharset = $('head meta[charset]');
  if (metaCharset.length > 0 && metaCharset.attr('charset').toLowerCase() === 'utf-8') {
    console.log('✔ <meta charset="UTF-8"> is present');
  } else {
    console.log('✘ <meta charset="UTF-8"> is missing or incorrect');
    allPassed = false;
  }

  const metaViewport = $('head meta[name="viewport"]');
  if (metaViewport.length > 0 && metaViewport.attr('content') === 'width=device-width, initial-scale=1.0') {
    console.log('✔ <meta name="viewport" content="width=device-width, initial-scale=1.0"> is present');
  } else {
    console.log('✘ <meta name="viewport" content="width=device-width, initial-scale=1.0"> is missing or incorrect');
    allPassed = false;
  }

  if ($('head title').length > 0) {
    const titleText = $('title').text().trim();
    if (titleText) {
      console.log('✔ <title> exists in <head> with text');
    } else {
      console.log('✘ <title> is empty');
      allPassed = false;
    }
  } else {
    console.log('✘ <title> is missing or not in <head>');
    allPassed = false;
  }

  if ($('body').length > 0) {
    console.log('✔ <body> exists');
  } else {
    console.log('✘ <body> is missing');
    allPassed = false;
  }

  // ARIA Checks
  const ariaLabel = $('[aria-label]');
  if (ariaLabel.length > 0) {
    console.log(`✔ Found ${ariaLabel.length} element(s) with aria-label`);
    let allLabelsValid = true;
    ariaLabel.each((index, elem) => {
      const label = $(elem).attr('aria-label');
      if (!label || label.trim() === '') {
        console.log(`✘ Element ${index + 1} has empty aria-label`);
        allLabelsValid = false;
        allPassed = false;
      } else {
        console.log(`✔ Element ${index + 1} has aria-label: "${label}"`);
      }
    });
    if (allLabelsValid) {
      console.log('✔ All aria-label attributes are valid');
    }
  } else {
    console.log('✘ At least one aria-label attribute is required');
    allPassed = false;
  }

  const ariaRole = $('[role]');
  if (ariaRole.length > 0) {
    console.log(`✔ Found ${ariaRole.length} element(s) with role`);
    let allRolesValid = true;
    ariaRole.each((index, elem) => {
      const role = $(elem).attr('role');
      if (!role || role.trim() === '') {
        console.log(`✘ Element ${index + 1} has empty role`);
        allRolesValid = false;
        allPassed = false;
      } else {
        console.log(`✔ Element ${index + 1} has role: "${role}"`);
      }
    });
    if (allRolesValid) {
      console.log('✔ All role attributes are valid');
    }
  } else {
    console.log('✘ At least one role attribute is required');
    allPassed = false;
  }

  const ariaHidden = $('[aria-hidden="true"]');
  if (ariaHidden.length > 0) {
    console.log(`✔ Found ${ariaHidden.length} element(s) with aria-hidden="true"`);
  } else {
    console.log('✘ At least one aria-hidden="true" attribute is required');
    allPassed = false;
  }

  if (allPassed) {
    console.log('\n🎉 Success! HTML boilerplate and ARIA attributes are correct.');
  } else {
    console.log('\n❗ Boilerplate or ARIA check failed. Please review your HTML.');
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
    syntaxCheckPassed: syntaxPassed,
    structureCheckPassed: structurePassed,
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