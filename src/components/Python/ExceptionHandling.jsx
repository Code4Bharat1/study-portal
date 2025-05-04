import React from 'react';

const ExceptionHandling = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Exception Handling in Python</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Exception handling in Python is a mechanism to catch and handle errors during the execution of a program. It helps maintain the flow of the program even when unexpected situations (exceptions) occur.
        </p>

        {/* Try-Except Block */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Basic try-except Block</h2>
          <p className="mt-4 text-lg text-gray-600">
            Python uses the <code>try</code> and <code>except</code> block to catch and handle exceptions:
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`try:
    result = 10 / 0
except ZeroDivisionError:
    print("You can't divide by zero!")`}
          </pre>
        </div>

        {/* Catching Multiple Exceptions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Handling Multiple Exceptions</h2>
          <p className="mt-4 text-lg text-gray-600">
            You can handle multiple exception types by specifying them in different <code>except</code> blocks:
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ZeroDivisionError:
    print("Division by zero!")
except ValueError:
    print("Invalid input! Enter a number.")`}
          </pre>
        </div>

        {/* Finally Block */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Using finally Block</h2>
          <p className="mt-4 text-lg text-gray-600">
            The <code>finally</code> block is always executed, regardless of whether an exception occurred or not.
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`try:
    file = open("example.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found.")
finally:
    print("Execution completed.")`}
          </pre>
        </div>

        {/* Else Block */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Using else with try-except</h2>
          <p className="mt-4 text-lg text-gray-600">
            The <code>else</code> block runs only if no exceptions are raised:
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`try:
    num = int(input("Enter a number: "))
except ValueError:
    print("That's not a number.")
else:
    print("You entered:", num)`}
          </pre>
        </div>

        {/* Raising Exceptions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Raising Exceptions</h2>
          <p className="mt-4 text-lg text-gray-600">
            You can use the <code>raise</code> keyword to trigger an exception manually:
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`age = -5
if age < 0:
    raise ValueError("Age cannot be negative.")`}
          </pre>
        </div>

        {/* Conclusion */}
        <div className="mt-8">
          <p className="text-lg text-gray-600">
            Exception handling helps make Python programs more robust and error-resistant. It's essential for building reliable applications.
          </p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition">
            Practice Exception Handling &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExceptionHandling;


