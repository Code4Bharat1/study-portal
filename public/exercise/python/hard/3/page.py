# Page 3 
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

# Structural verification for asyncio
def code_verify():
    all_passed = True
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        print(f'✘ Failed to parse Python code: {e}')
        return False

    async_funcs = 0
    await_exprs = 0
    asyncio_calls = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.AsyncFunctionDef):
            async_funcs += 1
        if isinstance(node, ast.Await):
            await_exprs += 1
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute) and node.func.value.id == 'asyncio' and node.func.attr in ['run', 'create_task']:
            asyncio_calls += 1

    if async_funcs == 0:
        print('✘ No async functions found')
        all_passed = False
    else:
        print(f'✔ Found {async_funcs} async function(s)')
    if await_exprs == 0:
        print('✘ No await expressions found')
        all_passed = False
    else:
        print(f'✔ Found {await_exprs} await expression(s)')
    if asyncio_calls == 0:
        print('✘ No asyncio run/task calls found')
        all_passed = False
    else:
        print(f'✔ Found {asyncio_calls} asyncio call(s)')

    if all_passed:
        print('\n🎉 Success! AsyncIO implementation is correct.')
    else:
        print('\n❗ AsyncIO check failed. Please review your Python code.')
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