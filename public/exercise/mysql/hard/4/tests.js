
// mysql/hard/4/tests.js
"use client";

console.log("🧪 Testing: Full-Text Search");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/CREATE\s+FULLTEXT\s+INDEX\s+\w+\s+ON\s+[`'"]?\w+[`'"]?\s*\(/i.test(userCode)) {
            checks.push("✅ Creates FULLTEXT index");
            score += 50;
        } else {
            checks.push("❌ Missing FULLTEXT index creation");
        }

        if (/MATCH\s*\(\s*[`'"]?\w+[`'"]?\s*\)\s+AGAINST\s*\(\s*['"][^'"]+['"]/i.test(userCode)) {
            checks.push("✅ Uses MATCH AGAINST for full-text search");
            score += 50;
        } else {
            checks.push("❌ Missing MATCH AGAINST query");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include FULLTEXT index and MATCH AGAINST`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Full-Text Search", language: "javascript" }
    };
}

console.log("✅ Test ready for: Full-Text Search");
