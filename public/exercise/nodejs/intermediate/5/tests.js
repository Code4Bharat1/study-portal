// nodejs/intermediate/5/tests.js
"use client";

console.log("🧪 Testing: Testing Node.js Applications");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+(jest|mocha)\s*=\s*require\s*\(\s*['"](jest|mocha)['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports Jest or Mocha for testing");
            score += 50;
        } else {
            checks.push("❌ Missing Jest or Mocha import");
        }

        if (/(describe|it)\s*\(\s*['"].+['"],\s*function\s*\(/i.test(userCode)) {
            checks.push("✅ Uses describe or it for test cases");
            score += 50;
        } else {
            checks.push("❌ Missing describe or it for test cases");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include Jest/Mocha and test cases`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Testing Node.js Applications", language: "javascript" }
    };
}

console.log("✅ Test ready for: Testing Node.js Applications");

