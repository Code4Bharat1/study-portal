// Test for CSS Selectors and Properties
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
        
        // Check for element selector
        if (/^[a-zA-Z][a-zA-Z0-9]*(?=\s*\{)/m.test(userCode)) {
            checks.push("✅ Has element selector");
            score += 25;
        } else {
            checks.push("❌ Missing element selector");
        }
        
        // Check for class selector
        if (/\.[a-zA-Z][a-zA-Z0-9-]*(?=\s*\{)/m.test(userCode)) {
            checks.push("✅ Has class selector");
            score += 25;
        } else {
            checks.push("❌ Missing class selector");
        }
        
        // Check for ID selector
        if (/#[a-zA-Z][a-zA-Z0-9-]*(?=\s*\{)/m.test(userCode)) {
            checks.push("✅ Has ID selector");
            score += 25;
        } else {
            checks.push("❌ Missing ID selector");
        }
        
        // Check for basic properties (color, background-color, width, height)
        if (/(color|background-color|width|height)\s*:\s*[^;]+;/i.test(userCode)) {
            checks.push("✅ Has basic styling properties");
            score += 25;
        } else {
            checks.push("❌ Missing basic styling properties");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 75;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Add more CSS selectors and properties`;
            
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "CSS Selectors and Properties", language: "css"}
    };
}

console.log("✅ Test ready for: CSS Selectors and Properties");