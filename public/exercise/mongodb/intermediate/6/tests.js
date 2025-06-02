const fs = require('fs');
const path = require('path');
const { Db } = require('tingodb')();

const DB_PATH = path.join(__dirname, 'data');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_intermediate_6.txt');

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

  await clearCollection(db, 'logs');

  const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');

  try {
    const runUserCode = new Function('db', code);
    await runUserCode(db);

    // Wait for async index creation
    await new Promise(res => setTimeout(res, 200));

    const logs = db.collection('logs');

    // Check indexes exist, look for index on "timestamp" field
    const indexes = await new Promise((resolve, reject) => {
      logs.indexInformation((err, info) => {
        if (err) reject(err);
        else resolve(info);
      });
    });

    const indexKeys = Object.keys(indexes);
    const hasTimestampIndex = indexKeys.some(key => key.includes('timestamp'));

    if (!hasTimestampIndex)
      throw new Error("No index found on 'timestamp' field.");

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
