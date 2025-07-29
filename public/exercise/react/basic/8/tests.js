// Simple Browser-Compatible Test for Hooks (useState, useEffect)
// No external dependencies - works entirely in browser

console.log("🧪 Testing: Hooks (useState, useEffect)");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        
        // JavaScript syntax check
        try {
            new Function(userCode);
            checks.push("✅ Valid syntax");
            score += 30;
        } catch (e) {
            checks.push("❌ Syntax error");
        }
        
        // Basic JavaScript checks
        if (/console\.log\s*\(/.test(userCode)) {
            checks.push("✅ Has console.log");
            score += 30;
        } else {
            checks.push("❌ Missing console.log");
        }
        
        // Topic-specific checks
        const topic = "Hooks (useState, useEffect)".toLowerCase();
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
        testConfig: {topic: "Hooks (useState, useEffect)", language: "react"}
    };
}

console.log("✅ Test ready for: Hooks (useState, useEffect)");