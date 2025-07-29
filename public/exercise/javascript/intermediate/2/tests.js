// Test for JavaScript Advanced Functions
// JavaScript test that validates advanced function concepts

console.log("🧪 Testing: JavaScript Advanced Functions");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for higher-order functions
        if (/\.(map|filter|reduce|forEach)\s*\(/.test(userCode)) {
            checks.push("✅ Uses higher-order functions (map, filter, reduce)");
            score += 25;
        } else {
            checks.push("❌ Missing higher-order functions");
        }
        
        // Check for closures
        if (/function\s+\w+\s*\([^)]*\)\s*\{[^}]*return\s+function/.test(userCode)) {
            checks.push("✅ Implements closures");
            score += 30;
        } else {
            checks.push("❌ Missing closure implementation");
        }
        
        // Check for function composition or currying
        if (/=>\s*[^{]*=>/s.test(userCode) || /function\s*\([^)]*\)\s*\{[^}]*return\s+function\s*\([^)]*\)\s*\{/.test(userCode)) {
            checks.push("✅ Uses function composition or currying");
            score += 25;
        } else {
            checks.push("❌ Missing function composition");
        }
        
        // Check for callback functions
        if (/\w+\s*\([^)]*function\s*\([^)]*\)/.test(userCode) || /\w+\s*\([^)]*=>/s.test(userCode)) {
            checks.push("✅ Uses callback functions");
            score += 20;
        } else {
            checks.push("❌ Missing callback functions");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Advanced function mastery! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use higher-order functions, closures, and callbacks`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Advanced Functions", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Advanced Functions");