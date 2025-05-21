// Page 4 
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
    let fontFamilies = 0;
    let fontSizes = 0;
    let fontWeights = 0;
    root.walkDecls(decl => {
      if (decl.prop === 'font-family') fontFamilies++;
      if (decl.prop === 'font-size') fontSizes++;
      if (decl.prop === 'font-weight') fontWeights++;
    });
    if (fontFamilies === 0) {
      console.log('✘ No font-family properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${fontFamilies} font-family(ies)`);
    }
    if (fontSizes === 0) {
      console.log('✘ No font-size properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${fontSizes} font-size(s)`);
    }
    if (fontWeights === 0) {
      console.log('✘ No font-weight properties found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${fontWeights} font-weight(s)`);
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
      <div class="text" data-testid="text">Test</div>
    `);
    const { window } = dom;
    const style = window.document.createElement('style');
    style.textContent = css;
    window.document.head.appendChild(style);
    const text = window.document.querySelector('[data-testid="text"]');
    const computedStyle = window.getComputedStyle(text);
    if (!computedStyle.fontFamily.includes('Arial')) {
      console.log('✘ Font-family not applied');
      allPassed = false;
    } else {
      console.log('✔ Font-family applied');
    }
    if (computedStyle.fontSize !== '16px') {
      console.log('✘ Font-size not applied');
      allPassed = false;
    } else {
      console.log('✔ Font-size applied');
    }
    if (computedStyle.fontWeight !== '700') {
      console.log('✘ Font-weight not applied');
      allPassed = false;
    } else {
      console.log('✔ Font-weight applied');
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