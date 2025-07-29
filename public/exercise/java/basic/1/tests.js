// Test for Java Basics and Syntax
// JavaScript test that validates Java code

console.log("🧪 Testing: Java Basics and Syntax");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for class declaration
        if (/public\s+class\s+\w+/.test(userCode)) {
            checks.push("✅ Has public class declaration");
            score += 25;
        } else {
            checks.push("❌ Missing public class declaration");
        }
        
        // Check for main method
        if (/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w+\s*\)/.test(userCode)) {
            checks.push("✅ Has main method");
            score += 25;
        } else {
            checks.push("❌ Missing main method");
        }
        
        // Check for System.out.println
        if (/System\.out\.println\s*\(/.test(userCode)) {
            checks.push("✅ Uses System.out.println");
            score += 25;
        } else {
            checks.push("❌ Missing System.out.println");
        }
        
        // Check for variable declaration
        if (/\b(int|String|double|boolean|float|char)\s+\w+\s*=/.test(userCode)) {
            checks.push("✅ Has variable declarations");
            score += 25;
        } else {
            checks.push("❌ Missing variable declarations");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create a Java class with main method and variables`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Java Basics and Syntax", language: "java"}
    };
}

console.log("✅ Test ready for: Java Basics and Syntax");