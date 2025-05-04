import React from "react";

const BasicPython = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Basics</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Python is a high-level, interpreted programming language known for its simplicity and readability.
          It supports multiple programming paradigms and is widely used in web development, data analysis,
          artificial intelligence, automation, and more.
        </p>

        {/* Hello World */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">1. Your First Python Program</h2>
          <p className="mt-4 text-lg text-gray-600">Let’s start with a simple print statement:</p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`print("Hello, World!")`}
          </pre>
        </div>

        {/* Variables */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">2. Variables and Data Types</h2>
          <p className="mt-4 text-lg text-gray-600">
            Variables are used to store data. Python is dynamically typed, so you don’t need to declare a type.
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`name = "Alice"
age = 30
height = 5.5
is_student = True`}
          </pre>
        </div>

        {/* Control Flow */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">3. Conditional Statements</h2>
          <p className="mt-4 text-lg text-gray-600">
            Python uses indentation to define blocks of code:
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`if age > 18:
  print("Adult")
else:
  print("Minor")`}
          </pre>
        </div>

        {/* Loops */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">4. Loops</h2>
          <p className="mt-4 text-lg text-gray-600">Python supports both for-loops and while-loops:</p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`for i in range(5):
  print(i)

count = 0
while count < 5:
  print(count)
  count += 1`}
          </pre>
        </div>

        {/* Functions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">5. Functions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Functions are defined using the <code>def</code> keyword:
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`def greet(name):
  print("Hello, " + name)

greet("Alice")`}
          </pre>
        </div>

        {/* Lists */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">6. Lists</h2>
          <p className="mt-4 text-lg text-gray-600">
            Lists are ordered collections that can hold a variety of data types:
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple
fruits.append("orange")`}
          </pre>
        </div>

        {/* Final Note */}
        <div className="mt-8">
          <p className="text-lg text-gray-600">
            These basics lay the foundation for writing more advanced Python code. Continue practicing by writing
            small programs and solving problems.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Practice with Python Exercises &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicPython;
