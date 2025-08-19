// nodejs/hard/6/tests.js
"use client";

console.log("🧪 Testing: Serverless Architecture");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/exports\.handler\s*=\s*async\s*function\s*\(\s*event,\s*context\s*\)/i.test(userCode)) {
            checks.push("✅ Defines serverless handler function");
            score += 50;
        } else {
            checks.push("❌ Missing serverless handler function");
        }

        if (/return\s*{.*statusCode:.*}/i.test(userCode)) {
            checks.push("✅ Returns serverless response with statusCode");
            score += 50;
        } else {
            checks.push("❌ Missing serverless response with statusCode");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include serverless handler and response`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Serverless Architecture", language: "javascript" }
    };
}

console.log("✅ Test ready for: Serverless Architecture");