// Test for PHP Basics and Syntax
// JavaScript test that validates PHP code

console.log("🧪 Testing: PHP Basics and Syntax");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for PHP opening tag
        if (/<\?php/.test(userCode)) {
            checks.push("✅ Has PHP opening tag");
            score += 25;
        } else {
            checks.push("❌ Missing PHP opening tag (<?php)");
        }
        
        // Check for variable declaration
        if (/\$\w+\s*=/.test(userCode)) {
            checks.push("✅ Has variable declarations");
            score += 25;
        } else {
            checks.push("❌ Missing variable declarations ($variable)");
        }
        
        // Check for echo statement
        if (/echo\s+/.test(userCode)) {
            checks.push("✅ Uses echo statement");
            score += 25;
        } else {
            checks.push("❌ Missing echo statement");
        }
        
        // Check for string concatenation or output
        if (/echo\s+.*["']/.test(userCode) || /\./.test(userCode)) {
            checks.push("✅ Has string output or concatenation");
            score += 25;
        } else {
            checks.push("❌ Missing string output");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use PHP tags, variables, and echo statements`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "PHP Basics and Syntax", language: "php"}
    };
}

console.log("✅ Test ready for: PHP Basics and Syntax");