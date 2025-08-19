// nodejs/intermediate/7/tests.js
"use client";

console.log("🧪 Testing: API Documentation");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+swagger\s*=\s*require\s*\(\s*['"]swagger-ui-express['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports swagger-ui-express");
            score += 50;
        } else {
            checks.push("❌ Missing swagger-ui-express import");
        }

        if (/app\.use\s*\(\s*['"]\/api-docs['"],\s*swagger/i.test(userCode)) {
            checks.push("✅ Sets up Swagger API documentation route");
            score += 50;
        } else {
            checks.push("❌ Missing Swagger route setup");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include swagger-ui-express and API docs route`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "API Documentation", language: "javascript" }
    };
}

console.log("✅ Test ready for: API Documentation");