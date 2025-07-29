# Test for Python Dictionaries and Sets
# Python test that validates dictionary and set operations

print("🧪 Testing: Python Dictionaries and Sets")

def run_simple_test(user_code):
    """Test dictionaries and sets in Python"""
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        
        # Check for dictionary creation
        if "{" in user_code and "}" in user_code and ":" in user_code:
            checks.append("✅ Creates dictionaries")
            score += 25
        else:
            checks.append("❌ Missing dictionary creation")
        
        # Check for dictionary methods
        dict_methods = ["keys", "values", "items", "get", "pop", "update"]
        if any(f".{method}(" in user_code for method in dict_methods):
            checks.append("✅ Uses dictionary methods")
            score += 25
        else:
            checks.append("❌ Missing dictionary methods")
        
        # Check for set creation
        if "set(" in user_code or ("{" in user_code and "}" in user_code and ":" not in user_code):
            checks.append("✅ Creates sets")
            score += 25
        else:
            checks.append("❌ Missing set creation")
        
        # Check for set operations
        set_methods = ["add", "remove", "discard", "union", "intersection", "difference"]
        if any(f".{method}(" in user_code for method in set_methods):
            checks.append("✅ Uses set operations")
            score += 25
        else:
            checks.append("❌ Missing set operations")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 70
        result["message"] = f"Score: {result['score']}/100"
        
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

print("✅ Test ready for: Python Dictionaries and Sets")