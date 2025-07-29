# Test for Python Lists and Basic Methods
# Python test that validates list operations

print("🧪 Testing: Python Lists and Basic Methods")

def run_simple_test(user_code):
    """Test list operations in Python"""
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        
        # Check for list creation
        if "[" in user_code and "]" in user_code:
            checks.append("✅ Creates lists")
            score += 25
        else:
            checks.append("❌ Missing list creation")
        
        # Check for list methods
        list_methods = ["append", "remove", "pop", "insert", "extend", "index", "count"]
        if any(f".{method}(" in user_code for method in list_methods):
            checks.append("✅ Uses list methods (append, remove, pop, etc.)")
            score += 30
        else:
            checks.append("❌ Missing list methods")
        
        # Check for list slicing
        if "[" in user_code and ":" in user_code and "]" in user_code:
            checks.append("✅ Uses list slicing")
            score += 25
        else:
            checks.append("❌ Missing list slicing")
        
        # Check for list iteration
        if "for " in user_code and " in " in user_code:
            checks.append("✅ Iterates through lists")
            score += 20
        else:
            checks.append("❌ Missing list iteration")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 70
        result["message"] = f"Score: {result['score']}/100"
        
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

print("✅ Test ready for: Python Lists and Basic Methods")