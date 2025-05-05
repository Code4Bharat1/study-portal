import React from "react";

const HomeJava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Java Home</h1>

          {/* Introduction Section */}
          <p className="mt-4 text-lg text-gray-600">
            Java is a high-level, object-oriented programming language that is used to build a wide range of applications, from mobile apps to large enterprise systems. Java follows the "write once, run anywhere" principle, meaning Java code can run on any platform that supports Java without the need for recompilation.
          </p>

          <p className="mt-4 text-lg text-gray-600">
            Java is one of the most popular programming languages in the world, known for its reliability, scalability, and security features. It is used to develop everything from web applications to Android apps.
          </p>

          {/* Java Structure Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Java Program Structure</h2>
            <p className="mt-4 text-lg text-gray-600">
              A Java program typically contains a class with a main method. The main method is the entry point of any Java application. Here's the basic structure of a Java program:
            </p>

            <pre className="p-4 bg-gray-100 text-[#547475] rounded-lg">
              {`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}
            </pre>
          </div>

          {/* Java Data Types Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Java Data Types</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java supports various data types to store different kinds of values. Here are some commonly used data types in Java:
            </p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>int:</strong> Used to store integer values.</li>
              <li><strong>double:</strong> Used to store floating-point values.</li>
              <li><strong>char:</strong> Used to store a single character.</li>
              <li><strong>boolean:</strong> Used to store true or false values.</li>
              <li><strong>String:</strong> Used to store a sequence of characters (strings of text).</li>
            </ul>
          </div>

          {/* Java Syntax Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Java Syntax</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java syntax is quite similar to C++ and other programming languages. Here's a simple example of Java code structure:
            </p>
            <pre className="p-4 bg-gray-100 text-[#547475] rounded-lg">
              {`public class Example {
  public static void main(String[] args) {
    // Display a message to the user
    System.out.println("Hello from Java!");
  }
}`}
            </pre>
          </div>

          {/* Java Control Statements Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Java Control Statements</h2>
            <p className="mt-4 text-lg text-gray-600">
              Control statements are used to control the flow of execution in Java. The most common control statements are:
            </p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>if-else:</strong> Used to make decisions based on conditions.</li>
              <li><strong>switch:</strong> Used to execute one of many code blocks based on a condition.</li>
              <li><strong>for, while, do-while:</strong> Used to create loops to repeat a block of code.</li>
            </ul>
          </div>

          {/* Java Best Practices Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Java Best Practices</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here are some best practices to follow when writing Java code:
            </p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Use meaningful variable and method names:</strong> This improves the readability of the code.</li>
              <li><strong>Follow Java naming conventions:</strong> For example, class names should start with an uppercase letter, and method names should start with a lowercase letter.</li>
              <li><strong>Write modular code:</strong> Break code into smaller, reusable methods and classes to keep things organized.</li>
              <li><strong>Comment your code:</strong> Adding comments improves code readability and helps others understand your logic.</li>
            </ul>
          </div>

          {/* Call to Action */}
          
        </div>
      </div>
    </>
  );
};

export default HomeJava;
