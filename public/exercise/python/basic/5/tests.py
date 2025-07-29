# Test for Python Loops and Iteration
# Python test that validates loop concepts

print("🧪 Testing: Python Loops and Iteration")

def run_simple_test(user_code):
    """Test loops and iteration in Python"""
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        
        # Check for for loop
        if "for " in user_code and " in " in user_code:
            checks.append("✅ Has for loop")
            score += 30
        else:
            checks.append("❌ Missing for loop")
        
        # Check for while loop
        if "while " in user_code and ":" in user_code:
            checks.append("✅ Has while loop")
            score += 25
        else:
            checks.append("❌ Missing while loop")
        
        # Check for range function
        if "range(" in user_code:
            checks.append("✅ Uses range function")
            score += 20
        else:
            checks.append("❌ Missing range function")
        
        # Check for list comprehension
        if "[" in user_code and "for " in user_code and "]" in user_code:
            checks.append("✅ Uses list comprehension")
            score += 25
        else:
            checks.append("❌ Missing list comprehension")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 70
        result["message"] = f"Score: {result['score']}/100"
        
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

print("✅ Test ready for: Python Loops and Iteration")