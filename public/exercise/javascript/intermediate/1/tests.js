// Test for JavaScript ES6+ Features
// JavaScript test that validates modern JavaScript concepts

console.log("🧪 Testing: JavaScript ES6+ Features");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for arrow functions
        if (/=>\s*/.test(userCode)) {
            checks.push("✅ Uses arrow functions");
            score += 25;
        } else {
            checks.push("❌ Missing arrow functions");
        }
        
        // Check for let/const
        if (/\b(let|const)\s+\w+/.test(userCode)) {
            checks.push("✅ Uses let/const declarations");
            score += 20;
        } else {
            checks.push("❌ Missing let/const declarations");
        }
        
        // Check for template literals
        if (/`[^`]*\$\{[^}]+\}[^`]*`/.test(userCode)) {
            checks.push("✅ Uses template literals");
            score += 25;
        } else {
            checks.push("❌ Missing template literals");
        }
        
        // Check for destructuring
        if (/\{\s*\w+[^}]*\}\s*=/.test(userCode) || /\[\s*\w+[^\]]*\]\s*=/.test(userCode)) {
            checks.push("✅ Uses destructuring");
            score += 30;
        } else {
            checks.push("❌ Missing destructuring");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use ES6+ features like arrow functions, destructuring`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript ES6+ Features", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript ES6+ Features");