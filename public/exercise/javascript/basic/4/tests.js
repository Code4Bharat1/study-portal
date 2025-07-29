// Test for JavaScript DOM Manipulation
// JavaScript test that validates DOM concepts

console.log("🧪 Testing: JavaScript DOM Manipulation");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for DOM selection methods
        if (/document\.(getElementById|querySelector|querySelectorAll|getElementsByClassName|getElementsByTagName)\s*\(/.test(userCode)) {
            checks.push("✅ Uses DOM selection methods");
            score += 30;
        } else {
            checks.push("❌ Missing DOM selection methods");
        }
        
        // Check for DOM manipulation
        if (/\.(innerHTML|textContent|innerText|style|classList)\s*[=.]/.test(userCode)) {
            checks.push("✅ Manipulates DOM elements");
            score += 25;
        } else {
            checks.push("❌ Missing DOM manipulation");
        }
        
        // Check for event handling
        if (/\.(addEventListener|onclick|onchange|onload)\s*[=(]/.test(userCode)) {
            checks.push("✅ Handles events");
            score += 25;
        } else {
            checks.push("❌ Missing event handling");
        }
        
        // Check for element creation or modification
        if (/document\.createElement\s*\(/.test(userCode) || /\.(appendChild|removeChild|insertBefore)\s*\(/.test(userCode)) {
            checks.push("✅ Creates or modifies elements");
            score += 20;
        } else {
            checks.push("❌ Missing element creation/modification");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use DOM selection, manipulation, and events`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript DOM Manipulation", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript DOM Manipulation");