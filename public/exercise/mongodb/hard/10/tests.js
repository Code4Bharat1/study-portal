const fs = require('fs');
const path = require('path');
const { Db } = require('tingodb')();

const DB_PATH = path.join(__dirname, 'data');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_hard_10.txt');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) {
    return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  }
  return { attempts: 0, start: Date.now() };
}

function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}

async function clearCollection(db, name) {
  return new Promise((resolve, reject) => {
    db.collection(name).remove({}, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function runTest() {
  const state = loadAttempts();
  if (!state.start) state.start = Date.now();

  const db = new Db(DB_PATH, {});

  await clearCollection(db, 'backup');

  const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');

  try {
    const runUserCode = new Function('db', code);
    await runUserCode(db);

    // Verify backup & restore - check collection 'backup' exists and has documents
    const backup = db.collection('backup');
    const count = await new Promise((res, rej) => {
      backup.count({}, (err, cnt) => {
        if (err) rej(err);
        else res(cnt);
      });
    });

    if (count === 0)
      throw new Error("Backup collection is empty or does not exist.");

    fs.writeFileSync(
      PASS_FILE,
      `Passed after ${state.attempts} failed attempt(s) in ${Math.round((Date.now() - state.start)/1000)} seconds.`
    );
    console.log("🎉 Test passed! File created.");

    state.attempts = 0;
    state.start = null;
    saveAttempts(state);

  } catch (err) {
    state.attempts++;
    saveAttempts(state);
    console.error(`❌ Test failed: ${err.message}`);
    console.log(`Attempts so far: ${state.attempts}`);
  }
}

runTest();
