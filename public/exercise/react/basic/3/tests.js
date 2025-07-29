// Test for React State and useState Hook
// JavaScript test that validates React state management

console.log("🧪 Testing: React State and useState Hook");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for useState import
        if (/import.*useState/.test(userCode)) {
            checks.push("✅ Imports useState");
            score += 25;
        } else {
            checks.push("❌ Missing useState import");
        }
        
        // Check for useState hook usage
        if (/useState\s*\(/.test(userCode)) {
            checks.push("✅ Uses useState hook");
            score += 30;
        } else {
            checks.push("❌ Missing useState hook");
        }
        
        // Check for state destructuring
        if (/\[\s*\w+\s*,\s*set\w+\s*\]\s*=\s*useState/.test(userCode)) {
            checks.push("✅ Properly destructures state");
            score += 25;
        } else {
            checks.push("❌ Missing proper state destructuring");
        }
        
        // Check for state setter usage
        if (/set\w+\s*\(/.test(userCode)) {
            checks.push("✅ Uses state setter");
            score += 20;
        } else {
            checks.push("❌ Missing state setter usage");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use useState hook for state management`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "React State and useState Hook", language: "react"}
    };
}

console.log("✅ Test ready for: React State and useState Hook");