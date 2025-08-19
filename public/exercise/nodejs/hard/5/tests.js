// nodejs/hard/5/tests.js
"use client";

console.log("🧪 Testing: Production Deployment");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/process\.env\.NODE_ENV\s*===?\s*['"]production['"]/i.test(userCode)) {
            checks.push("✅ Checks NODE_ENV for production");
            score += 50;
        } else {
            checks.push("❌ Missing NODE_ENV check");
        }

        if (/app\.listen\s*\(\s*process\.env\.PORT/i.test(userCode)) {
            checks.push("✅ Uses process.env.PORT for server");
            score += 50;
        } else {
            checks.push("❌ Missing process.env.PORT usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include NODE_ENV and PORT for deployment`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Production Deployment", language: "javascript" }
    };
}

console.log("✅ Test ready for: Production Deployment");