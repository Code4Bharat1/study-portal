
// nodejs/intermediate/3/tests.js
"use client";

console.log("🧪 Testing: Authentication and Security");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+jwt\s*=\s*require\s*\(\s*['"]jsonwebtoken['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports jsonwebtoken module");
            score += 50;
        } else {
            checks.push("❌ Missing jsonwebtoken import");
        }

        if (/jwt\.sign\s*\(/i.test(userCode)) {
            checks.push("✅ Uses jwt.sign for token creation");
            score += 50;
        } else {
            checks.push("❌ Missing jwt.sign usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include jsonwebtoken and jwt.sign`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Authentication and Security", language: "javascript" }
    };
}

console.log("✅ Test ready for: Authentication and Security");