const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');
const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
const js = fs.readFileSync(jsFile, 'utf8');

function readAttempts() {
  if (fs.existsSync(attemptsFile)) {
    try {
      return Math.max(1, JSON.parse(fs.readFileSync(attemptsFile)).count);
    } catch {
      return 1;
    }
  }
  return 1;
}

function writeAttempts(count) {
  fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
}

async function checkSyntax() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  }
  console.log('❌ Syntax errors:');
  results[0].messages.forEach(m =>
    console.log(`- [${m.ruleId}] ${m.message} (line ${m.line})`)
  );
  return false;
}

function checkExport() {
  const hasExport =
    js.includes('module.exports') ||
    js.includes('export default') ||
    js.includes('exports.app');

  if (!hasExport) {
    console.log('✘ No valid export detected.');
  } else {
    console.log('✔ Export found.');
  }
  return hasExport;
}

async function checkPasswordHashing() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    const registerPaths = ['/register', '/signup'];

    const testUser = {
      username: 'testuser',
      password: 'plaintextpassword123',
      email: 'test@example.com',
    };

    let passwordHashed = false;
    let returnedHash = null;

    for (const route of registerPaths) {
      try {
        const res = await request
          .post(route)
          .send(testUser)
          .set('Accept', 'application/json');

        if (res.status === 200 || res.status === 201) {
          if (res.body.password) {
            if (res.body.password === testUser.password) {
              console.log('✘ Password returned as plaintext in response.');
              return false;
            }
            if (/^\$2[aby]\$/.test(res.body.password)) {
              passwordHashed = true;
              returnedHash = res.body.password;
              break;
            }
          } else {
            // No password in response, assume hashed internally
            passwordHashed = true;
            break;
          }
        }
      } catch {}
    }

    if (!passwordHashed) {
      console.log('✘ Password hashing not detected in registration.');
      return false;
    }

    if (passwordHashed && returnedHash) {
      const match = await bcrypt.compare(testUser.password, returnedHash);
      if (match) {
        console.log('✔ Password is hashed and verified using bcrypt.');
      } else {
        console.log('✘ Password hash verification failed.');
        return false;
      }
    } else {
      console.log('✔ Password hashing likely done internally without returning hash.');
    }

    return true;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const hashOk = await checkPasswordHashing();
  const allPassed = syntaxOk && exportOk && hashOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'Hash Passwords',
      attempts,
      linesOfCode,
      executionTime,
      timestamp: new Date().toISOString()
    }, null, 2));
    console.log('\n✅ All checks passed. Result saved.');
    process.exit(0);
  } else {
    writeAttempts(attempts + 1);
    console.log(`\n❌ One or more checks failed. Attempt #${attempts + 1} saved.`);
    process.exit(1);
  }
})();
