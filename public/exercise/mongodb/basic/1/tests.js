console.clear();

const fs = require('fs');
const path = require('path');
const { Db } = require('tingodb')();

const DB_PATH = path.join(__dirname, 'data');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname, 'attempt_basic_1.json');
const PASS_FILE = path.join(__dirname, 'passed_basic_1.txt');
const USERS_COLLECTION_FILE = path.join(DB_PATH, 'users');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) {
    return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  }
  return { attempts: 0, start: Date.now() };
}

function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}

function resetCollectionFile() {
  if (fs.existsSync(USERS_COLLECTION_FILE)) {
    fs.unlinkSync(USERS_COLLECTION_FILE);
  }
}

async function runTest() {
  const state = loadAttempts();
  if (!state.start) state.start = Date.now();

  // Ensure clean database state
  resetCollectionFile();
  const db = new Db(DB_PATH, {});

  // Load user code
  const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');

  try {
    // Run user code
    const runUserCode = new Function('db', code);
    runUserCode(db);

    // Give some time for file system operation (TingoDB is lazy)
    await new Promise(res => setTimeout(res, 100));

    // Check if the collection file exists (i.e., user called db.collection('users'))
    if (!fs.existsSync(USERS_COLLECTION_FILE)) {
      throw new Error("Collection 'users' not initialized. Did you use db.collection('users')?");
    }

    // Passed test
    const totalTime = Math.round((Date.now() - state.start) / 1000);
    fs.writeFileSync(PASS_FILE, `Passed after ${state.attempts} failed attempt(s) in ${totalTime} seconds.`);
    console.log("🎉 Test passed! 'passed_basic_1.txt' created.");

    // Reset attempts
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
