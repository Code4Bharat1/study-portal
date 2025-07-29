// Test for React Props and Component Communication
// JavaScript test that validates React props concepts

console.log("🧪 Testing: React Props and Component Communication");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for props parameter
        if (/function\s+\w+\s*\(\s*props\s*\)/.test(userCode) || /\(\s*\{\s*\w+[^}]*\}\s*\)/.test(userCode)) {
            checks.push("✅ Accepts props parameter");
            score += 25;
        } else {
            checks.push("❌ Missing props parameter");
        }
        
        // Check for props usage
        if (/props\.\w+/.test(userCode) || /\{\s*\w+\s*\}/.test(userCode)) {
            checks.push("✅ Uses props in component");
            score += 30;
        } else {
            checks.push("❌ Missing props usage");
        }
        
        // Check for prop passing
        if (/<\w+\s+\w+=/.test(userCode)) {
            checks.push("✅ Passes props to child components");
            score += 25;
        } else {
            checks.push("❌ Missing prop passing");
        }
        
        // Check for destructuring
        if (/\{\s*\w+[^}]*\}\s*=\s*props/.test(userCode) || /function\s+\w+\s*\(\s*\{\s*\w+/.test(userCode)) {
            checks.push("✅ Uses props destructuring");
            score += 20;
        } else {
            checks.push("❌ Missing props destructuring");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Excellent props usage! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use props for component communication`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "React Props and Component Communication", language: "react"}
    };
}

console.log("✅ Test ready for: React Props and Component Communication");