
// nodejs/hard/4/tests.js
"use client";

console.log("🧪 Testing: Real-time Applications");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+io\s*=\s*require\s*\(\s*['"]socket\.io['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports socket.io module");
            score += 50;
        } else {
            checks.push("❌ Missing socket.io import");
        }

        if (/io\.on\s*\(\s*['"]connection['"],\s*function\s*\(/i.test(userCode)) {
            checks.push("✅ Sets up socket.io connection event");
            score += 50;
        } else {
            checks.push("❌ Missing socket.io connection event");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include socket.io and connection event`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Real-time Applications", language: "javascript" }
    };
}

console.log("✅ Test ready for: Real-time Applications");
