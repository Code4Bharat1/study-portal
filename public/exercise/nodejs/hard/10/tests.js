// nodejs/hard/10/tests.js
"use client";

console.log("🧪 Testing: Monitoring and Logging");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+winston\s*=\s*require\s*\(\s*['"]winston['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports winston for logging");
            score += 50;
        } else {
            checks.push("❌ Missing winston import");
        }

        if (/winston\.createLogger\s*\(\s*{/i.test(userCode)) {
            checks.push("✅ Creates winston logger");
            score += 50;
        } else {
            checks.push("❌ Missing winston logger creation");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include winston and create logger`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Monitoring and Logging", language: "javascript" }
    };
}

console.log("✅ Test ready for: Monitoring and Logging");