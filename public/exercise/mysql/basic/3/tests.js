// Test for MySQL INSERT and Data Entry
// JavaScript test that validates MySQL INSERT operations

console.log("🧪 Testing: MySQL INSERT and Data Entry");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Remove comments and normalize whitespace
        const cleanCode = userCode.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        
        // Check for INSERT INTO statement
        if (/INSERT\s+INTO\s+/i.test(cleanCode)) {
            checks.push("✅ Uses INSERT INTO statement");
            score += 30;
        } else {
            checks.push("❌ Missing INSERT INTO statement");
        }
        
        // Check for VALUES clause
        if (/VALUES\s*\(/i.test(cleanCode)) {
            checks.push("✅ Includes VALUES clause");
            score += 25;
        } else {
            checks.push("❌ Missing VALUES clause");
        }
        
        // Check for column specification
        if (/INSERT\s+INTO\s+\w+\s*\([^)]+\)\s+VALUES/i.test(cleanCode)) {
            checks.push("✅ Specifies column names in INSERT");
            score += 25;
        } else {
            checks.push("❌ Missing column specification");
        }
        
        // Check for multiple value insertion or proper data types
        const hasMultipleValues = /VALUES\s*\([^)]+\)\s*,\s*\([^)]+\)/i.test(cleanCode);
        const hasStringValues = /'[^']*'|"[^"]*"/.test(cleanCode);
        const hasNumericValues = /\b\d+\b/.test(cleanCode);
        
        if (hasMultipleValues || (hasStringValues && hasNumericValues)) {
            checks.push("✅ Inserts multiple records or mixed data types");
            score += 20;
        } else {
            checks.push("❌ Missing multiple records or varied data types");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        
        if (result.passed) {
            result.message = `Excellent data insertion! Score: ${result.score}/100`;
        } else {
            result.message = `Score: ${result.score}/100 - Use INSERT INTO with VALUES and column names`;
        }
        
    } catch (error) {
        result.message = "Error analyzing MySQL INSERT: " + error.message;
        result.details = ["❌ INSERT analysis failed"];
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "MySQL INSERT and Data Entry", language: "mysql"}
    };
}

console.log("✅ MySQL INSERT test ready for: INSERT and Data Entry");