// Test for Express Setup and Basic Routes
// JavaScript test that validates Express.js code

console.log("🧪 Testing: Express Setup and Basic Routes");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for Express import/require
        if (/require\s*\(\s*['"]express['"]\s*\)/.test(userCode)) {
            checks.push("✅ Imports Express framework");
            score += 25;
        } else {
            checks.push("❌ Missing Express import");
        }
        
        // Check for app creation
        if (/express\s*\(\s*\)/.test(userCode)) {
            checks.push("✅ Creates Express app instance");
            score += 25;
        } else {
            checks.push("❌ Missing Express app creation");
        }
        
        // Check for route definition
        if (/app\.(get|post|put|delete)\s*\(/.test(userCode)) {
            checks.push("✅ Defines routes");
            score += 25;
        } else {
            checks.push("❌ Missing route definitions");
        }
        
        // Check for server listening
        if (/app\.listen\s*\(/.test(userCode) || /\.listen\s*\(/.test(userCode)) {
            checks.push("✅ Server listens on port");
            score += 25;
        } else {
            checks.push("❌ Missing server listen");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Set up Express server with routes`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Express Setup and Basic Routes", language: "express"}
    };
}

console.log("✅ Test ready for: Express Setup and Basic Routes");