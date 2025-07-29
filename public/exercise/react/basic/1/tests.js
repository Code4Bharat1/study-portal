// Test for React Components and JSX
// JavaScript test that validates React component concepts

console.log("🧪 Testing: React Components and JSX");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for React import
        if (/import\s+React/.test(userCode)) {
            checks.push("✅ Imports React");
            score += 20;
        } else {
            checks.push("❌ Missing React import");
        }
        
        // Check for function component
        if (/function\s+\w+\s*\(/.test(userCode) || /const\s+\w+\s*=\s*\(/.test(userCode)) {
            checks.push("✅ Creates function component");
            score += 25;
        } else {
            checks.push("❌ Missing function component");
        }
        
        // Check for JSX return
        if (/return\s*\(/.test(userCode) || /return\s*</.test(userCode)) {
            checks.push("✅ Returns JSX");
            score += 30;
        } else {
            checks.push("❌ Missing JSX return");
        }
        
        // Check for export default
        if (/export\s+default/.test(userCode)) {
            checks.push("✅ Exports component");
            score += 25;
        } else {
            checks.push("❌ Missing export default");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create React component with JSX`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "React Components and JSX", language: "react"}
    };
}

console.log("✅ Test ready for: React Components and JSX");