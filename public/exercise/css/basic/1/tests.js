// Page 1 
console.clear();
console.clear();
const fs = require('fs');
const stylelint = require('stylelint');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');

const css = fs.readFileSync('style.css', 'utf-8');

function readAttempts() {
  try {
    return fs.existsSync('attempts.json') ? JSON.parse(fs.readFileSync('attempts.json')).count || 1 : 1;
  } catch {
    return 1;
  }
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.json', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write attempts.json: ${e}`);
  }
}

async function syntaxVerify() {
  try {
    const { results } = await stylelint.lint({ code: css, config: { extends: 'stylelint-config-standard' } });
    const errors = results[0].warnings.filter(w => w.severity === 'error');
    if (errors.length === 0) {
      console.log('✔ CSS syntax is valid.');
      return true;
    }
    console.log('❌ CSS syntax errors:');
    errors.forEach(err => console.log(`  ${err.text} (line ${err.line})`));
    return false;
  } catch (e) {
    console.log(`✘ Stylelint failed: ${e}`);
    return false;
  }
}

async function codeVerify() {
  let allPassed = true;
  try {
    const root = await postcss.parse(css);
    let classSelectors = 0;
    let idSelectors = 0;
    root.walkRules(rule => {
      if (rule.selector.startsWith('.')) classSelectors++;
      if (rule.selector.startsWith('#')) idSelectors++;
    });
    if (classSelectors === 0) {
      console.log('✘ No class selectors found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${classSelectors} class selector(s)`);
    }
    if (idSelectors === 0) {
      console.log('✘ No ID selectors found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${idSelectors} ID selector(s)`);
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse CSS: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const dom = new JSDOM(`
      <div class="test-class" id="test-id" data-testid="selector">Test</div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const element = window.document.querySelector('[data-testid="selector"]');
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.color !== 'rgb(0, 0, 255)') {
      console.log('✘ Class selector not applied');
      allPassed = false;
    } else {
      console.log('✔ Class selector applied');
    }
    if (computedStyle.fontWeight !== '700') {
      console.log('✘ ID selector not applied');
      allPassed = false;
    } else {
      console.log('✔ ID selector applied');
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
  process.exit(1);
}

  const structurePassed = await codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = css.split('\n').filter(line => line.trim()).length;

  let attempts = readAttempts();
  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, syntaxCheckPassed: syntaxPassed, structureCheckPassed: structurePassed, functionalCheckPassed: functionalPassed, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      
      process.exit(0);
    } catch (e) {
      
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ Tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();