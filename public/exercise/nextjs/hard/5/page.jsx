// Page 5 
const fs = require('fs');
const { ESLint } = require('eslint');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');

const code = fs.readFileSync('script.js', 'utf-8');

function readAttempts() {
  if (fs.existsSync('attempts.json')) {
    try {
      const data = JSON.parse(fs.readFileSync('attempts.json', 'utf-8'));
      return data.count >= 1 ? data.count : 1;
    } catch (e) {
      console.log('Error parsing attempts.json. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  try {
    fs.writeFileSync('attempts.json', JSON.stringify({ count }, null, 2), 'utf-8');
  } catch (e) {
    console.log(`Failed to write to attempts.json: ${e}`);
  }
}

async function syntaxVerify() {
  const eslint = new ESLint({
    overrideConfig: {
      env: { browser: true, es2021: true },
      parserOptions: { ecmaVersion: 12, sourceType: 'module', ecmaFeatures: { jsx: true } },
      plugins: ['react'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'warn',
      },
    },
  });

  try {
    const [result] = await eslint.lintText(code);
    const errors = result.messages.filter((msg) => msg.severity === 2);
    if (errors.length === 0) {
      console.log('✔ JavaScript/JSX syntax is valid.');
      return true;
    } else {
      console.log('❌ JavaScript/JSX syntax is not valid:');
      errors.forEach((err) => console.log(`  ${err.message} (line ${err.line})`));
      return false;
    }
  } catch (e) {
    console.log(`✘ ESLint failed: ${e}`);
    return false;
  }
}

function codeVerify() {
  let allPassed = true;
  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let revalidateExports = 0;

    traverse(ast, {
      ExportNamedDeclaration(path) {
        if (path.node.declaration && path.node.declaration.declarations) {
          path.node.declaration.declarations.forEach((decl) => {
            if (decl.id && decl.id.name === 'revalidate') {
              revalidateExports++;
            }
          });
        }
      },
    });

    if (revalidateExports === 0) {
      console.log('✘ No revalidate export found');
      allPassed = false;
    } else {
      console.log(`✔ Found ${revalidateExports} revalidate export(s)`);
    }

    return allPassed;
  } catch (e) {
    console.log(`✘ Failed to parse JavaScript/JSX code: ${e}`);
    return false;
  }
}

async function functionalVerify() {
  let allPassed = true;
  try {
    const module = await import('./script.js');
    const Component = module.default;
    const revalidate = module.revalidate;

    render(<Component />);
    const data = screen.getByTestId('data');
    if (data.textContent !== 'Cached Data') {
      console.log('✘ Cached data is not rendered');
      allPassed = false;
    } else {
      console.log('✔ Cached data is rendered');
    }

    if (!revalidate || revalidate < 1) {
      console.log('✘ Revalidate is not set or invalid');
      allPassed = false;
    } else {
      console.log('✔ Revalidate is set correctly');
    }

    if (allPassed) {
      console.log('\n🎉 Success! Caching behavior is correct.');
    } else {
      console.log('\n❗ Caching behavior check failed. Please review your Next.js code.');
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
  const structurePassed = codeVerify();
  const functionalPassed = await functionalVerify();
  const allPassed = syntaxPassed && structurePassed && functionalPassed;

  const executionTime = Number((performance.now() - startTime) / 1000).toFixed(3);
  const linesOfCode = code.split('\n').filter((line) => line.trim()).length;

  let attempts = readAttempts();
  if (allPassed) {
    const resultData = {
      attempts,
      linesOfCode,
      executionTime,
      syntaxCheckPassed: syntaxPassed,
      structureCheckPassed: structurePassed,
      functionalCheckPassed: functionalPassed,
      timestamp: new Date().toISOString(),
    };
    try {
      fs.writeFileSync('result.txt', JSON.stringify(resultData, null, 2), 'utf-8');
      console.log(`\n✅ All tests passed. Results saved to result.txt.`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed to write to result.txt: ${e}`);
      process.exit(1);
    }
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(`\n❌ One or more tests failed. Attempt #${attempts} recorded.`);
    process.exit(1);
  }
})();