// nodejs/intermediate/4/tests.js
"use client";

console.log("🧪 Testing: RESTful API Development");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/app\.(get|post|put|delete)\s*\(\s*['"]\/\w*['"],\s*function\s*\(/i.test(userCode)) {
            checks.push("✅ Defines a RESTful route (GET/POST/PUT/DELETE)");
            score += 50;
        } else {
            checks.push("❌ Missing RESTful route definition");
        }

        if (/res\.(status|json)\s*\(\s*\d+.*\)/i.test(userCode)) {
            checks.push("✅ Uses res.status or res.json for response");
            score += 50;
        } else {
            checks.push("❌ Missing res.status or res.json usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include RESTful route and response handling`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "RESTful API Development", language: "javascript" }
    };
}

console.log("✅ Test ready for: RESTful API Development");
