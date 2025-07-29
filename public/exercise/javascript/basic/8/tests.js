// Test for JavaScript Classes and OOP
// JavaScript test that validates object-oriented programming concepts

console.log("🧪 Testing: JavaScript Classes and OOP");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for class declaration
        if (/class\s+\w+/.test(userCode)) {
            checks.push("✅ Declares classes");
            score += 25;
        } else {
            checks.push("❌ Missing class declaration");
        }
        
        // Check for constructor
        if (/constructor\s*\(/.test(userCode)) {
            checks.push("✅ Has constructor method");
            score += 25;
        } else {
            checks.push("❌ Missing constructor method");
        }
        
        // Check for class methods
        if (/\w+\s*\([^)]*\)\s*\{/.test(userCode.replace(/constructor\s*\([^)]*\)\s*\{/, ''))) {
            checks.push("✅ Defines class methods");
            score += 25;
        } else {
            checks.push("❌ Missing class methods");
        }
        
        // Check for object instantiation
        if (/new\s+\w+\s*\(/.test(userCode)) {
            checks.push("✅ Creates class instances");
            score += 25;
        } else {
            checks.push("❌ Missing object instantiation");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Excellent OOP implementation! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create classes with constructor, methods, and instances`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Classes and OOP", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Classes and OOP");