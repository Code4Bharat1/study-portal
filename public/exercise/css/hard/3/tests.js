// Page 3 
console.clear();
console.clear();
const fs = require('fs');
const stylelint = require('stylelint');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');
const scss = require('postcss-scss');

const css = fs.readFileSync('style.scss', 'utf-8');

function readAttempts() {
  try {
    return fs.existsSync('attempts.tests') ? JSON.parse(fs.readFileSync('attempts.tests')).count || 1 : 1;
  } catch {
    return 1;
  }
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.tests', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write attempts.tests: ${e}`);
  }
}

async function syntaxVerify() {
  try {
    const { results } = await stylelint.lint({ code: css, config: { extends: 'stylelint-config-standard-scss' } });
    const errors = results[0].warnings.filter(w => w.severity === 'error');
    if (errors.length === 0) {
      console.log('✔ SCSS syntax is valid.');
      return true;
    }
    console.log('❌ SCSS syntax errors:');
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
    const root = await postcss.parse(css, { syntax: scss });
    let functions = 0;
    root.walkAtRules('function', () => functions++);
    if (functions === 0) {
      console.log('✘ No SASS functions found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${functions} SASS function(s)`);
    }
    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse SCSS: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const dom = new JSDOM(`
      <div class="element" data-testid="element">Test</div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css.replace(/@use 'sass:math';/, '').replace(/@function double\(\$val\) \{[\s\S]*?\}/, '').replace('double($size)', '20px').replace('$size: 10px;', '');
    window.document.head.appendChild(style);
    const element = window.document.querySelector('[data-testid="element"]');
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.width !== '20px') {
      console.log('✘ SASS function not applied');
      allPassed = false;
    } else {
      console.log('✔ SASS function applied');
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
  ;
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
      
      ;
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ Tests failed. Attempt #${attempts} recorded.`);
    ;
  }
})();