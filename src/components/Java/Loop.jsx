import React from 'react'

const Loopjava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Loops in Java</h1>

          <p className="mt-4 text-lg text-gray-600">
            In Java, loops are used to execute a block of code repeatedly as long as a certain condition is met. Java supports three main types of loops:
          </p>

          <ul className="list-disc pl-6 mt-4 text-lg text-gray-600">
            <li><strong>for loop</strong></li>
            <li><strong>while loop</strong></li>
            <li><strong>do-while loop</strong></li>
          </ul>

          {/* For Loop */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">1. For Loop</h2>
            <p className="mt-4 text-lg text-gray-600">
              The <code>for</code> loop is used when the number of iterations is known in advance.
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`for (int i = 0; i < 5; i++) {
    System.out.println("i = " + i);
}`}
            </pre>
            <p className="mt-2 text-lg text-gray-600">
              This loop will print values from 0 to 4.
            </p>
          </div>

          {/* While Loop */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">2. While Loop</h2>
            <p className="mt-4 text-lg text-gray-600">
              The <code>while</code> loop is used when the number of iterations is not known and depends on a condition.
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`int i = 0;
while (i < 5) {
    System.out.println("i = " + i);
    i++;
}`}
            </pre>
          </div>

          {/* Do-While Loop */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">3. Do-While Loop</h2>
            <p className="mt-4 text-lg text-gray-600">
              The <code>do-while</code> loop is similar to the while loop, but it guarantees at least one execution of the loop body.
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`int i = 0;
do {
    System.out.println("i = " + i);
    i++;
} while (i < 5);`}
            </pre>
          </div>

          {/* Enhanced For Loop */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">4. Enhanced For Loop (For-Each)</h2>
            <p className="mt-4 text-lg text-gray-600">
              The enhanced <code>for</code> loop (also called the <code>for-each</code> loop) is used to iterate over arrays or collections.
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}`}
            </pre>
          </div>

          {/* Loop Control Statements */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Loop Control Statements</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java provides control statements that change the execution flow inside loops:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-600">
              <li><code>break</code> – exits the loop immediately</li>
              <li><code>continue</code> – skips the current iteration and continues with the next</li>
            </ul>

            <h3 className="mt-4 text-xl font-semibold text-gray-800">Example of break:</h3>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    System.out.println(i);
}`}</pre>

            <h3 className="mt-4 text-xl font-semibold text-gray-800">Example of continue:</h3>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    System.out.println(i);
}`}</pre>
          </div>

          {/* Conclusion */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Conclusion</h2>
            <p className="mt-4 text-lg text-gray-600">
              Loops are a powerful feature in Java that allow repetitive tasks to be automated efficiently. Understanding the correct loop to use in each scenario is crucial for writing clean and effective code.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loopjava
