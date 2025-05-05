import React from 'react';

const ExceptionHandling = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Exception Handling in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Exception Handling</strong> in Java is a powerful mechanism to handle runtime errors, allowing the normal flow of the application to be maintained. Java provides a robust and object-oriented way to handle both checked and unchecked exceptions using the <code>try</code>, <code>catch</code>, <code>finally</code>, <code>throw</code>, and <code>throws</code> keywords.
          </p>

          {/* Why Exception Handling */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why Exception Handling?</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>To prevent abrupt termination of the program</li>
              <li>To separate error-handling code from regular code</li>
              <li>To provide meaningful messages to the user</li>
              <li>To handle unexpected situations gracefully</li>
            </ul>
          </div>

          {/* Types of Exceptions */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Exceptions</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Checked Exceptions:</strong> Known at compile time (e.g., IOException, SQLException)</li>
              <li><strong>Unchecked Exceptions:</strong> Known at runtime (e.g., NullPointerException, ArithmeticException)</li>
              <li><strong>Error:</strong> Serious problems not intended to be caught (e.g., OutOfMemoryError)</li>
            </ul>
          </div>

          {/* Try-Catch Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Try-Catch Example</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java handles exceptions using the <code>try</code> and <code>catch</code> blocks:
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public class Example {
  public static void main(String[] args) {
    try {
      int result = 10 / 0;
      System.out.println("Result: " + result);
    } catch (ArithmeticException e) {
      System.out.println("Error: Division by zero is not allowed.");
    }
  }
}`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              In this example, dividing by zero causes an <code>ArithmeticException</code>, which is caught by the <code>catch</code> block.
            </p>
          </div>

          {/* Finally Block */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Finally Block</h2>
            <p className="mt-4 text-lg text-gray-600">
              The <code>finally</code> block is used to execute important code such as closing resources. It runs whether or not an exception occurs.
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`try {
  int[] arr = new int[2];
  arr[3] = 10;
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("Index out of bounds!");
} finally {
  System.out.println("Finally block executed.");
}`}
            </pre>
          </div>

          {/* Throw and Throws */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">throw and throws</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><code>throw</code> is used to explicitly throw an exception.</li>
              <li><code>throws</code> is used to declare exceptions in method signatures.</li>
            </ul>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public void checkAge(int age) throws ArithmeticException {
  if (age < 18) {
    throw new ArithmeticException("Not eligible to vote");
  } else {
    System.out.println("Eligible to vote");
  }
}`}
            </pre>
          </div>

          {/* Best Practices */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Catch specific exceptions instead of generic ones</li>
              <li>Use <code>finally</code> for resource cleanup</li>
              <li>Don’t ignore exceptions (avoid empty catch blocks)</li>
              <li>Log exceptions properly for debugging</li>
            </ul>
          </div>

          {/* CTA */}
         
        </div>
      </div>
    </>
  );
};

export default ExceptionHandling;
