const fs = require('fs');
const path = require('path');
const { Db } = require('tingodb')();

const DB_PATH = path.join(__dirname, 'data');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname, 'attempt_advanced_10.json');
const PASS_FILE = path.join(__dirname, 'passed_advanced_10.txt');

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

  await clearCollection(db, 'advanced');

  const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');

  try {
    const runUserCode = new Function('db', code);
    runUserCode(db);

    await new Promise(res => setTimeout(res, 100));

    const coll = db.collection('advanced');

    // Simulate performance tuning by checking if user inserted document with 'performance' field set true

    const doc = await new Promise((resolve, reject) => {
      coll.findOne({ performance: true }, (err, d) => {
        if (err) reject(new Error("Error querying 'advanced' collection."));
        else resolve(d);
      });
    });

    if (!doc) throw new Error("No document with {performance:true} found. Performance tuning expected.");

    fs.writeFileSync(PASS_FILE, `Passed after ${state.attempts} failed attempt(s) in ${Math.round((Date.now() - state.start)/1000)} seconds.`);
    console.log("🎉 Test passed! File created.");

    state.attempts = 0;
    state.start = null;
    saveAttempts(state);

  } catch(err) {
    state.attempts++;
    saveAttempts(state);
    console.error(`❌ Test failed: ${err.message}`);
    console.log(`Attempts so far: ${state.attempts}`);
  }
}

runTest();
