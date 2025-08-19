// nodejs/hard/1/tests.js
"use client";

console.log("🧪 Testing: Microservices Architecture");

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
            checks.push("✅ Imports express for microservice");
            score += 50;
        } else {
            checks.push("❌ Missing express import");
        }

        if (/app\.listen\s*\(\s*\d+,\s*function\s*\(/i.test(userCode)) {
            checks.push("✅ Sets up microservice server with app.listen");
            score += 50;
        } else {
            checks.push("❌ Missing app.listen for microservice");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include express and app.listen for microservice`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Microservices Architecture", language: "javascript" }
    };
}

console.log("✅ Test ready for: Microservices Architecture");
