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

        if (/import\s+{.*PrismaClient.*}\s+from\s+['"]@prisma\/client['"]/i.test(userCode)) {
            checks.push("✅ Imports PrismaClient");
            score += 50;
        } else {
            checks.push("❌ Missing PrismaClient import");
        }

        if (/export\s+async\s+function\s+getServerSideProps\s*\(\)\s*{[^}]*prisma\./i.test(userCode)) {
            checks.push("✅ Uses Prisma in getServerSideProps");
            score += 50;
        } else {
            checks.push("❌ Missing Prisma usage in getServerSideProps");
        }

        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Include PrismaClient and use in getServerSideProps`;
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