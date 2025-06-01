const { HTMLHint } = require('htmlhint');
const cheerio = require('cheerio');
console.clear();
console.clear();
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.json');
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

// Boilerplate and Navigation Menu Verification
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

  // Navigation Menu Checks
  const navs = $('body nav');
  if (navs.length > 0) {
    console.log(`✔ Found ${navs.length} <nav> tag(s)`);
    let allNavsValid = true;
    navs.each((index, nav) => {
      const list = $(nav).find('ul, ol');
      if (list.length === 0) {
        console.log(`✘ Nav ${index + 1} missing <ul> or <ol>`);
        allNavsValid = false;
        allPassed = false;
      } else {
        console.log(`✔ Nav ${index + 1} has list`);
        list.each((i, lst) => {
          const items = $(lst).find('li');
          if (items.length < 2) {
            console.log(`✘ Nav ${index + 1} list ${i + 1} has fewer than 2 <li> items`);
            allNavsValid = false;
            allPassed = false;
          } else {
            console.log(`✔ Nav ${index + 1} list ${i + 1} has ${items.length} <li> items`);
            items.each((j, item) => {
              const link = $(item).find('a');
              if (link.length === 0) {
                console.log(`✘ Nav ${index + 1} list ${i + 1} item ${j + 1} missing <a>`);
                allNavsValid = false;
                allPassed = false;
              } else {
                link.each((k, lnk) => {
                  const href = $(lnk).attr('href');
                  if (!href || href.trim() === '') {
                    console.log(`✘ Nav ${index + 1} list ${i + 1} item ${j + 1} link ${k + 1} missing href`);
                    allNavsValid = false;
                    allPassed = false;
                  } else {
                    const urlPattern = /^(https?:\/\/|\/|mailto:|#)/;
                    if (!urlPattern.test(href)) {
                      console.log(`✘ Nav ${index + 1} list ${i + 1} item ${j + 1} link ${k + 1} has invalid href`);
                      allNavsValid = false;
                      allPassed = false;
                    } else {
                      console.log(`✔ Nav ${index + 1} list ${i + 1} item ${j + 1} link ${k + 1} has valid href`);
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
    if (allNavsValid) {
      console.log('✔ All <nav> tags are valid');
    }
  } else {
    console.log('✘ At least one <nav> is required');
    allPassed = false;
  }

  if (allPassed) {
    console.log('\n🎉 Success! HTML boilerplate and navigation menu are correct.');
  } else {
    console.log('\n❗ Boilerplate or navigation menu check failed. Please review your HTML.');
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