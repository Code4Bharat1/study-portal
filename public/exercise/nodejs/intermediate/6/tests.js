// nodejs/intermediate/6/tests.js
"use client";

console.log("🧪 Testing: Middleware Development");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+express\s*=\s*require\s*\(\s*['"]express['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports express module");
            score += 50;
        } else {
            checks.push("❌ Missing express module import");
        }

        if (/app\.use\s*\(\s*function\s*\(\s*req,\s*res,\s*next\s*\)/i.test(userCode)) {
            checks.push("✅ Defines custom middleware with req, res, next");
            score += 50;
        } else {
            checks.push("❌ Missing custom middleware definition");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include express and custom middleware`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Middleware Development", language: "javascript" }
    };
}

console.log("✅ Test ready for: Middleware Development");
