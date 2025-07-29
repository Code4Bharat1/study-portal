// Test for MySQL Database and Table Creation
// JavaScript test that validates MySQL DDL commands

console.log("🧪 Testing: MySQL Database and Table Creation");

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
        
        // Check for CREATE DATABASE statement
        if (/CREATE\s+DATABASE\s+/i.test(cleanCode)) {
            checks.push("✅ Creates database with CREATE DATABASE");
            score += 25;
        } else {
            checks.push("❌ Missing CREATE DATABASE statement");
        }
        
        // Check for CREATE TABLE statement
        if (/CREATE\s+TABLE\s+/i.test(cleanCode)) {
            checks.push("✅ Creates table with CREATE TABLE");
            score += 25;
        } else {
            checks.push("❌ Missing CREATE TABLE statement");
        }
        
        // Check for column definitions with data types
        const dataTypes = /\b(INT|INTEGER|VARCHAR|CHAR|TEXT|DATETIME|TIMESTAMP|DATE|DECIMAL|FLOAT|DOUBLE|BOOLEAN)\s*\(\s*\d+\s*\)|\b(INT|INTEGER|TEXT|DATETIME|TIMESTAMP|DATE|BOOLEAN)\b/i;
        if (dataTypes.test(cleanCode)) {
            checks.push("✅ Defines columns with proper data types");
            score += 25;
        } else {
            checks.push("❌ Missing column data type definitions");
        }
        
        // Check for constraints (PRIMARY KEY, NOT NULL, AUTO_INCREMENT)
        const constraints = /PRIMARY\s+KEY|NOT\s+NULL|AUTO_INCREMENT|UNIQUE|DEFAULT/i;
        if (constraints.test(cleanCode)) {
            checks.push("✅ Uses table constraints (PRIMARY KEY, NOT NULL, etc.)");
            score += 25;
        } else {
            checks.push("❌ Missing table constraints");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        
        if (result.passed) {
            result.message = `Great database design! Score: ${result.score}/100`;
        } else {
            result.message = `Score: ${result.score}/100 - Create database and tables with proper structure`;
        }
        
    } catch (error) {
        result.message = "Error analyzing MySQL DDL: " + error.message;
        result.details = ["❌ DDL analysis failed"];
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "MySQL Database and Table Creation", language: "mysql"}
    };
}

console.log("✅ MySQL DDL test ready for: Database and Table Creation");