// nodejs/intermediate/9/tests.js
"use client";

console.log("🧪 Testing: Caching Strategies");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+redis\s*=\s*require\s*\(\s*['"]redis['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports redis module");
            score += 50;
        } else {
            checks.push("❌ Missing redis import");
        }

        if (/redis\.createClient\s*\(/i.test(userCode)) {
            checks.push("✅ Creates Redis client");
            score += 50;
        } else {
            checks.push("❌ Missing Redis client creation");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include redis and client creation`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Caching Strategies", language: "javascript" }
    };
}

console.log("✅ Test ready for: Caching Strategies");
