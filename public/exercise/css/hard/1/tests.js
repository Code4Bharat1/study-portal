// Page 1 
console.clear();
console.clear();
const fs = require('fs');
const stylelint = require('stylelint');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');

const css = fs.readFileSync('style.css', 'utf-8');

function read
  try {
    return fs.existsSync(') ? JSON.parse(fs.readFileSync('s.json't || 1 : 1;
  } catch {
    return 1;
  }
}

function write) {
  try {
    fs.writeFileSync(', JSON.stringify({ count }, null, 2));
  } catch (e) {
    console.log(`Failed to write  ${e}`);
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
    let subgrids = 0;
    root.walkDecls('grid-template-columns', decl => {
      if (decl.value.includes('subgrid')) subgrids++;
    });
    if (subgrids === 0) {
      console.log('✘ No subgrid found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${subgrids} subgrid(s)`);
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
      <div class="grid-container">
        <div class="grid-item" data-testid="subgrid">
          <div>Subitem</div>
        </div>
      </div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const subgrid = window.document.querySelector('[data-testid="subgrid"]');
    const computedStyle = window.getComputedStyle(subgrid);
    if (computedStyle.display !== 'grid') {
      console.log('✘ Subgrid layout not applied');
      allPassed = false;
    } else {
      console.log('✔ Subgrid layout applied');
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

  let ds();
  if (allPassed) {
    const resultData = { sOfCode, executionTime,  timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync('results.tests', JSON.stringify(resultData, null, 2));
      
      process.exit(0);
    } catch (e) {
      
      ;
    }
  } else {
    
    write
    console.log(`\n❌ Tests failed. reco;
    ;
  }
})();