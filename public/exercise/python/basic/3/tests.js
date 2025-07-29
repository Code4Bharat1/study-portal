// Test for Python Conditional Statements
// JavaScript test that validates Python code

console.log("🧪 Testing: Python Conditional Statements");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for if statement
        if (/if\s+/.test(userCode)) {
            checks.push("✅ Has if statement");
            score += 30;
        } else {
            checks.push("❌ Missing if statement");
        }
        
        // Check for elif statement
        if (/elif\s+/.test(userCode)) {
            checks.push("✅ Has elif statement");
            score += 25;
        } else {
            checks.push("❌ Missing elif statement");
        }
        
        // Check for else statement
        if (/else\s*:/.test(userCode)) {
            checks.push("✅ Has else statement");
            score += 25;
        } else {
            checks.push("❌ Missing else statement");
        }
        
        // Check for comparison operators
        if (/[><=!]=?/.test(userCode)) {
            checks.push("✅ Uses comparison operators");
            score += 20;
        } else {
            checks.push("❌ Missing comparison operators (>, <, ==, !=, etc.)");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use if/elif/else statements with conditions`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Python Conditional Statements", language: "python"}
    };
}

console.log("✅ Test ready for: Python Conditional Statements");