// Test for Node.js Modules and Require
// Topic-specific tests for exercise 1

console.log("🧪 Testing: Node.js Modules and Require");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // JavaScript syntax check
        try {
            new Function(userCode);
            checks.push("✅ Valid syntax");
            score += 20;
        } catch (e) {
            checks.push("❌ Syntax error: " + e.message);
            result.details = checks;
            result.score = 0;
            result.message = "Fix syntax errors first";
            return result;
        }
        
        // Check for require statement
        if (/require\s*\(/.test(userCode)) {
            checks.push("✅ Uses require statement");
            score += 30;
        } else {
            checks.push("❌ Missing require statement");
        }
        
        // Check for module.exports
        if (/module\.exports/.test(userCode)) {
            checks.push("✅ Uses module.exports");
            score += 25;
        } else {
            checks.push("❌ Missing module.exports");
        }
        
        // Check for console.log
        if (/console\.log/.test(userCode)) {
            checks.push("✅ Has console.log");
            score += 15;
        } else {
            checks.push("❌ Missing console.log");
        }
        
        // Check for Node.js built-in modules
        if (/require\s*\(\s*['"](?:fs|path|http|url|os)['"]/.test(userCode)) {
            checks.push("✅ Uses Node.js built-in module");
            score += 10;
        } else {
            checks.push("❌ Missing Node.js built-in module");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use require and module.exports`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Node.js Modules and Require", language: "nodejs"}
    };
}

console.log("✅ Test ready for: Node.js Modules and Require");