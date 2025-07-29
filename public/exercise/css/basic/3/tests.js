// Test for CSS Box Model
// JavaScript test that validates CSS box model concepts

console.log("🧪 Testing: CSS Box Model");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for margin properties
        if (/margin(-top|-right|-bottom|-left)?\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses margin properties");
            score += 25;
        } else {
            checks.push("❌ Missing margin properties");
        }
        
        // Check for padding properties
        if (/padding(-top|-right|-bottom|-left)?\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses padding properties");
            score += 25;
        } else {
            checks.push("❌ Missing padding properties");
        }
        
        // Check for border properties
        if (/border(-width|-style|-color)?\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses border properties");
            score += 25;
        } else {
            checks.push("❌ Missing border properties");
        }
        
        // Check for width/height properties
        if (/(width|height)\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses width/height properties");
            score += 25;
        } else {
            checks.push("❌ Missing width/height properties");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use margin, padding, border, and dimensions`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "CSS Box Model", language: "css"}
    };
}

console.log("✅ Test ready for: CSS Box Model");