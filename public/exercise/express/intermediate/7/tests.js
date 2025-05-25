const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
const js = fs.readFileSync(jsFile, 'utf8');

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

    // We expect a POST /register or /signup endpoint that accepts user data with password
    // and stores hashed password internally.
    const registerPaths = ['/register', '/signup'];

    let passwordHashed = false;

    // We send a test user with known password
    const testUser = {
      username: 'testuser',
      password: 'plaintextpassword123',
      email: 'test@example.com',
    };

    for (const route of registerPaths) {
      try {
        const res = await request
          .post(route)
          .send(testUser)
          .set('Accept', 'application/json');

        if (res.status === 200 || res.status === 201) {
          // Assuming the response includes user object but NOT plaintext password
          if (res.body.password) {
            // If password is returned as plaintext, fail test
            if (res.body.password === testUser.password) {
              console.log('✘ Password returned as plaintext in response.');
              return false;
            }

            // If bcrypt hash format matches $2[aby]$...
            if (/^\$2[aby]\$/.test(res.body.password)) {
              passwordHashed = true;
              break;
            }
          } else {
            // If no password returned, assume stored hashed internally - good
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

    // Additionally, check if bcrypt.compare can verify the hash returned (if any)
    if (passwordHashed && res?.body?.password) {
      const match = await bcrypt.compare(testUser.password, res.body.password);
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
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const hashOk = await checkPasswordHashing();

  if (syntaxOk && exportOk && hashOk) {
    console.log('\n✅ All checks passed for "Hash Passwords".');
    process.exit(0);
  } else {
    console.log('\n❌ One or more checks failed for "Hash Passwords".');
    process.exit(1);
  }
})();
