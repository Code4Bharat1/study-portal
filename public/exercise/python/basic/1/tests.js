// Test for Python Variables and Data Types
// JavaScript test that validates Python code

console.log("🧪 Testing: Python Variables and Data Types");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for variable assignments
        if (/\w+\s*=\s*/.test(userCode) && !/==/.test(userCode)) {
            checks.push("✅ Has variable assignments");
            score += 25;
        } else {
            checks.push("❌ Missing variable assignments");
        }
        
        // Check for string variable
        if (/\w+\s*=\s*["']/.test(userCode)) {
            checks.push("✅ Has string variable");
            score += 25;
        } else {
            checks.push("❌ Missing string variable");
        }
        
        // Check for number variable
        if (/\w+\s*=\s*\d+/.test(userCode)) {
            checks.push("✅ Has number variable");
            score += 25;
        } else {
            checks.push("❌ Missing number variable");
        }
        
        // Check for boolean variable
        if (/\w+\s*=\s*(True|False)/.test(userCode)) {
            checks.push("✅ Has boolean variable");
            score += 25;
        } else {
            checks.push("❌ Missing boolean variable (True/False)");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create variables of different data types`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Python Variables and Data Types", language: "python"}
    };
}

console.log("✅ Test ready for: Python Variables and Data Types");