import React from 'react';

const Variable = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Variables</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Variables in Python are used to store data. Unlike some other programming languages, Python does not require
          explicit declaration of the data type. The interpreter automatically infers the type based on the value assigned.
        </p>

        {/* Variable Declaration */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Declaring Variables</h2>
          <p className="mt-4 text-lg text-gray-600">You can assign a value to a variable using the equals sign (<code>=</code>):</p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`name = "Alice"
age = 25
price = 19.99
is_active = True`}
          </pre>
          <p className="mt-4 text-lg text-gray-600">Python is dynamically typed, so you can reassign a variable with a different type:</p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`x = 10      # integer
x = "Ten"    # now a string`}
          </pre>
        </div>

        {/* Naming Rules */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Variable Naming Rules</h2>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li>Variable names are case-sensitive (e.g., <code>age</code> and <code>Age</code> are different).</li>
            <li>Must start with a letter or an underscore (not a number).</li>
            <li>Can only contain letters, numbers, and underscores.</li>
            <li>Cannot use reserved keywords like <code>if</code>, <code>class</code>, or <code>return</code>.</li>
          </ul>
        </div>

        {/* Multiple Assignments */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Multiple Assignments</h2>
          <p className="mt-4 text-lg text-gray-600">You can assign multiple variables in a single line:</p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`a, b, c = 1, 2, 3
x = y = z = "Python"`}
          </pre>
        </div>

        {/* Constants */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Constants</h2>
          <p className="mt-4 text-lg text-gray-600">
            Python does not have built-in constant types. By convention, variables written in all uppercase are treated as constants:
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`PI = 3.14159
MAX_USERS = 100`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Try Writing Your Own Variables &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Variable;
