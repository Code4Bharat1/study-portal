const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, 'data', 'database.db');
const ATTEMPT_FILE = path.join(__dirname, 'attempt_basic_5.json');
const PASS_FILE = path.join(__dirname, 'passed_basic_5.txt');

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
  const code = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
  const runUserCode = new Function('db', code);

  try {
    await new Promise(res => db.serialize(res));
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`);
    db.run(`DELETE FROM users`);
    db.run(`INSERT INTO users (id, name) VALUES (1, 'Alice')`);

    runUserCode(db);
    await new Promise(res => setTimeout(res, 100));

    db.get(`SELECT name FROM users WHERE id = 1`, (err, row) => {
      if (err) throw err;
      if (!row || row.name === 'Alice') throw new Error("Update failed");
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
