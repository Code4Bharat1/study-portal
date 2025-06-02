const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'data', 'test.db');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_intermediate_4.txt');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) {
    return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  }
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

    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM employees ORDER BY department ASC, salary DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    if (!rows.length) {
      throw new Error("No data found in employees table.");
    }

    for (let i = 1; i < rows.length; i++) {
      const prev = rows[i - 1];
      const curr = rows[i];
      if (prev.department > curr.department) {
        throw new Error("Rows are not ordered by department ascending.");
      }
      if (prev.department === curr.department && prev.salary < curr.salary) {
        throw new Error("Rows are not ordered by salary descending within department.");
      }
    }

    fs.writeFileSync(PASS_FILE, `Passed after ${state.attempts} failed attempt(s) in ${(Date.now() - state.start) / 1000}s.`);
    console.log("🎉 Test passed!");
    state.attempts = 0;
    state.start = null;
    saveAttempts(state);

  } catch (err) {
    state.attempts++;
    saveAttempts(state);
    console.error("❌ Test failed:", err.message);
    console.log(`Attempts: ${state.attempts}`);
  } finally {
    db.close();
  }
}

runTest();
