// Test for CSS Colors and Typography
// JavaScript test that validates CSS color and typography concepts

console.log("🧪 Testing: CSS Colors and Typography");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for color properties
        if (/color\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses color property");
            score += 25;
        } else {
            checks.push("❌ Missing color property");
        }
        
        // Check for font properties
        if (/font-(family|size|weight|style)\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses font properties");
            score += 25;
        } else {
            checks.push("❌ Missing font properties");
        }
        
        // Check for background color
        if (/background(-color)?\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses background color");
            score += 25;
        } else {
            checks.push("❌ Missing background color");
        }
        
        // Check for text properties
        if (/text-(align|decoration|transform)\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Uses text properties");
            score += 25;
        } else {
            checks.push("❌ Missing text properties");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use color, font, and text properties`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "CSS Colors and Typography", language: "css"}
    };
}

console.log("✅ Test ready for: CSS Colors and Typography");