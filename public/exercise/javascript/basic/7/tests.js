// Test for JavaScript Asynchronous Programming
// JavaScript test that validates async concepts

console.log("🧪 Testing: JavaScript Asynchronous Programming");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for Promise usage
        if (/new\s+Promise\s*\(/.test(userCode) || /Promise\.(resolve|reject|all|race)\s*\(/.test(userCode)) {
            checks.push("✅ Uses Promises");
            score += 25;
        } else {
            checks.push("❌ Missing Promise usage");
        }
        
        // Check for async/await
        if (/async\s+function/.test(userCode) || /async\s*\(/.test(userCode)) {
            checks.push("✅ Uses async functions");
            score += 25;
        } else {
            checks.push("❌ Missing async functions");
        }
        
        // Check for await keyword
        if (/await\s+/.test(userCode)) {
            checks.push("✅ Uses await keyword");
            score += 25;
        } else {
            checks.push("❌ Missing await keyword");
        }
        
        // Check for .then() or .catch()
        if (/\.(then|catch)\s*\(/.test(userCode)) {
            checks.push("✅ Uses Promise chaining (.then/.catch)");
            score += 25;
        } else {
            checks.push("❌ Missing Promise chaining");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great async programming! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use Promises, async/await, and error handling`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Asynchronous Programming", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Asynchronous Programming");