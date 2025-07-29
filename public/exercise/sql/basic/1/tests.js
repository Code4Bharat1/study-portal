// Test for Basic SELECT Statements
// JavaScript test that validates SQL code

console.log("🧪 Testing: Basic SELECT Statements");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for SELECT statement
        if (/SELECT\s+/i.test(userCode)) {
            checks.push("✅ Has SELECT statement");
            score += 30;
        } else {
            checks.push("❌ Missing SELECT statement");
        }
        
        // Check for FROM clause
        if (/FROM\s+\w+/i.test(userCode)) {
            checks.push("✅ Has FROM clause");
            score += 25;
        } else {
            checks.push("❌ Missing FROM clause");
        }
        
        // Check for column selection
        if (/SELECT\s+\w+/i.test(userCode) || /SELECT\s+\*/i.test(userCode)) {
            checks.push("✅ Selects columns or uses *");
            score += 25;
        } else {
            checks.push("❌ Missing column selection");
        }
        
        // Check for semicolon
        if (/;/.test(userCode)) {
            checks.push("✅ Has semicolon terminator");
            score += 20;
        } else {
            checks.push("❌ Missing semicolon (;)");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Write a SELECT statement with FROM clause`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Basic SELECT Statements", language: "sql"}
    };
}

console.log("✅ Test ready for: Basic SELECT Statements");