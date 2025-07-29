// Test for JavaScript Error Handling
// JavaScript test that validates error handling concepts

console.log("🧪 Testing: JavaScript Error Handling");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for try-catch blocks
        if (/try\s*\{/.test(userCode) && /catch\s*\([^)]*\)\s*\{/.test(userCode)) {
            checks.push("✅ Uses try-catch blocks");
            score += 40;
        } else {
            checks.push("❌ Missing try-catch blocks");
        }
        
        // Check for throw statements
        if (/throw\s+/.test(userCode)) {
            checks.push("✅ Uses throw statements");
            score += 25;
        } else {
            checks.push("❌ Missing throw statements");
        }
        
        // Check for finally block
        if (/finally\s*\{/.test(userCode)) {
            checks.push("✅ Uses finally block");
            score += 20;
        } else {
            checks.push("❌ Missing finally block");
        }
        
        // Check for Error object usage
        if (/new\s+Error\s*\(/.test(userCode) || /Error\s*\(/.test(userCode)) {
            checks.push("✅ Creates Error objects");
            score += 15;
        } else {
            checks.push("❌ Missing Error object creation");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Implement proper error handling`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Error Handling", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Error Handling");