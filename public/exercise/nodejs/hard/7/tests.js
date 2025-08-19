
// nodejs/hard/7/tests.js
"use client";

console.log("🧪 Testing: Advanced Security Practices");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+(helmet|jsonwebtoken)\s*=\s*require\s*\(\s*['"](helmet|jsonwebtoken)['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports helmet or jsonwebtoken for security");
            score += 50;
        } else {
            checks.push("❌ Missing helmet or jsonwebtoken import");
        }

        if (/app\.use\s*\(\s*helmet\s*\(\s*\)\s*\)/i.test(userCode)) {
            checks.push("✅ Uses helmet middleware");
            score += 50;
        } else {
            checks.push("❌ Missing helmet middleware usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include helmet or jsonwebtoken and helmet middleware`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Advanced Security Practices", language: "javascript" }
    };
}

console.log("✅ Test ready for: Advanced Security Practices");