import React from 'react';

const Datatype = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Data Types</h1>

        {/* Intro */}
        <p className="mt-4 text-lg text-gray-600">
          In Python, data types are used to classify or categorize the type of value a variable holds. Python has a
          wide variety of built-in data types and supports dynamic typing, meaning you don't need to declare the type.
        </p>

        {/* Primary Data Types */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Basic Built-in Data Types</h2>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li><strong>int</strong>: Integer numbers (e.g., <code>5, -10, 1000</code>)</li>
            <li><strong>float</strong>: Decimal numbers (e.g., <code>3.14, -0.001</code>)</li>
            <li><strong>str</strong>: Strings or sequences of characters (e.g., <code>"Hello"</code>)</li>
            <li><strong>bool</strong>: Boolean values (<code>True</code> or <code>False</code>)</li>
          </ul>

          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg mt-4">
{`x = 10          # int
y = 3.14         # float
name = "Alice"   # str
is_valid = True  # bool`}
          </pre>
        </div>

        {/* Collection Data Types */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Collection Data Types</h2>
          <p className="mt-4 text-lg text-gray-600">Python also supports complex data structures:</p>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li><strong>list</strong>: Ordered, mutable sequence (<code>[1, 2, 3]</code>)</li>
            <li><strong>tuple</strong>: Ordered, immutable sequence (<code>(1, 2, 3)</code>)</li>
            <li><strong>set</strong>: Unordered collection of unique elements (<code>{'{1, 2, 3}'}</code>)</li>
            <li><strong>dict</strong>: Key-value pairs (<code>{"{'name': 'Alice', 'age': 25}"}</code>)</li>
          </ul>

          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg mt-4">
{`fruits = ["apple", "banana", "cherry"]     # list
coordinates = (10.0, 20.0)                 # tuple
unique_ids = {101, 102, 103}              # set
person = {"name": "Alice", "age": 25}     # dict`}
          </pre>
        </div>

        {/* Type Checking */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Checking Data Types</h2>
          <p className="mt-4 text-lg text-gray-600">
            You can check the data type of a variable using the built-in <code>type()</code> function.
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg mt-4">
{`x = 5
print(type(x))  # Output: <class 'int'>`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Explore Data Types in Python &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Datatype;
