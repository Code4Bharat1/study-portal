# Page 10 
import json
import time
import os
from pylint.lint import Run
from pylint.reporters.text import TextReporter
from io import StringIO
import ast

# File paths
ATTEMPTS_FILE = 'attempts.json'
RESULT_FILE = 'result.txt'

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

# Structural verification for exception handling
def code_verify():
    all_passed = True
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        print(f'✘ Failed to parse Python code: {e}')
        return False

    try_blocks = 0
    except_blocks = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.Try):
            try_blocks += 1
            except_blocks += len(node.handlers)

    if try_blocks == 0:
        print('✘ No try blocks found')
        all_passed = False
    else:
        print(f'✔ Found {try_blocks} try block(s)')
    if except_blocks == 0:
        print('✘ No except blocks found')
        all_passed = False
    else:
        print(f'✔ Found {except_blocks} except block(s)')

    if all_passed:
        print('\n🎉 Success! Exception handling implementation is correct.')
    else:
        print('\n❗ Exception handling check failed. Please review your Python code.')
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