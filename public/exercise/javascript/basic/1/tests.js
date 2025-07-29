// Test for Variables and Data Types
// Topic-specific tests for exercise 1

console.log("🧪 Testing: Variables and Data Types");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // JavaScript syntax check
        try {
            new Function(userCode);
            checks.push("✅ Valid syntax");
            score += 20;
        } catch (e) {
            checks.push("❌ Syntax error: " + e.message);
            result.details = checks;
            result.score = 0;
            result.message = "Fix syntax errors first";
            return result;
        }
        
        // Check for variable declarations
        if (/(?:let|const|var)\s+\w+/.test(userCode)) {
            checks.push("✅ Has variable declarations");
            score += 25;
        } else {
            checks.push("❌ Missing variable declarations (use let, const, or var)");
        }
        
        // Check for string variable
        if (/(?:let|const|var)\s+\w+\s*=\s*["'`]/.test(userCode)) {
            checks.push("✅ Has string variable");
            score += 20;
        } else {
            checks.push("❌ Missing string variable");
        }
        
        // Check for number variable
        if (/(?:let|const|var)\s+\w+\s*=\s*\d+/.test(userCode)) {
            checks.push("✅ Has number variable");
            score += 20;
        } else {
            checks.push("❌ Missing number variable");
        }
        
        // Check for boolean variable
        if (/(?:let|const|var)\s+\w+\s*=\s*(?:true|false)/.test(userCode)) {
            checks.push("✅ Has boolean variable");
            score += 15;
        } else {
            checks.push("❌ Missing boolean variable");
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
        testConfig: {topic: "Variables and Data Types", language: "javascript"}
    };
}

console.log("✅ Test ready for: Variables and Data Types");