
// php/basic/4/tests.js
// Test for Functions and Scope
console.log("🧪 Testing: Functions and Scope");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: '', details: [] };
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = 'Code is empty or too short';
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for function declaration
        const hasFunctionDecl = userCode.match(/\bfunction\s+\w+\s*\(\s*[^)]*\)\s*{/);
        if (hasFunctionDecl) {
            checks.push("✅ Has function declaration");
            score += 25;
        } else {
            checks.push("❌ Missing function declaration");
        }
        
        // Check for function with parameters
        const hasParams = userCode.match(/\bfunction\s+\w+\s*\(\s*\$\w+\s*(,\s*\$\w+\s*)*\)\s*{/);
        if (hasParams) {
            checks.push("✅ Has function with parameters");
            score += 25;
        } else {
            checks.push("❌ Missing function with parameters");
        }
        
        // Check for return statement
        const hasReturn = userCode.match(/\breturn\s+[^;]+;/);
        if (hasReturn) {
            checks.push("✅ Has return statement");
            score += 25;
        } else {
            checks.push("❌ Missing return statement");
        }
        
        // Check for function call
        const hasFunctionCall = userCode.match(/\b\w+\s*\(\s*[^)]*\)\s*;/);
        if (hasFunctionCall) {
            checks.push("✅ Has function call");
            score += 25;
        } else {
            checks.push("❌ Missing function call");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 75;
        result.message = result.passed 
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Add more function features`;
            
    } catch (e) {
        result.message = `Error: ${e.message}`;
    }
    
    return result;
}
// Export for Monaco Editor
if (typeof window !== "undefined") {
  window.exerciseTest = {
    runTests: runSimpleTest,
    testConfig: {
      topic: "Basic Arithmetic Operations",
      language: "javascript",
    },
  };
}
console.log("✅ Test ready for: Functions and Scope");
