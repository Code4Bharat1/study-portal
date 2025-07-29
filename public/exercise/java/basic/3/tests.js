// Test for Java Control Structures
// JavaScript test that validates Java control flow

console.log("🧪 Testing: Java Control Structures");

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
        
        // Check for switch statements
        if (/switch\s*\([^)]+\)\s*\{/.test(userCode) && /case\s+/.test(userCode)) {
            checks.push("✅ Uses switch statements");
            score += 25;
        } else {
            checks.push("❌ Missing switch statements");
        }
        
        // Check for break/continue
        if (/\b(break|continue)\s*;/.test(userCode)) {
            checks.push("✅ Uses break/continue");
            score += 20;
        } else {
            checks.push("❌ Missing break/continue");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great control structures! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use if/else, loops, switch, break/continue`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Java Control Structures", language: "java"}
    };
}

console.log("✅ Test ready for: Java Control Structures");