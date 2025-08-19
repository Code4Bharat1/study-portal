
// nodejs/hard/3/tests.js
"use client";

console.log("🧪 Testing: Clustering and Load Balancing");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+cluster\s*=\s*require\s*\(\s*['"]cluster['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports cluster module");
            score += 50;
        } else {
            checks.push("❌ Missing cluster module import");
        }

        if (/if\s*\(\s*cluster\.isMaster\s*\)/i.test(userCode)) {
            checks.push("✅ Uses cluster.isMaster for load balancing");
            score += 50;
        } else {
            checks.push("❌ Missing cluster.isMaster usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include cluster and isMaster check`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Clustering and Load Balancing", language: "javascript" }
    };
}

console.log("✅ Test ready for: Clustering and Load Balancing");
