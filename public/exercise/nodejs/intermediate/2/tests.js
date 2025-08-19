// nodejs/intermediate/2/tests.js
"use client";

console.log("🧪 Testing: Database Integration");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+mongoose\s*=\s*require\s*\(\s*['"]mongoose['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports mongoose module");
            score += 50;
        } else {
            checks.push("❌ Missing mongoose module import");
        }

        if (/mongoose\.connect\s*\(/i.test(userCode)) {
            checks.push("✅ Uses mongoose.connect for database connection");
            score += 50;
        } else {
            checks.push("❌ Missing mongoose.connect usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include mongoose import and connect`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Database Integration", language: "javascript" }
    };
}

console.log("✅ Test ready for: Database Integration");