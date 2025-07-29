# Simple Browser-Compatible Test for Testing and Test-Driven Development
# No external dependencies - works entirely in browser

print("🧪 Testing: Testing and Test-Driven Development")

def run_simple_test(user_code):
    """Simple test that works without external dependencies"""
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        
        # Basic Python checks
        if "print(" in user_code:
            checks.append("✅ Has print statement")
            score += 30
        else:
            checks.append("❌ Missing print statement")
        
        if "=" in user_code and not user_code.count("=") == user_code.count("=="):
            checks.append("✅ Has variable assignment")
            score += 30
        else:
            checks.append("❌ Missing variable assignment")
        
        # Topic-specific checks
        topic_lower = "Testing and Test-Driven Development".lower()
        if "variable" in topic_lower and "=" in user_code:
            checks.append("✅ Topic content found")
            score += 40
        elif "function" in topic_lower and "def " in user_code:
            checks.append("✅ Topic content found")
            score += 40
        elif "loop" in topic_lower and ("for " in user_code or "while " in user_code):
            checks.append("✅ Topic content found")
            score += 40
        elif "class" in topic_lower and "class " in user_code:
            checks.append("✅ Topic content found")
            score += 40
        else:
            checks.append("⚠️ Add topic-specific content")
            score += 20
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 70
        result["message"] = f"Score: {result['score']}/100"
        
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

print("✅ Test ready for: Testing and Test-Driven Development")