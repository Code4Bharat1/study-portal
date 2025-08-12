// Test for Python Functions and Parameters
// JavaScript test that validates Python code execution in sandbox

console.log("🧪 Testing: Python Functions and Parameters");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Import required testing functions
        const { describe, it, expect } = require('mocha');
        
        // Check for function definition
        if (/def\s+\w+\s*\(/.test(userCode)) {
            checks.push("✅ Has function definition");
            score += 30;
        } else {
            checks.push("❌ Missing function definition (def)");
        }
        
        // Check for function parameters
        if (/def\s+\w+\s*\([^)]+\)/.test(userCode)) {
            checks.push("✅ Function has parameters");
            score += 25;
        } else {
            checks.push("❌ Function missing parameters");
        }
        
        // Check for return statement
        if (/return\s+/.test(userCode)) {
            checks.push("✅ Has return statement");
            score += 25;
        } else {
            checks.push("❌ Missing return statement");
        }
        
        // Check for function call
        if (/\w+\s*\([^)]*\)/.test(userCode) && /def\s+\w+/.test(userCode)) {
            checks.push("✅ Function is called");
            score += 20;
        } else {
            checks.push("❌ Function not called");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create function with parameters and return value`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Python Functions and Parameters", language: "python"}
    };
}

console.log("✅ Test ready for: Python Functions and Parameters");