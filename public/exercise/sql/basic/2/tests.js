// Test for SQL WHERE Clause and Filtering
// JavaScript test that validates SQL filtering concepts

console.log("🧪 Testing: SQL WHERE Clause and Filtering");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Remove comments and normalize whitespace
        const cleanCode = userCode.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        
        // Check for WHERE clause
        if (/WHERE\s+/i.test(cleanCode)) {
            checks.push("✅ Uses WHERE clause for filtering");
            score += 30;
        } else {
            checks.push("❌ Missing WHERE clause");
        }
        
        // Check for comparison operators
        if (/[><=!]=?/.test(cleanCode)) {
            checks.push("✅ Uses comparison operators (=, >, <, !=)");
            score += 25;
        } else {
            checks.push("❌ Missing comparison operators");
        }
        
        // Check for logical operators
        if (/\b(AND|OR|NOT)\b/i.test(cleanCode)) {
            checks.push("✅ Uses logical operators (AND, OR, NOT)");
            score += 25;
        } else {
            checks.push("❌ Missing logical operators");
        }
        
        // Check for advanced filtering (LIKE, IN, BETWEEN)
        if (/\b(LIKE|IN|BETWEEN|IS\s+NULL|IS\s+NOT\s+NULL)\b/i.test(cleanCode)) {
            checks.push("✅ Uses advanced filtering (LIKE, IN, BETWEEN, NULL checks)");
            score += 20;
        } else {
            checks.push("❌ Missing advanced filtering operators");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        
        if (result.passed) {
            result.message = `Excellent filtering! Score: ${result.score}/100`;
        } else {
            result.message = `Score: ${result.score}/100 - Use WHERE clause with comparison and logical operators`;
        }
        
    } catch (error) {
        result.message = "Error analyzing SQL WHERE clause: " + error.message;
        result.details = ["❌ WHERE clause analysis failed"];
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "SQL WHERE Clause and Filtering", language: "sql"}
    };
}

console.log("✅ SQL WHERE test ready for: WHERE Clause and Filtering");