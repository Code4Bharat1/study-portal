// nodejs/intermediate/10/tests.js
"use client";

console.log("🧪 Testing: Task Scheduling");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+cron\s*=\s*require\s*\(\s*['"]node-cron['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports node-cron module");
            score += 50;
        } else {
            checks.push("❌ Missing node-cron import");
        }

        if (/cron\.schedule\s*\(\s*['"].+['"],\s*function\s*\(/i.test(userCode)) {
            checks.push("✅ Uses cron.schedule for task scheduling");
            score += 50;
        } else {
            checks.push("❌ Missing cron.schedule usage");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include node-cron and schedule task`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Task Scheduling", language: "javascript" }
    };
}

console.log("✅ Test ready for: Task Scheduling");