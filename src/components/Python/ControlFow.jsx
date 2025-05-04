import React from 'react';

const Controlflow = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Control Flow</h1>

        <p className="mt-4 text-lg text-gray-600">
          Control flow in Python determines the order in which code is executed. It includes conditional statements and loops
          that help in decision-making and repeating actions.
        </p>

        {/* Conditional Statements */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">1. Conditional Statements</h2>
          <p className="mt-2 text-lg text-gray-600">Used to execute code based on conditions.</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>if</code> - Executes a block if a condition is true</li>
            <li><code>elif</code> - Executes a block if the previous conditions are false and this one is true</li>
            <li><code>else</code> - Executes a block if all previous conditions are false</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`x = 10

if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")`}
          </pre>
        </div>

        {/* Loops */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">2. Loops</h2>
          <p className="mt-2 text-lg text-gray-600">Used to repeat a block of code multiple times.</p>
          
          {/* For Loop */}
          <h3 className="text-xl font-semibold text-gray-700 mt-4">For Loop</h3>
          <p className="text-lg text-gray-600">Iterates over a sequence (like a list, tuple, or string).</p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`for i in range(5):
    print(i)`}
          </pre>

          {/* While Loop */}
          <h3 className="text-xl font-semibold text-gray-700 mt-6">While Loop</h3>
          <p className="text-lg text-gray-600">Repeats as long as a condition is true.</p>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-2">
{`count = 0
while count < 5:
    print(count)
    count += 1`}
          </pre>
        </div>

        {/* Control Statements */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">3. Loop Control Statements</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>break</code> - Exits the current loop prematurely</li>
            <li><code>continue</code> - Skips the rest of the current iteration and continues with the next</li>
            <li><code>pass</code> - Placeholder that does nothing; used when a statement is syntactically required</li>
          </ul>
          <pre className="bg-gray-100 text-blue-600 p-4 rounded-lg mt-4">
{`for i in range(5):
    if i == 3:
        break
    print(i)`}
          </pre>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition">
            Try Python Control Flow &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controlflow;
