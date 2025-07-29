// Test for JavaScript Objects and Arrays
// JavaScript test that validates object and array concepts

console.log("🧪 Testing: JavaScript Objects and Arrays");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for array creation
        if (/\[\s*.*\s*\]/.test(userCode) || /new\s+Array\s*\(/.test(userCode)) {
            checks.push("✅ Creates arrays");
            score += 25;
        } else {
            checks.push("❌ Missing array creation");
        }
        
        // Check for object creation
        if (/\{\s*.*\s*\}/.test(userCode) || /new\s+Object\s*\(/.test(userCode)) {
            checks.push("✅ Creates objects");
            score += 25;
        } else {
            checks.push("❌ Missing object creation");
        }
        
        // Check for array methods
        if (/\.(push|pop|shift|unshift|slice|splice|map|filter|forEach)\s*\(/.test(userCode)) {
            checks.push("✅ Uses array methods");
            score += 25;
        } else {
            checks.push("❌ Missing array methods");
        }
        
        // Check for object property access
        if (/\w+\.\w+/.test(userCode) || /\w+\[['"].*['"]\]/.test(userCode)) {
            checks.push("✅ Accesses object properties");
            score += 25;
        } else {
            checks.push("❌ Missing object property access");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Work with objects and arrays`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "JavaScript Objects and Arrays", language: "javascript"}
    };
}

console.log("✅ Test ready for: JavaScript Objects and Arrays");