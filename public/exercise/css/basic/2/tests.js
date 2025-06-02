// Page 2 
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
    let margins = 0;
    let paddings = 0;
    let borders = 0;
    root.walkDecls(decl => {
      if (decl.prop === 'margin') margins++;
      if (decl.prop === 'padding') paddings++;
      if (decl.prop === 'border') borders++;
    });
    if (margins === 0) {
      console.log('✘ No margin properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${margins} margin(s)`);
    }
    if (paddings === 0) {
      console.log('✘ No padding properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${paddings} padding(s)`);
    }
    if (borders === 0) {
      console.log('✘ No border properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${borders} border(s)`);
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
      <div class="box" data-testid="box">Test</div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const box = window.document.querySelector('[data-testid="box"]');
    const computedStyle = window.getComputedStyle(box);
    if (computedStyle.margin !== '10px') {
      console.log('✘ Margin not applied');
      allPassed = false;
    } else {
      console.log('✔ Margin applied');
    }
    if (computedStyle.padding !== '20px') {
      console.log('✘ Padding not applied');
      allPassed = false;
    } else {
      console.log('✔ Padding applied');
    }
    if (!computedStyle.border.includes('1px solid')) {
      console.log('✘ Border not applied');
      allPassed = false;
    } else {
      console.log('✔ Border applied');
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