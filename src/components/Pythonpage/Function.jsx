import React from 'react';

const Function = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Functions</h1>

        {/* Intro */}
        <p className="mt-4 text-lg text-gray-600">
          A function is a block of code that only runs when it is called. Functions help make code reusable and organized. You can pass data to functions and return data from them.
        </p>

        {/* Defining a Function */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">1. Defining a Function</h2>
          <p className="mt-2 text-lg text-gray-600">Use the <code>def</code> keyword to define a function.</p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`def greet():
    print("Hello, World!")

greet()`}
          </pre>
        </div>

        {/* Function with Parameters */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">2. Function with Parameters</h2>
          <p className="mt-2 text-lg text-gray-600">Functions can accept parameters for dynamic behavior.</p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`def greet(name):
    print("Hello, " + name)

greet("Alice")`}
          </pre>
        </div>

        {/* Return Statement */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">3. Return Statement</h2>
          <p className="mt-2 text-lg text-gray-600">
            Functions can return values using the <code>return</code> statement.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # Output: 8`}
          </pre>
        </div>

        {/* Default Parameters */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">4. Default Parameters</h2>
          <p className="mt-2 text-lg text-gray-600">
            You can set default values for parameters.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`def greet(name="Guest"):
    print("Hello, " + name)

greet()        # Output: Hello, Guest
greet("Emma")  # Output: Hello, Emma`}
          </pre>
        </div>

        {/* Arbitrary Arguments */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">5. Arbitrary Arguments</h2>
          <p className="mt-2 text-lg text-gray-600">
            Use <code>*args</code> for variable number of positional arguments, and <code>**kwargs</code> for keyword arguments.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`def add_numbers(*args):
    return sum(args)

print(add_numbers(1, 2, 3))  # Output: 6`}
          </pre>
        </div>

        {/* Lambda Functions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">6. Lambda Functions</h2>
          <p className="mt-2 text-lg text-gray-600">
            Lambda functions are anonymous functions written in one line.
          </p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`square = lambda x: x ** 2
print(square(4))  # Output: 16`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Practice Python Functions &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Function;
