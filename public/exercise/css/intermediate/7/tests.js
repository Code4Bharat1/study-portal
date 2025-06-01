// Page 7 
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
    let variables = 0;
    root.walkDecls(decl => {
      if (decl.prop.startsWith('$')) variables++;
    });
    if (variables === 0) {
      console.log('✘ No SASS variables found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${variables} SASS variable(s)`);
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
      <div class="container" data-testid="container">
        <div class="item" data-testid="item">Test</div>
      </div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css.replace('$primary: #007bff;', '').replace('$primary', '#007bff');
    window.document.head.appendChild(style);
    const item = window.document.querySelector('[data-testid="item"]');
    const computedStyle = window.getComputedStyle(item);
    if (computedStyle.color !== 'rgb(255, 255, 255)') {
      console.log('✘ SASS nesting not applied');
      allPassed = false;
    } else {
      console.log('✔ SASS nesting applied');
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