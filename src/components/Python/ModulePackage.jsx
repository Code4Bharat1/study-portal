import React from 'react';

const ModulePackage = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Modules and Packages in Python</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Python supports modular programming through <strong>modules</strong> and <strong>packages</strong>, making code easier to organize, maintain, and reuse.
        </p>

        {/* Modules */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">1. Python Modules</h2>
          <p className="mt-2 text-lg text-gray-600">
            A module is simply a Python file (.py) that contains functions, variables, or classes. You can import it into other Python files using the <code>import</code> keyword.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`# math_module.py
def add(a, b):
    return a + b`}
          </pre>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`# main.py
import math_module

print(math_module.add(2, 3))  # Output: 5`}
          </pre>
        </div>

        {/* Import variations */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">2. Importing Modules</h2>
          <ul className="list-disc pl-6 mt-2 text-lg text-gray-600">
            <li><code>import module_name</code></li>
            <li><code>from module_name import function_name</code></li>
            <li><code>import module_name as alias</code></li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`from math import sqrt
print(sqrt(16))  # Output: 4.0`}
          </pre>
        </div>

        {/* Built-in Modules */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">3. Built-in Modules</h2>
          <p className="mt-2 text-lg text-gray-600">
            Python includes many built-in modules like <code>math</code>, <code>datetime</code>, <code>os</code>, etc.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`import datetime

now = datetime.datetime.now()
print(now)`}
          </pre>
        </div>

        {/* Packages */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">4. Python Packages</h2>
          <p className="mt-2 text-lg text-gray-600">
            A package is a directory that contains a collection of modules and a special <code>__init__.py</code> file. Packages help organize related modules under a common namespace.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`# Directory structure:
# mypackage/
# ├── __init__.py
# └── math_module.py

# Inside math_module.py
def multiply(a, b):
    return a * b`}
          </pre>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`# Importing from a package
from mypackage import math_module

print(math_module.multiply(4, 5))  # Output: 20`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Explore More Python Modules &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModulePackage;
