// Test for JavaScript Modules and Imports
// JavaScript test that validates module concepts

console.log("🧪 Testing: JavaScript Modules and Imports");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for import statements
        if (/import\s+/.test(userCode)) {
            checks.push("✅ Uses import statements");
            score += 30;
        } else {
            checks.push("❌ Missing import statements");
        }
        
        // Check for export statements
        if (/export\s+(default\s+)?/.test(userCode)) {
            checks.push("✅ Uses export statements");
            score += 30;
        } else {
            checks.push("❌ Missing export statements");
        }
        
        // Check for named imports/exports
        if (/import\s*\{[^}]+\}/.test(userCode) || /export\s*\{[^}]+\}/.test(userCode)) {
            checks.push("✅ Uses named imports/exports");
            score += 20;
        } else {
            checks.push("❌ Missing named imports/exports");
        }
        
        // Check for module.exports or require (CommonJS)
        if (/module\.exports\s*=/.test(userCode) || /require\s*\(/.test(userCode)) {
            checks.push("✅ Uses CommonJS modules");
            score += 20;
        } else {
            checks.push("❌ Missing CommonJS module syntax");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great module usage! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use import/export or require/module.exports`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Modules and Imports", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Modules and Imports");