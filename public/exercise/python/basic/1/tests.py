# Test for Variables and Data Types
print("🧪 Testing: Variables and Data Types")

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
        
        # Check for string variable
        has_string = False
        for node in ast.walk(tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        if isinstance(node.value, ast.Str) or isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                            has_string = True
                            break
        if has_string:
            checks.append("✅ Has string variable")
            score += 25
        else:
            checks.append("❌ Missing string variable")
        
        # Check for integer variable
        has_int = False
        for node in ast.walk(tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        if isinstance(node.value, ast.Num) or isinstance(node.value, ast.Constant) and isinstance(node.value.value, int):
                            has_int = True
                            break
        if has_int:
            checks.append("✅ Has integer variable")
            score += 25
        else:
            checks.append("❌ Missing integer variable")
        
        # Check for float variable
        has_float = False
        for node in ast.walk(tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        if isinstance(node.value, ast.Num) or isinstance(node.value, ast.Constant) and isinstance(node.value.value, float):
                            has_float = True
                            break
        if has_float:
            checks.append("✅ Has float variable")
            score += 25
        else:
            checks.append("❌ Missing float variable")
        
        # Check for boolean variable
        has_bool = False
        for node in ast.walk(tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        if isinstance(node.value, ast.NameConstant) or isinstance(node.value, ast.Constant) and isinstance(node.value.value, bool):
                            has_bool = True
                            break
        if has_bool:
            checks.append("✅ Has boolean variable")
            score += 25
        else:
            checks.append("❌ Missing boolean variable")
        
        result["details"] = checks
        result["score"] = min(score, 100)
        result["passed"] = score >= 75
        result["message"] = f"Great! Score: {result['score']}/100" if result["passed"] else f"Score: {result['score']}/100 - Add more variable and data type features"
            
    except Exception as e:
        result["message"] = f"Error: {str(e)}"
    
    return result

exercise_test = {
    "run_tests": run_simple_test,
    "test_config": {"topic": "Variables and Data Types", "language": "python"}
}

print("✅ Test ready for: Variables and Data Types")