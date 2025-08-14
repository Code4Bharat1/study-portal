# Test for Basic Arithmetic Operations
print("🧪 Testing: Basic Arithmetic Operations")

import ast

def run_simple_test(user_code):
    result = {"passed": False, "score": 0, "message": "", "details": []}
    
    try:
        if not user_code or len(user_code.strip()) < 5:
            result["message"] = "Code is empty or too short"
            return result
        
        score = 0
        checks = []
        tree = ast.parse(user_code)
        
        # Check for addition
        has_addition = False
        for node in ast.walk(tree):
            if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Add):
                has_addition = True
                break
        if has_addition:
            checks.append("✅ Has addition operation")
            score += 25
        else:
            checks.append("❌ Missing addition operation")
        
        # Check for subtraction
        has_subtraction = False
        for node in ast.walk(tree):
            if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Sub):
                has_subtraction = True
                break
        if has_subtraction:
            checks.append("✅ Has subtraction operation")
            score += 25
        else:
            checks.append("❌ Missing subtraction operation")
        
        # Check for multiplication
        has_multiplication = False
        for node in ast.walk(tree):
            if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Mult):
                has_multiplication = True
                break
        if has_multiplication:
            checks.append("✅ Has multiplication operation")
            score += 25
        else:
            checks.append("❌ Missing multiplication operation")
        
        # Check for division
        has_division = False
        for node in ast.walk(tree):
            if isinstance(node, ast.BinOp) and isinstance(node.op, (ast.Div, ast.FloorDiv)):
                has_division = True
                break
        if has_division:
            checks.append("✅ Has division operation")
            score += 25
        else:
            checks.append("❌ Missing division operation")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 75
        result["message"] = f"Great! Score: {result['score']}/100" if result["passed"] else f"Score: {result['score']}/100 - Add more arithmetic operations"
            
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

exercise_test = {
    "run_tests": run_simple_test,
    "test_config": {"topic": "Basic Arithmetic Operations", "language": "python"}
}

print("✅ Test ready for: Basic Arithmetic Operations")