// Test for Python Conditional Statements
// JavaScript test that validates Python code execution in sandbox

console.log("🧪 Testing: Python Conditional Statements");

const mocha = require("mocha");
const { describe, it } = mocha;

function runSimpleTest(userCode) {
  const result = { passed: false, score: 0, message: "", details: [] };

  try {
    if (!userCode || userCode.trim().length < 5) {
      result.message = "Code is empty or too short";
      return result;
    }

    let score = 0;
    const checks = [];

    describe("Python Conditional Tests", () => {
      // Test if statement
      it("should have if statement", () => {
        if (/if\s+/.test(userCode)) {
          checks.push("✅ Has if statement");
          score += 30;
        } else {
          checks.push("❌ Missing if statement");
        }
      });

      // Test elif statement
      it("should have elif statement", () => {
        if (/elif\s+/.test(userCode)) {
          checks.push("✅ Has elif statement");
          score += 25;
        } else {
          checks.push("❌ Missing elif statement");
        }
      });

      // Test else statement
      it("should have else statement", () => {
        if (/else\s*:/.test(userCode)) {
          checks.push("✅ Has else statement");
          score += 25;
        } else {
          checks.push("❌ Missing else statement");
        }
      });

      // Test comparison operators
      it("should use comparison operators", () => {
        if (/[><=!]=?/.test(userCode)) {
          checks.push("✅ Uses comparison operators");
          score += 20;
        } else {
          checks.push("❌ Missing comparison operators (>, <, ==, !=, etc.)");
        }
      });
    });

    result.details = checks;
    result.score = Math.min(score, 100);
    result.passed = score >= 70;
    result.message = `📊 Python Test Results:
Score: ${result.score}/100
Passed: ${result.passed ? "✅ Yes" : "❌ No"}

📋 Details:
${checks.join("\n")}

💬 Python Conditional Statements - Score: ${result.score}/100`;
  } catch (error) {
    result.message = `📊 Python Test Results:
Score: 0/100
Passed: ❌ No

📋 Details:
  ❌ Test execution failed

💬 JavaScript test execution error: ${error.message}`;
  }

  return result;
}

// Export for Monaco Editor
if (typeof window !== "undefined") {
  window.exerciseTest = {
    runTests: runSimpleTest,
    testConfig: {
      topic: "Python Conditional Statements",
      language: "python",
      testFramework: "mocha",
    },
  };
}

console.log("✅ Test ready for: Python Conditional Statements");
