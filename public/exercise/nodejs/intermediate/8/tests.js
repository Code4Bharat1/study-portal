// nodejs/intermediate/8/tests.js
"use client";

console.log("🧪 Testing: File Upload Handling");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+multer\s*=\s*require\s*\(\s*['"]multer['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports multer module");
            score += 50;
        } else {
            checks.push("❌ Missing multer import");
        }

        if (/multer\s*\(\s*{.*}\s*\)/i.test(userCode)) {
            checks.push("✅ Configures multer for file uploads");
            score += 50;
        } else {
            checks.push("❌ Missing multer configuration");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include multer and its configuration`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "File Upload Handling", language: "javascript" }
    };
}

console.log("✅ Test ready for: File Upload Handling");