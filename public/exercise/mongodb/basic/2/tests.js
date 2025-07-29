// Test for MongoDB CRUD Operations
// JavaScript test that validates MongoDB operations

console.log("🧪 Testing: MongoDB CRUD Operations");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for insertOne or insertMany
        if (/\.(insertOne|insertMany)\s*\(/.test(userCode)) {
            checks.push("✅ Uses MongoDB insert operations");
            score += 25;
        } else {
            checks.push("❌ Missing MongoDB insert operations");
        }
        
        // Check for find operations
        if (/\.find\s*\(/.test(userCode)) {
            checks.push("✅ Uses MongoDB find operations");
            score += 25;
        } else {
            checks.push("❌ Missing MongoDB find operations");
        }
        
        // Check for update operations
        if (/\.(updateOne|updateMany|replaceOne)\s*\(/.test(userCode)) {
            checks.push("✅ Uses MongoDB update operations");
            score += 25;
        } else {
            checks.push("❌ Missing MongoDB update operations");
        }
        
        // Check for delete operations
        if (/\.(deleteOne|deleteMany)\s*\(/.test(userCode)) {
            checks.push("✅ Uses MongoDB delete operations");
            score += 25;
        } else {
            checks.push("❌ Missing MongoDB delete operations");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        
        if (result.passed) {
            result.message = `Great MongoDB CRUD operations! Score: ${result.score}/100`;
        } else {
            result.message = `Score: ${result.score}/100 - Implement all CRUD operations (Create, Read, Update, Delete)`;
        }
        
    } catch (error) {
        result.message = "Error analyzing MongoDB operations: " + error.message;
        result.details = ["❌ MongoDB operation analysis failed"];
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "MongoDB CRUD Operations", language: "mongodb"}
    };
}

console.log("✅ MongoDB CRUD test ready for: CRUD Operations");