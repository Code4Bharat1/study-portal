// Checks if a view called 'employee_summary' exists
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'data', 'database.sqlite');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_intermediate_3.txt');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  return { attempts: 0, start: Date.now() };
}
function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}
async function runTest() {
  const state = loadAttempts();
  if (!state.start) state.start = Date.now();
  const db = new sqlite3.Database(DB_PATH);
  const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');
  try {
    const runUserCode = new Function('db', code);
    runUserCode(db);
    await new Promise(res => setTimeout(res, 100));
    db.all(`SELECT name FROM sqlite_master WHERE type='view' AND name='employee_summary';`, [], (err, rows) => {
      if (err || !rows.length) throw new Error("View 'employee_summary' not found.");
      fs.writeFileSync(PASS_FILE, `Passed after ${state.attempts} failed attempt(s).`);
      console.log("🎉 Test passed!");
      state.attempts = 0;
      state.start = null;
      saveAttempts(state);
      db.close();
    });
  } catch (err) {
    state.attempts++;
    saveAttempts(state);
    console.error(`❌ ${err.message}`);
    console.log(`Attempts: ${state.attempts}`);
    db.close();
  }
}
runTest();
