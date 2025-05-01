import React from 'react';

const ControlStatementJava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Java Control Statements</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            Control statements in Java are used to control the flow of execution in a program. They allow you to make decisions, repeat tasks, or jump to different parts of the code based on certain conditions.
          </p>

          {/* Types of Control Statements */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Control Statements</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Decision-making Statements:</strong> <code>if</code>, <code>if-else</code>, <code>switch</code></li>
              <li><strong>Looping Statements:</strong> <code>for</code>, <code>while</code>, <code>do-while</code></li>
              <li><strong>Jump Statements:</strong> <code>break</code>, <code>continue</code>, <code>return</code></li>
            </ul>
          </div>

          {/* Decision-making */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">1. Decision-Making Statements</h2>
            <p className="mt-4 text-lg text-gray-600">
              These statements help the program make decisions based on conditions.
            </p>

            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`int num = 10;
if (num > 0) {
    System.out.println("Positive number");
} else {
    System.out.println("Non-positive number");
}`}
            </pre>

            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`int day = 3;
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Another day");
}`}
            </pre>
          </div>

          {/* Looping Statements */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">2. Looping Statements</h2>
            <p className="mt-4 text-lg text-gray-600">
              Looping statements are used when you want to execute a block of code repeatedly.
            </p>

            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>for loop:</strong> Used when the number of iterations is known.</li>
              <li><strong>while loop:</strong> Used when the number of iterations is not known in advance.</li>
              <li><strong>do-while loop:</strong> Executes the block at least once before checking the condition.</li>
            </ul>

            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`for (int i = 0; i < 5; i++) {
    System.out.println("Value: " + i);
}`}
            </pre>
          </div>

          {/* Jump Statements */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">3. Jump Statements</h2>
            <p className="mt-4 text-lg text-gray-600">
              Jump statements are used to transfer control to other parts of the program.
            </p>

            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>break:</strong> Exits the loop or switch statement.</li>
              <li><strong>continue:</strong> Skips the current iteration and continues with the next one.</li>
              <li><strong>return:</strong> Exits from the current method and optionally returns a value.</li>
            </ul>

            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    System.out.println(i);
}`}
            </pre>
          </div>

          {/* Best Practices */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use proper indentation for better readability.</li>
              <li>Avoid deeply nested <code>if-else</code> blocks—consider using <code>switch</code> when appropriate.</li>
              <li>Use <code>break</code> and <code>continue</code> judiciously to avoid confusing flow.</li>
              <li>Always ensure your loop termination conditions are reachable to avoid infinite loops.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Next: Learn Java Arrays &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlStatementJava;
