// Test for Node.js Basics and Modules
// JavaScript test that validates Node.js module usage

console.log("🧪 Testing: Node.js Basics and Modules");

function runSimpleTest(userCode) {
    const result = { passed: false, score: 0, message: "", details: [] };
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for module.exports usage
        if (/module\.exports\s*=/i.test(userCode)) {
            checks.push("✅ Uses module.exports");
            score += 25;
        } else {
            checks.push("❌ Missing module.exports");
        }
        
        // Check for require statement
        if (/require\s*\(\s*['"][^'"]+['"]\s*\)/i.test(userCode)) {
            checks.push("✅ Uses require to import module");
            score += 25;
        } else {
            checks.push("❌ Missing require statement");
        }
        
        // Check for basic console.log
        if (/console\.log\s*\(/.test(userCode)) {
            checks.push("✅ Uses console.log for output");
            score += 25;
        } else {
            checks.push("❌ Missing console.log");
        }
        
        // Check for function declaration
        if (/function\s+\w+\s*\(/.test(userCode)) {
            checks.push("✅ Defines a function");
            score += 25;
        } else {
            checks.push("❌ Missing function declaration");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Implement basic Node.js module patterns`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: { topic: "Node.js Basics and Modules", language: "javascript" }
    };
}

console.log("✅ Test ready for: Node.js Basics and Modules");