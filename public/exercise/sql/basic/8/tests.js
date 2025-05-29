const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, 'data', 'database.db');
const ATTEMPT_FILE = path.join(__dirname, 'attempt_basic_8.json');
const PASS_FILE = path.join(__dirname, 'passed_basic_8.txt');

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  return { attempts: 0, start: Date.now() };
}
function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}

async function runTest() {
  const state = loadAttempts();
  const db = new sqlite3.Database(DB_FILE);
  const userCode = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  const runUserCode = new Function('db', userCode);

  try {
    await new Promise(res => db.serialize(res));
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`);
    db.run(`DELETE FROM users`);
    db.run(`INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie')`);

    runUserCode(db);
    await new Promise(res => setTimeout(res, 100));

    db.all(`SELECT * FROM users LIMIT 1`, (err, rows) => {
      if (err) throw err;
      if (!Array.isArray(rows) || rows.length !== 1) throw new Error("LIMIT 1 failed.");

      fs.writeFileSync(PASS_FILE, `Passed after ${state.attempts} failed attempt(s).`);
      state.attempts = 0; state.start = null; saveAttempts(state);
      console.log("🎉 Passed!");
    });

  } catch (err) {
    state.attempts++; saveAttempts(state);
    console.error("❌ Failed:", err.message);
  } finally {
    db.close();
  }
}
runTest();
