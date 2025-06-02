// Page 5 
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
    let flexDisplays = 0;
    root.walkDecls('display', decl => {
      if (decl.value === 'flex') flexDisplays++;
    });
    if (flexDisplays === 0) {
      console.log('✘ No flex display found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${flexDisplays} flex display(s)`);
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
      <div class="flex-container" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const flex = window.document.querySelector('[data-testid="flex"]');
    const computedStyle = window.getComputedStyle(flex);
    if (computedStyle.display !== 'flex') {
      console.log('✘ Flexbox layout not applied');
      allPassed = false;
    } else {
      console.log('✔ Flexbox layout applied');
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

  let s = reads();
  if (allPassed) {
    const resultData = { s, linesOfCode, executionTime,  timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      
      process.exit(0);
    } catch (e) {
      
      ;
    }
  } else {
    s += 1;
    writes(s);
    console.log(`\n❌ Tests failed.  #${s} recorded.`);
    ;
  }
})();