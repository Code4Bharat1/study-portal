// Test for CSS Selectors and Properties
// JavaScript test that validates CSS code

console.log("🧪 Testing: CSS Selectors and Properties");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for CSS selectors
        if (/[.#]?\w+\s*\{/.test(userCode)) {
            checks.push("✅ Has CSS selectors");
            score += 25;
        } else {
            checks.push("❌ Missing CSS selectors");
        }
        
        // Check for CSS properties
        if (/\w+\s*:\s*[^;]+;/.test(userCode)) {
            checks.push("✅ Has CSS properties");
            score += 25;
        } else {
            checks.push("❌ Missing CSS properties");
        }
        
        // Check for color properties
        if (/color\s*:|background-color\s*:/.test(userCode)) {
            checks.push("✅ Uses color properties");
            score += 25;
        } else {
            checks.push("❌ Missing color properties");
        }
        
        // Check for proper CSS syntax
        if (/\{[^}]*\}/.test(userCode)) {
            checks.push("✅ Proper CSS syntax structure");
            score += 25;
        } else {
            checks.push("❌ Missing proper CSS syntax structure");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use CSS selectors and properties`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "CSS Selectors and Properties", language: "css"}
    };
}

console.log("✅ Test ready for: CSS Selectors and Properties");