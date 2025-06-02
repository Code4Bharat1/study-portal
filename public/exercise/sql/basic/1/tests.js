// tests.test

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, 'data', 'database.sqlite');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_basic_1.txt');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) {
    return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  }
  return { attempts: 0, start: Date.now() };
}

function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}

function clearTable(db, tableName) {
  return new Promise((resolve) => {
    db.run(`DROP TABLE IF EXISTS ${tableName}`, resolve);
  });
}

function tableExists(db, tableName) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
      [tableName],
      (err, row) => {
        if (err) return reject(err);
        resolve(!!row);
      }
    );
  });
}

async function runTest() {
  const state = loadAttempts();
  if (!state.start) state.start = Date.now();

  const db = new sqlite3.Database(DB_FILE);

  try {
    await clearTable(db, 'users');

    const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');
    const runUserCode = new Function('db', code);
    runUserCode(db);

    // Wait for lazy execution
    await new Promise((res) => setTimeout(res, 100));

    const exists = await tableExists(db, 'users');
    if (!exists) throw new Error("Table 'users' was not created.");

    fs.writeFileSync(
      PASS_FILE,
      `Passed after ${state.attempts} failed attempt(s) in ${Math.round(
        (Date.now() - state.start) / 1000
      )} seconds.`
    );
    console.log('🎉 Test passed! File created.');

    state.attempts = 0;
    state.start = null;
    saveAttempts(state);
  } catch (err) {
    state.attempts++;
    saveAttempts(state);
    console.error(`❌ Test failed: ${err.message}`);
    console.log(`Attempts so far: ${state.attempts}`);
  } finally {
    db.close();
  }
}

runTest();
