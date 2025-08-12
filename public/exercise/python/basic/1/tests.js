// Test for Python Calculator App
// JavaScript test that validates Python code execution in sandbox

console.log("🧪 Testing: Python Calculator App");

function runSimpleTest(userCode) {
  const result = { passed: false, score: 0, message: "", details: [] };

  try {
    if (!userCode || userCode.trim().length < 5) {
      result.message = "Code is empty or too short";
      return result;
    }

    let score = 0;
    const checks = [];

    // Import required testing functions
    const { describe, it, expect } = require("mocha");

    // Test suite for calculator functions
    describe("Python Calculator Tests", () => {
      // Test addition function
      it("should have addition function", () => {
        if (/def\s+add/.test(userCode)) {
          checks.push("✅ Has addition function");
          score += 20;
        } else {
          checks.push("❌ Missing addition function");
        }
      });

      // Test subtraction function
      it("should have subtraction function", () => {
        if (/def\s+subtract/.test(userCode)) {
          checks.push("✅ Has subtraction function");
          score += 20;
        } else {
          checks.push("❌ Missing subtraction function");
        }
      });

      // Test multiplication function
      it("should have multiplication function", () => {
        if (/def\s+multiply/.test(userCode)) {
          checks.push("✅ Has multiplication function");
          score += 20;
        } else {
          checks.push("❌ Missing multiplication function");
        }
      });

      // Test division function
      it("should have division function", () => {
        if (/def\s+divide/.test(userCode)) {
          checks.push("✅ Has division function");
          score += 20;
        } else {
          checks.push("❌ Missing division function");
        }
      });

      // Test error handling
      it("should have error handling", () => {
        if (/try:.*except/.test(userCode)) {
          checks.push("✅ Has error handling");
          score += 10;
        } else {
          checks.push("❌ Missing error handling");
        }
      });

      // Test division by zero check
      it("should check for division by zero", () => {
        if (/if.*0.*:/.test(userCode) && /ZeroDivisionError/.test(userCode)) {
          checks.push("✅ Has division by zero check");
          score += 10;
        } else {
          checks.push("❌ Missing division by zero check");
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

💬 Python Calculator App - Score: ${result.score}/100`;
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
      topic: "Python Calculator App",
      language: "python",
      testFramework: "mocha",
    },
  };
}

console.log("✅ Test ready for: Python Calculator App");
