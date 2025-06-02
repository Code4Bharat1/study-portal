// Page 10 
console.clear();
console.clear();
const fs = require('fs');
const stylelint = require('stylelint');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');

const css = fs.readFileSync('style.css', 'utf-8');

function reads() {
  try {
    return fs.existsSync('s.json') ? JSON.parse(fs.readFileSync('s.json')).count || 1 : 1;
  } catch {
    return 1;
  }
}

function writes(count) {
  try {
    fs.writeFileSync('s.json', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write s.json: ${e}`);
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
    let customProperties = 0;
    root.walkDecls(decl => {
      if (decl.prop.startsWith('--')) customProperties++;
      if (decl.value.includes('var(--')) customProperties++;
    });
    if (customProperties === 0) {
      console.log('✘ No custom properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${customProperties} custom property(ies)`);
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
    if (computedStyle.color !== 'rgb(0, 123, 255)') {
      console.log('✘ Custom property not applied');
      allPassed = false;
    } else {
      console.log('✔ Custom property applied');
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

  let s = reads();
  if (allPassed) {
    const resultData = { s, linesOfCode, executionTime,  timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      
      process.exit(0);
    } catch (e) {
      
      process.exit(1);
    }
  } else {
    s += 1;
    writes(s);
    console.log(`\n❌ Tests failed.  #${s} recorded.`);
    process.exit(1);
  }
})();