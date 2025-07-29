// Test for JavaScript Local Storage and APIs
// JavaScript test that validates browser API usage

console.log("🧪 Testing: JavaScript Local Storage and APIs");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for localStorage usage
        if (/localStorage\.(setItem|getItem|removeItem|clear)\s*\(/.test(userCode)) {
            checks.push("✅ Uses localStorage API");
            score += 30;
        } else {
            checks.push("❌ Missing localStorage usage");
        }
        
        // Check for fetch API
        if (/fetch\s*\(/.test(userCode)) {
            checks.push("✅ Uses fetch API");
            score += 25;
        } else {
            checks.push("❌ Missing fetch API");
        }
        
        // Check for JSON methods
        if (/JSON\.(parse|stringify)\s*\(/.test(userCode)) {
            checks.push("✅ Uses JSON methods");
            score += 25;
        } else {
            checks.push("❌ Missing JSON methods");
        }
        
        // Check for sessionStorage or other storage APIs
        if (/sessionStorage\.(setItem|getItem)\s*\(/.test(userCode) || /indexedDB/.test(userCode)) {
            checks.push("✅ Uses additional storage APIs");
            score += 20;
        } else {
            checks.push("❌ Missing additional storage APIs");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Excellent API usage! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use localStorage, fetch, and JSON APIs`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Local Storage and APIs", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Local Storage and APIs");