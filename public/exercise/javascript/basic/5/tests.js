// Test for JavaScript Loops and Conditionals
// JavaScript test that validates control flow concepts

console.log("🧪 Testing: JavaScript Loops and Conditionals");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for if statements
        if (/if\s*\([^)]+\)\s*\{/.test(userCode)) {
            checks.push("✅ Uses if statements");
            score += 25;
        } else {
            checks.push("❌ Missing if statements");
        }
        
        // Check for loops
        if (/for\s*\([^)]*\)\s*\{/.test(userCode) || /while\s*\([^)]+\)\s*\{/.test(userCode)) {
            checks.push("✅ Uses loops (for/while)");
            score += 30;
        } else {
            checks.push("❌ Missing loops");
        }
        
        // Check for else statements
        if (/else\s*\{/.test(userCode) || /else\s+if\s*\([^)]+\)\s*\{/.test(userCode)) {
            checks.push("✅ Uses else/else if");
            score += 20;
        } else {
            checks.push("❌ Missing else statements");
        }
        
        // Check for comparison operators
        if (/[><=!]=?/.test(userCode) || /===/.test(userCode)) {
            checks.push("✅ Uses comparison operators");
            score += 25;
        } else {
            checks.push("❌ Missing comparison operators");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use if/else statements and loops`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Loops and Conditionals", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Loops and Conditionals");