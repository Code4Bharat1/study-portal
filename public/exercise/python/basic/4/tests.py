# Test for Python Conditional Statements
# Python test that validates conditional logic

print("🧪 Testing: Python Conditional Statements")

def run_simple_test(user_code):
    """Test conditional statements in Python"""
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        
        # Check for if statement
        if "if " in user_code and ":" in user_code:
            checks.append("✅ Has if statement")
            score += 25
        else:
            checks.append("❌ Missing if statement")
        
        # Check for elif statement
        if "elif " in user_code:
            checks.append("✅ Has elif statement")
            score += 25
        else:
            checks.append("❌ Missing elif statement")
        
        # Check for else statement
        if "else:" in user_code:
            checks.append("✅ Has else statement")
            score += 25
        else:
            checks.append("❌ Missing else statement")
        
        # Check for comparison operators
        if any(op in user_code for op in ["==", "!=", "<", ">", "<=", ">="]):
            checks.append("✅ Uses comparison operators")
            score += 25
        else:
            checks.append("❌ Missing comparison operators")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 70
        result["message"] = f"Score: {result['score']}/100"
        
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

print("✅ Test ready for: Python Conditional Statements")