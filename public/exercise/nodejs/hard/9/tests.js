
// nodejs/hard/9/tests.js
"use client";

console.log("🧪 Testing: Message Queues");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+amqp\s*=\s*require\s*\(\s*['"]amqplib['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports amqplib for RabbitMQ");
            score += 50;
        } else {
            checks.push("❌ Missing amqplib import");
        }

        if (/amqp\.connect\s*\(/i.test(userCode)) {
            checks.push("✅ Connects to RabbitMQ");
            score += 50;
        } else {
            checks.push("❌ Missing RabbitMQ connection");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include amqplib and RabbitMQ connection`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Message Queues", language: "javascript" }
    };
}

console.log("✅ Test ready for: Message Queues");