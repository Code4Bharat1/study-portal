// java/basic/1/tests.java
// Test for Variable Declaration
System.out.println("🧪 Testing: Variable Declaration");

class VariableDeclarationTest {
    public static Object runSimpleTest(String userCode) {
        Result result = new Result(false, 0, "", new String[]{});
        
        try {
            if (userCode == null || userCode.trim().length() < 5) {
                result.message = "Code is empty or too short";
                return result;
            }
            
            int score = 0;
            List<String> checks = new ArrayList<>();
            
            // Check for int declaration
            boolean hasInt = userCode.matches("(?s).*\\bint\\s+\\w+\\s*(=|;).*");
            if (hasInt) {
                checks.add("✅ Has int declaration");
                score += 25;
            } else {
                checks.add("❌ Missing int declaration");
            }
            
            // Check for String declaration
            boolean hasString = userCode.matches("(?s).*\\bString\\s+\\w+\\s*(=|;).*");
            if (hasString) {
                checks.add("✅ Has String declaration");
                score += 25;
            } else {
                checks.add("❌ Missing String declaration");
            }
            
            // Check for variable initialization
            boolean hasInitialization = userCode.matches("(?s).*\\b(int|String)\\s+\\w+\\s*=\\s*[^;]+;.*");
            if (hasInitialization) {
                checks.add("✅ Has variable initialization");
                score += 25;
            } else {
                checks.add("❌ Missing variable initialization");
            }
            
            // Check for multiple variables
            boolean hasMultiple = userCode.matches("(?s).*\\b(int|String)\\s+\\w+\\s*(,\\s*\\w+\\s*)+;.*");
            if (hasMultiple) {
                checks.add("✅ Has multiple variables");
                score += 25;
            } else {
                checks.add("❌ Missing multiple variables");
            }
            
            result.details = checks.toArray(new String[0]);
            result.score = Math.min(score, 100);
            result.passed = score >= 75;
            result.message = result.passed 
                ? "Great! Score: " + result.score + "/100"
                : "Score: " + result.score + "/100 - Add more variable declaration features";
                
        } catch (Exception e) {
            result.message = "Error: " + e.getMessage();
        }
        
        return result;
    }
}

System.out.println("✅ Test ready for: Variable Declaration");
