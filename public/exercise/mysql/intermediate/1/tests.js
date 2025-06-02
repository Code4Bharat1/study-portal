const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'data', 'intermediate1.db');
const USER_SCRIPT_PATH = path.join(__dirname, 'script.js');
const ATTEMPT_FILE = path.join(__dirname'attempts.tests';
const PASS_FILE = path.join(__dirname, 'passed_intermediate_1.txt');

// Expected result after GROUP BY operation
const expectedResult = [
  { region: 'North', total: 300 },
  { region: 'South', total: 150 },
  { region: 'East', total: 200 },
  { region: 'West', total: 250 },
];

function loadAttempts() {
  if (fs.existsSync(ATTEMPT_FILE)) {
    return JSON.parse(fs.readFileSync(ATTEMPT_FILE, 'utf8'));
  }
  return { attempts: 0, start: Date.now() };
}

function saveAttempts(data) {
  fs.writeFileSync(ATTEMPT_FILE, JSON.stringify(data));
}

function deleteDatabase() {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }
}

function runUserScript(db) {
  return new Promise((resolve, reject) => {
    const code = fs.readFileSync(USER_SCRIPT_PATH, 'utf8');
    try {
      const run = new Function('db', code);
      run(db);
      // Wait briefly to ensure all operations complete
      setTimeout(resolve, 100);
    } catch (err) {
      reject(err);
    }
  });
}

function validateGroupByResult(db) {
  return new Promise((resolve, reject) => {
    const query = `SELECT region, SUM(amount) as total FROM sales GROUP BY region ORDER BY region;`;
    db.all(query, [], (err, rows) => {
      if (err) {
        return reject(new Error("Error executing GROUP BY query on 'sales' table."));
      }
      // Compare the result with expectedResult
      if (rows.length !== expectedResult.length) {
        return reject(new Error("Mismatch in number of regions returned."));
      }
      for (let i = 0; i < rows.length; i++) {
        if (
          rows[i].region !== expectedResult[i].region ||
          rows[i].total !== expectedResult[i].total
        ) {
          return reject(
            new Error(
              `Data mismatch at row ${i + 1}: Expected (${expectedResult[i].region}, ${expectedResult[i].total}), Got (${rows[i].region}, ${rows[i].total})`
            )
          );
        }
      }
      resolve();
    });
  });
}

async function runTest() {
  const state = loadAttempts();
  if (!state.start) state.start = Date.now();

  // Ensure a clean database state
  deleteDatabase();

  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, async (err) => {
    if (err) {
      console.error("❌ Failed to create or open the database:", err.message);
      return;
    }

    try {
      await runUserScript(db);
      await validateGroupByResult(db);

      fs.writeFileSync(
        PASS_FILE,
        `Passed after ${state.attempts} failed attempt(s) in ${Math.round(
          (Date.now() - state.start) / 1000
        )} seconds.`
      );
      console.log("🎉 Test passed! Success file created.");

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
  });
}

runTest();
