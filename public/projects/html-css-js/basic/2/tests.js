// Test for Styled Blog Post Project - Basic Level 2 (Single HTML File)
// Tests HTML structure, embedded CSS styling, and embedded JavaScript functionality

console.log("🧪 Testing: Styled Blog Post Project (Single HTML File)");

function runProjectTests(htmlContent) {
    const result = {
        passed: false,
        score: 0,
        message: "",
        details: [],
        breakdown: {
            html: 0,
            css: 0,
            js: 0,
        },
    };

    try {
        let totalScore = 0;
        const checks = [];

        if (!htmlContent) {
            result.message = "No HTML content provided";
            return result;
        }

        // Extract CSS content from <style> tags
        const styleMatches = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
        const cssContent = styleMatches ? styleMatches.join(" ") : "";

        // Extract JavaScript content from <script> tags
        const scriptMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
        const jsContent = scriptMatches ? scriptMatches.join(" ") : "";

        console.log("Extracted CSS:", cssContent ? "Found" : "Not found");
        console.log("Extracted JS:", jsContent ? "Found" : "Not found");

        // HTML Tests (40 points total)
        let htmlScore = 0;

        if (/<h1[\s>]/.test(htmlContent)) {
            checks.push("✅ HTML: Has main title (h1)");
            htmlScore += 10;
        } else {
            checks.push("❌ HTML: Missing main title (h1)");
        }

        if (/<h[2-6][\s>]/.test(htmlContent)) {
            checks.push("✅ HTML: Has subheadings (h2-h6)");
            htmlScore += 10;
        } else {
            checks.push("❌ HTML: Missing subheadings (h2-h6)");
        }

        if (/<p[\s>]/.test(htmlContent)) {
            checks.push("✅ HTML: Has paragraphs");
            htmlScore += 10;
        } else {
            checks.push("❌ HTML: Missing paragraphs");
        }

        if (/<img\s/.test(htmlContent)) {
            checks.push("✅ HTML: Has image");
            htmlScore += 10;
        } else {
            checks.push("❌ HTML: Missing image");
        }

        // CSS Tests (30 points total)
        let cssScore = 0;

        if (cssContent && /h1\s*\{[\s\S]*text-align\s*:\s*center/.test(cssContent)) {
            checks.push("✅ CSS: Title is centered");
            cssScore += 10;
        } else {
            checks.push("❌ CSS: Title not centered in <style> tags");
        }

        if (cssContent && /margin/.test(cssContent)) {
            checks.push("✅ CSS: Uses margins");
            cssScore += 10;
        } else {
            checks.push("❌ CSS: Missing margin styling in <style> tags");
        }

        if (cssContent && /\.dark-mode/.test(cssContent)) {
            checks.push("✅ CSS: Has dark mode styles");
            cssScore += 10;
        } else {
            checks.push("❌ CSS: Missing dark mode styles in <style> tags");
        }

        // JavaScript Tests (30 points total)
        let jsScore = 0;

        if (jsContent && /classList\.toggle|classList\.add|classList\.remove/.test(jsContent)) {
            checks.push("✅ JS: Uses classList manipulation");
            jsScore += 15;
        } else {
            checks.push("❌ JS: Missing classList manipulation in <script> tags");
        }

        if (jsContent && /dark.*mode|toggle/i.test(jsContent)) {
            checks.push("✅ JS: Implements theme toggle");
            jsScore += 15;
        } else {
            checks.push("❌ JS: Missing theme toggle functionality in <script> tags");
        }

        // Additional checks for single HTML file structure
        if (htmlContent.includes('<style>') || htmlContent.includes('<style ')) {
            checks.push("✅ Structure: Has embedded <style> tags");
        } else {
            checks.push("❌ Structure: Missing <style> tags for CSS");
        }

        if (htmlContent.includes('<script>') || htmlContent.includes('<script ')) {
            checks.push("✅ Structure: Has embedded <script> tags");
        } else {
            checks.push("❌ Structure: Missing <script> tags for JavaScript");
        }

        // Calculate scores
        result.breakdown.html = Math.min(htmlScore, 40);
        result.breakdown.css = Math.min(cssScore, 30);
        result.breakdown.js = Math.min(jsScore, 30);

        totalScore = result.breakdown.html + result.breakdown.css + result.breakdown.js;

        result.details = checks;
        result.score = Math.min(totalScore, 100);
        result.passed = result.score >= 70;
        result.message = result.passed
            ? `Great! Blog post with dark mode ready. Score: ${result.score}/100`
            : `Score: ${result.score}/100 - Add blog structure, center title, margins, and dark mode toggle`;
    } catch (error) {
        result.message = "Error: " + error.message;
        console.error("Test error:", error);
    }

    return result;
}

// Export for Monaco Editor
if (typeof window !== "undefined") {
    window.exerciseTest = {
        runTests: runProjectTests,
        testConfig: {
            topic: "Styled Blog Post Project (Single HTML File)",
            language: "html",
            type: "project",
            fileStructure: "single"
        }
    };
}

console.log("✅ Test ready for: Styled Blog Post Project (Single HTML File)");