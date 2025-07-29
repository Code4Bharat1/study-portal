// Test for CSS Layout with Display
// JavaScript test that validates CSS display properties

console.log("🧪 Testing: CSS Layout with Display");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for display property
        if (/display\s*:\s*(block|inline|inline-block|flex|grid|none)/i.test(userCode)) {
            checks.push("✅ Uses display property");
            score += 30;
        } else {
            checks.push("❌ Missing display property");
        }
        
        // Check for flexbox properties
        if (/display\s*:\s*flex/i.test(userCode) || /(justify-content|align-items|flex-direction)\s*:/i.test(userCode)) {
            checks.push("✅ Uses flexbox layout");
            score += 25;
        } else {
            checks.push("❌ Missing flexbox layout");
        }
        
        // Check for grid properties
        if (/display\s*:\s*grid/i.test(userCode) || /(grid-template|grid-gap|grid-area)\s*:/i.test(userCode)) {
            checks.push("✅ Uses CSS Grid");
            score += 25;
        } else {
            checks.push("❌ Missing CSS Grid");
        }
        
        // Check for positioning
        if /(position|float|clear)\s*:\s*[^;]+;/i.test(userCode)) {
            checks.push("✅ Uses positioning properties");
            score += 20;
        } else {
            checks.push("❌ Missing positioning properties");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great layout skills! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use display, flexbox, grid, and positioning`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "CSS Layout with Display", language: "css"}
    };
}

console.log("✅ Test ready for: CSS Layout with Display");