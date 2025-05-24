// Page 3 
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
    let colors = 0;
    let backgrounds = 0;
    root.walkDecls(decl => {
      if (decl.prop === 'color') colors++;
      if (decl.prop === 'background-color') backgrounds++;
    });
    if (colors === 0) {
      console.log('✘ No color properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${colors} color(s)`);
    }
    if (backgrounds === 0) {
      console.log('✘ No background-color properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${backgrounds} background-color(s)`);
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
      <div class="element" data-testid="element">Test</div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const element = window.document.querySelector('[data-testid="element"]');
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.color !== 'rgb(255, 0, 0)') {
      console.log('✘ Color not applied');
      allPassed = false;
    } else {
      console.log('✔ Color applied');
    }
    if (computedStyle.backgroundColor !== 'rgb(0, 0, 255)') {
      console.log('✘ Background-color not applied');
      allPassed = false;
    } else {
      console.log('✔ Background-color applied');
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
      fs.writeFileSync('result.txt', JSON.stringify(resultData, null, 2));
      console.log(`\n✅ All tests passed. Results saved to result.txt.`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write result.txt: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ Tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();