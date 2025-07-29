// Test for MySQL Basics and Connection
// JavaScript test that validates MySQL-specific code

console.log("🧪 Testing: MySQL Basics and Connection");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Remove comments and normalize whitespace for better analysis
        const cleanCode = userCode.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        
        // Check for SELECT statement (case insensitive)
        if (/SELECT\s+/i.test(cleanCode)) {
            checks.push("✅ Contains SELECT statement");
            score += 25;
        } else {
            checks.push("❌ Missing SELECT statement");
        }
        
        // Check for MySQL-specific commands
        const mysqlCommands = /SHOW\s+(DATABASES|TABLES|COLUMNS)|USE\s+\w+|CREATE\s+(DATABASE|TABLE)|DESCRIBE\s+\w+/i;
        if (mysqlCommands.test(cleanCode)) {
            checks.push("✅ Uses MySQL-specific commands (SHOW, USE, CREATE, DESCRIBE)");
            score += 30;
        } else {
            checks.push("❌ Missing MySQL-specific commands");
        }
        
        // Check for proper SQL statement termination
        if (/;\s*$/m.test(cleanCode)) {
            checks.push("✅ Properly terminates statements with semicolon");
            score += 20;
        } else {
            checks.push("❌ Missing semicolon statement terminators");
        }
        
        // Check for MySQL data types or table structure elements
        const mysqlTypes = /\b(INT|INTEGER|VARCHAR|CHAR|TEXT|DATETIME|TIMESTAMP|DATE|TIME|DECIMAL|FLOAT|DOUBLE|BOOLEAN|BOOL|AUTO_INCREMENT|PRIMARY\s+KEY|FOREIGN\s+KEY|NOT\s+NULL|DEFAULT)\b/i;
        if (mysqlTypes.test(cleanCode)) {
            checks.push("✅ Uses MySQL data types or constraints");
            score += 25;
        } else {
            checks.push("❌ Missing MySQL data types or table constraints");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        
        if (result.passed) {
            result.message = `Excellent MySQL code! Score: ${result.score}/100`;
        } else {
            result.message = `Score: ${result.score}/100 - Write MySQL queries with proper syntax and commands`;
        }
        
    } catch (error) {
        result.message = "Error analyzing MySQL code: " + error.message;
        result.details = ["❌ Code analysis failed"];
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "MySQL Basics and Connection", language: "mysql"}
    };
}

console.log("✅ MySQL-specific test ready for: MySQL Basics and Connection");