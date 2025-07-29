// Simple Browser-Compatible Test for Table Creation and Schema
// No external dependencies - works entirely in browser

console.log("🧪 Testing: Table Creation and Schema");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        
        // Basic code checks
        if (userCode.trim().length > 10) {
            checks.push("✅ Has content");
            score += 30;
        } else {
            checks.push("❌ Too short");
        }
        
        if (userCode.split('\n').length >= 3) {
            checks.push("✅ Multi-line code");
            score += 30;
        } else {
            checks.push("❌ Add more lines");
        }
        
        // Topic-specific checks
        const topic = "Table Creation and Schema".toLowerCase();
        if (topic.includes("variable") && /\w+\s*=/.test(userCode)) {
            checks.push("✅ Topic content found");
            score += 40;
        } else if (topic.includes("function") && /function\s+\w+/.test(userCode)) {
            checks.push("✅ Topic content found");
            score += 40;
        } else if (topic.includes("loop") && /(for|while)\s*\(/.test(userCode)) {
            checks.push("✅ Topic content found");
            score += 40;
        } else if (topic.includes("array") && /\[.*\]/.test(userCode)) {
            checks.push("✅ Topic content found");
            score += 40;
        } else {
            checks.push("⚠️ Add topic-specific content");
            score += 20;
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = `Score: ${result.score}/100`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Table Creation and Schema", language: "sql"}
    };
}

console.log("✅ Test ready for: Table Creation and Schema");