// Test for PHP Variables and Data Types
// JavaScript test that validates PHP variable concepts

console.log("🧪 Testing: PHP Variables and Data Types");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for PHP variable declaration
        if (/\$\w+\s*=/.test(userCode)) {
            checks.push("✅ Declares PHP variables");
            score += 25;
        } else {
            checks.push("❌ Missing PHP variable declarations");
        }
        
        // Check for different data types
        if (/\$\w+\s*=\s*["']/.test(userCode)) {
            checks.push("✅ Uses string variables");
            score += 20;
        } else {
            checks.push("❌ Missing string variables");
        }
        
        if (/\$\w+\s*=\s*\d+/.test(userCode)) {
            checks.push("✅ Uses numeric variables");
            score += 20;
        } else {
            checks.push("❌ Missing numeric variables");
        }
        
        // Check for arrays
        if (/array\s*\(/.test(userCode) || /\[\s*.*\s*\]/.test(userCode)) {
            checks.push("✅ Creates arrays");
            score += 20;
        } else {
            checks.push("❌ Missing array creation");
        }
        
        // Check for variable output
        if (/echo\s+\$\w+/.test(userCode) || /print\s+\$\w+/.test(userCode)) {
            checks.push("✅ Outputs variables");
            score += 15;
        } else {
            checks.push("❌ Missing variable output");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Excellent PHP variables! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use PHP variables with different data types`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "PHP Variables and Data Types", language: "php"}
    };
}

console.log("✅ Test ready for: PHP Variables and Data Types");