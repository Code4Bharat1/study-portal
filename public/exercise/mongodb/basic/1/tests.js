// Test for MongoDB Basics and Connection
// JavaScript test that validates MongoDB code

console.log("🧪 Testing: MongoDB Basics and Connection");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for MongoDB operations
        if (/db\.\w+\./.test(userCode)) {
            checks.push("✅ Uses MongoDB database operations");
            score += 30;
        } else {
            checks.push("❌ Missing MongoDB database operations");
        }
        
        // Check for collection operations
        if (/\.(find|insertOne|insertMany|updateOne|deleteOne)\s*\(/.test(userCode)) {
            checks.push("✅ Uses collection methods");
            score += 30;
        } else {
            checks.push("❌ Missing collection methods");
        }
        
        // Check for query syntax
        if (/\{[^}]*\}/.test(userCode)) {
            checks.push("✅ Uses MongoDB query syntax");
            score += 20;
        } else {
            checks.push("❌ Missing MongoDB query syntax");
        }
        
        // Check for MongoDB connection (if using Node.js driver)
        if (/MongoClient|mongoose/.test(userCode)) {
            checks.push("✅ Uses MongoDB connection");
            score += 20;
        } else {
            checks.push("⚠️ Consider using MongoDB driver for connections");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use MongoDB operations and queries`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "MongoDB Basics and Connection", language: "mongodb"}
    };
}

console.log("✅ Test ready for: MongoDB Basics and Connection");