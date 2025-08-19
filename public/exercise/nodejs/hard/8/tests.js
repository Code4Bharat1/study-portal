// nodejs/hard/8/tests.js
"use client";

console.log("🧪 Testing: GraphQL Implementation");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };

    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }

        let score = 0;
        const checks = [];

        if (/const\s+{.*ApolloServer.*}\s*=\s*require\s*\(\s*['"]@apollo\/server['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Imports ApolloServer");
            score += 50;
        } else {
            checks.push("❌ Missing ApolloServer import");
        }

        if (/new\s+ApolloServer\s*\(\s*{.*typeDefs.*resolvers.*}\s*\)/i.test(userCode)) {
            checks.push("✅ Creates ApolloServer with typeDefs and resolvers");
            score += 50;
        } else {
            checks.push("❌ Missing ApolloServer creation");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include ApolloServer with typeDefs and resolvers`;
    } catch (error) {
        result.message = "Error: " + error.message;
    }

    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "GraphQL Implementation", language: "javascript" }
    };
}

console.log("✅ Test ready for: GraphQL Implementation");