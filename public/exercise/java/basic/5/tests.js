
// java/basic/5/tests.js
// Test for Arrays and Collections
console.log("🧪 Testing: Arrays and Collections");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: '', details: [] };
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = 'Code is empty or too short';
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for array declaration
        const hasArrayDecl = userCode.match(/\b(int|double|String)\[\s*\]\s+\w+\s*(=\s*new\s+\1\[\s*\d+\s*\])?\s*;/);
        if (hasArrayDecl) {
            checks.push("✅ Has array declaration");
            score += 25;
        } else {
            checks.push("❌ Missing array declaration");
        }
        
        // Check for array initialization
        const hasArrayInit = userCode.match(/\b(int|double|String)\[\s*\]\s+\w+\s*=\s*new\s+\1\[\s*\d+\s*\]\s*;/);
        if (hasArrayInit) {
            checks.push("✅ Has array initialization");
            score += 25;
        } else {
            checks.push("❌ Missing array initialization");
        }
        
        // Check for collection (e.g., ArrayList)
        const hasCollection = userCode.match(/\bArrayList\s*<\s*\w+\s*>\s+\w+\s*(=\s*new\s+ArrayList\s*<\s*\w+\s*>\s*\(\s*\))?\s*;/);
        if (hasCollection) {
            checks.push("✅ Has collection declaration");
            score += 25;
        } else {
            checks.push("❌ Missing collection declaration");
        }
        
        // Check for collection method (e.g., add)
        const hasCollectionMethod = userCode.match(/\b\w+\.add\s*\(\s*[^)]+\)\s*;/);
        if (hasCollectionMethod) {
            checks.push("✅ Has collection method");
            score += 25;
        } else {
            checks.push("❌ Missing collection method");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 75;
        result.message = result.passed 
            ? `Great! Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Add more array and collection features`;
            
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

console.log("✅ Test ready for: Arrays and Collections");