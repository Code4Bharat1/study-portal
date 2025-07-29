// Test for Java Data Types and Variables
// JavaScript test that validates Java code

console.log("🧪 Testing: Java Data Types and Variables");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for primitive data types
        if (/\b(int|double|float|boolean|char|byte|short|long)\s+\w+/.test(userCode)) {
            checks.push("✅ Uses primitive data types");
            score += 25;
        } else {
            checks.push("❌ Missing primitive data types");
        }
        
        // Check for String variables
        if (/String\s+\w+/.test(userCode)) {
            checks.push("✅ Uses String variables");
            score += 25;
        } else {
            checks.push("❌ Missing String variables");
        }
        
        // Check for variable initialization
        if (/\w+\s*=\s*[^=]/.test(userCode)) {
            checks.push("✅ Initializes variables");
            score += 25;
        } else {
            checks.push("❌ Missing variable initialization");
        }
        
        // Check for System.out.println usage
        if (/System\.out\.println\s*\(/.test(userCode)) {
            checks.push("✅ Uses System.out.println");
            score += 25;
        } else {
            checks.push("❌ Missing System.out.println");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Use different data types and initialize variables`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Java Data Types and Variables", language: "java"}
    };
}

console.log("✅ Test ready for: Java Data Types and Variables");