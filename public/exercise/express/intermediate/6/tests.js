const { ESLint } = require('eslint');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');
const jsFile = path.join(process.cwd(), 'index.js'); // Adjust if needed
const js = fs.readFileSync(jsFile, 'utf8');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Adjust as needed

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

async function checkJWTRoute() {
  try {
    const mod = require(jsFile);
    const app = mod.app || mod.default || mod;

    if (!app) {
      console.log('✘ No app export found.');
      return false;
    }

    const request = supertest(app);

    const loginPaths = ['/login', '/auth/login', '/auth'];
    let token;

    for (const route of loginPaths) {
      try {
        const res = await request
          .post(route)
          .send({ username: 'testuser', password: 'testpass' })
          .set('Accept', 'application/json');

        if (res.status === 200 && res.body.token) {
          token = res.body.token;
          break;
        }
      } catch {}
    }

    if (!token) {
      console.log('✘ No JWT token returned from login routes.');
      return false;
    }

    try {
      jwt.verify(token, JWT_SECRET);
      console.log('✔ JWT token is valid and verified.');
    } catch (e) {
      console.log('✘ JWT token verification failed:', e.message);
      return false;
    }

    const protectedPaths = ['/protected', '/profile', '/user/profile'];

    for (const route of protectedPaths) {
      try {
        const res = await request
          .get(route)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json');

        if (res.status === 200) {
          console.log(`✔ Protected route '${route}' accessible with JWT.`);
          return true;
        }
      } catch {}
    }

    console.log('✘ No protected route accessible with JWT token.');
    return false;
  } catch (err) {
    console.log('✘ Error during supertest request:', err.message);
    return false;
  }
}

(async () => {
  const start = process.hrtime();
  const syntaxOk = await checkSyntax();
  const exportOk = checkExport();
  const jwtOk = await checkJWTRoute();
  const allPassed = syntaxOk && exportOk && jwtOk;

  const [sec, nano] = process.hrtime(start);
  const executionTime = +(sec + nano / 1e9).toFixed(3);
  const linesOfCode = js.split('\n').filter(Boolean).length;
  const attempts = readAttempts();

  if (allPassed) {
    fs.writeFileSync(resultFile, JSON.stringify({
      task: 'JWT Auth',
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
