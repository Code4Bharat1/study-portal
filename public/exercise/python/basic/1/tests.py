# Page 1 
import json
import time
import os
from pylint.lint import Run
from pylint.reporters.text import TextReporter
from io import StringIO
import ast

# File paths
ATTEMPTS_FILE = 'attempts.json'
RESULT_FILE = 'results.tests'

# Read Python code
with open('script.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Helper: Read attempts (default to 1)
def read_attempts():
    if os.path.exists(ATTEMPTS_FILE):
        try:
            with open(ATTEMPTS_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('count', 1) if data.get('count', 0) >= 1 else 1
        except (json.JSONDecodeError, KeyError):
            print('Error parsing attempts.json. Resetting counter.')
            return 1
    return 1

# Helper: Write attempts
def write_attempts(count):
    try:
        with open(ATTEMPTS_FILE, 'w', encoding='utf-8') as f:
            json.dump({'count': count}, f, indent=2)
    except OSError as e:
        print(f'Failed to write to {ATTEMPTS_FILE}: {e}')

# Syntax verification using pylint
def syntax_verify():
    output = StringIO()
    reporter = TextReporter(output)
    try:
        Run(['script.py', '--disable=all', '--enable=syntax-error,undefined-variable'], reporter=reporter, do_exit=False)
        output.seek(0)
        errors = output.read()
        if 'error' not in errors.lower():
            print('✔ Python syntax is valid.')
            return True
        else:
            print('❌ Python syntax is not valid:')
            print(errors)
            return False
    except Exception as e:
        print(f'✘ Pylint failed: {e}')
        return False
    finally:
        output.close()

# Structural verification for variables and data types
def code_verify():
    all_passed = True
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        print(f'✘ Failed to parse Python code: {e}')
        return False

    int_vars = 0
    float_vars = 0
    str_vars = 0
    bool_vars = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name):
                    if isinstance(node.value, ast.Num) and isinstance(node.value.n, int):
                        int_vars += 1
                    elif isinstance(node.value, ast.Num) and isinstance(node.value.n, float):
                        float_vars += 1
                    elif isinstance(node.value, ast.Str):
                        str_vars += 1
                    elif isinstance(node.value, ast.NameConstant) and isinstance(node.value.value, bool):
                        bool_vars += 1

    if int_vars == 0:
        print('✘ No integer variables found')
        all_passed = False
    else:
        print(f'✔ Found {int_vars} integer variable(s)')
    if float_vars == 0:
        print('✘ No float variables found')
        all_passed = False
    else:
        print(f'✔ Found {float_vars} float variable(s)')
    if str_vars == 0:
        print('✘ No string variables found')
        all_passed = False
    else:
        print(f'✔ Found {str_vars} string variable(s)')
    if bool_vars == 0:
        print('✘ No boolean variables found')
        all_passed = False
    else:
        print(f'✔ Found {bool_vars} boolean variable(s)')

    if all_passed:
        print('\n🎉 Success! Variables and data types implementation is correct.')
    else:
        print('\n❗ Variables and data types check failed. Please review your Python code.')
    return all_passed

# Main execution
if __name__ == '__main__':
    start_time = time.time()
    syntax_passed = syntax_verify()
    structure_passed = code_verify()
    all_passed = syntax_passed and structure_passed

    execution_time = round(time.time() - start_time, 3)
    lines_of_code = len([line for line in code.split('\n') if line.strip()])

    attempts = read_attempts()
    if all_passed:
        result_data = {
            'attempts': attempts,
            'linesOfCode': lines_of_code,
            'executionTime': execution_time,
            'syntaxCheckPassed': syntax_passed,
            'structureCheckPassed': structure_passed,
            'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S')
        }
        try:
            with open(RESULT_FILE, 'w', encoding='utf-8') as f:
                json.dump(result_data, f, indent=2)
            print(f'\n✅ All tests passed. Results saved to {RESULT_FILE}.')
        except OSError as e:
            print(f'Failed to write to {RESULT_FILE}: {e}')
        exit(0)
    else:
        attempts += 1
        write_attempts(attempts)
        print(f'\n❌ One or more tests failed. Attempt #{attempts} recorded.')
        exit(1)