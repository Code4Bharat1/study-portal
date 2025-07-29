// Test for Next.js Pages and Routing
// JavaScript test that validates Next.js code

console.log("🧪 Testing: Next.js Pages and Routing");

function runSimpleTest(userCode) {
    const result = {passed: false, score: 0, message: "", details: []};
    
    try {
        if (!userCode || userCode.trim().length < 5) {
            result.message = "Code is empty or too short";
            return result;
        }
        
        let score = 0;
        const checks = [];
        
        // Check for export default
        if (/export\s+default/.test(userCode)) {
            checks.push("✅ Has default export");
            score += 25;
        } else {
            checks.push("❌ Missing default export");
        }
        
        // Check for function component
        if (/function\s+\w+\s*\(/.test(userCode) || /const\s+\w+\s*=\s*\(/.test(userCode)) {
            checks.push("✅ Has function component");
            score += 25;
        } else {
            checks.push("❌ Missing function component");
        }
        
        // Check for JSX return
        if (/return\s*\(/.test(userCode) || /return\s*</.test(userCode)) {
            checks.push("✅ Returns JSX");
            score += 25;
        } else {
            checks.push("❌ Missing JSX return");
        }
        
        // Check for Next.js specific patterns
        if (/getStaticProps|getServerSideProps|getStaticPaths/.test(userCode) || /export\s+default\s+function/.test(userCode)) {
            checks.push("✅ Uses Next.js patterns");
            score += 25;
        } else {
            checks.push("❌ Missing Next.js specific patterns");
        }
        
        result.details = checks;
        result.score = Math.min(score, 100);
        result.passed = score >= 70;
        result.message = result.passed ? 
            `Great! Score: ${result.score}/100` : 
            `Score: ${result.score}/100 - Create Next.js page component`;
        
    } catch (error) {
        result.message = "Error: " + error.message;
    }
    
    return result;
}

// Export for Monaco Editor
if (typeof window !== 'undefined') {
    window.exerciseTest = {
        runTests: runSimpleTest,
        testConfig: {topic: "Next.js Pages and Routing", language: "nextjs"}
    };
}

console.log("✅ Test ready for: Next.js Pages and Routing");