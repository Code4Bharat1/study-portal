import React from 'react';

const Operator = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Operators</h1>

        <p className="mt-4 text-lg text-gray-600">
          Operators are special symbols in Python used to perform operations on variables and values. Python has a rich
          set of operators grouped into several categories.
        </p>

        {/* Arithmetic Operators */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">1. Arithmetic Operators</h2>
          <p className="mt-2 text-lg text-gray-600">Used to perform basic mathematical operations.</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>+</code>: Addition</li>
            <li><code>-</code>: Subtraction</li>
            <li><code>*</code>: Multiplication</li>
            <li><code>/</code>: Division</li>
            <li><code>%</code>: Modulus</li>
            <li><code>**</code>: Exponentiation</li>
            <li><code>//</code>: Floor Division</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`x = 10
y = 3

print(x + y)  # 13
print(x ** y) # 1000`}
          </pre>
        </div>

        {/* Comparison Operators */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">2. Comparison Operators</h2>
          <p className="mt-2 text-lg text-gray-600">Compare values and return a Boolean result.</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>==</code>: Equal to</li>
            <li><code>!=</code>: Not equal to</li>
            <li><code>&gt;</code>: Greater than</li>
            <li><code>&lt;</code>: Less than</li>
            <li><code>&gt;=</code>: Greater than or equal to</li>
            <li><code>&lt;=</code>: Less than or equal to</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`a = 5
b = 7

print(a == b)  # False
print(a < b)   # True`}
          </pre>
        </div>

        {/* Logical Operators */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">3. Logical Operators</h2>
          <p className="mt-2 text-lg text-gray-600">Used to combine conditional statements.</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>and</code>: Returns True if both statements are true</li>
            <li><code>or</code>: Returns True if one of the statements is true</li>
            <li><code>not</code>: Reverses the result</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`x = 10
print(x > 5 and x < 20)  # True
print(not(x < 5))        # True`}
          </pre>
        </div>

        {/* Assignment Operators */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">4. Assignment Operators</h2>
          <p className="mt-2 text-lg text-gray-600">Used to assign values to variables.</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>=</code>: Assign</li>
            <li><code>+=</code>: Add and assign</li>
            <li><code>-=</code>: Subtract and assign</li>
            <li><code>*=</code>: Multiply and assign</li>
            <li><code>/=</code>: Divide and assign</li>
            <li><code>%=</code>: Modulus and assign</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`x = 5
x += 3  # Same as x = x + 3
print(x)  # 8`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Practice Python Operators &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Operator;
