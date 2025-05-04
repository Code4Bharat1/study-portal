import React from 'react';

const Basicjava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Java Basics</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle). It is designed to be platform-independent, meaning Java programs can run on any device with a Java Virtual Machine (JVM).
          </p>

          {/* Key Features */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Key Features of Java</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Platform Independent:</strong> Java code is compiled into bytecode, which can run on any platform using the JVM.</li>
              <li><strong>Object-Oriented:</strong> Everything in Java is treated as an object (except primitive types).</li>
              <li><strong>Simple & Secure:</strong> Java is easy to learn and has built-in security features.</li>
              <li><strong>Robust:</strong> Java has strong memory management and exception handling features.</li>
              <li><strong>Multithreaded:</strong> Java supports concurrent execution using threads.</li>
            </ul>
          </div>

          {/* Hello World Example */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Basic Java Program</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here's a simple "Hello, World!" Java program:
            </p>
            <pre className="p-4 bg-gray-100 text-[#547475] rounded-lg overflow-auto">
              {`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
            </pre>
          </div>

          {/* Structure Explanation */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Program Structure Explanation</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Class:</strong> Java code is always written inside a class.</li>
              <li><strong>Main Method:</strong> The entry point of any Java program is the <code>main()</code> method.</li>
              <li><strong>System.out.println:</strong> This is used to display output on the console.</li>
            </ul>
          </div>

          {/* Java Compilation Process */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">How Java Code is Compiled</h2>
            <ol className="mt-4 text-lg text-gray-600 list-decimal pl-6">
              <li>Write the Java code and save it as <code>.java</code> file.</li>
              <li>Compile it using <code>javac</code> to generate a <code>.class</code> file (bytecode).</li>
              <li>Run the bytecode using <code>java</code> command which invokes the JVM.</li>
            </ol>
          </div>

          {/* Basic Syntax Rules */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Basic Syntax Rules</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Every statement ends with a semicolon <code>;</code>.</li>
              <li>Code blocks are defined using curly braces <code>{`{ }`}</code>.</li>
              <li>Java is case-sensitive (e.g., <code>System</code> ≠ <code>system</code>).</li>
              <li>Class names should start with uppercase letters by convention.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Continue to Java Data Types &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basicjava;
