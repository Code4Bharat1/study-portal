import React from 'react';

const Methodjava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Methods in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            A method in Java is a block of code that performs a specific task. Methods help in modularizing code, enhancing readability, and promoting code reuse. Every Java program contains at least one method — the <code>main()</code> method.
          </p>

          {/* Syntax */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Syntax of a Method</h2>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`returnType methodName(parameters) {
    // body of the method
}`}
            </pre>
          </div>

          {/* Example */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Example</h2>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public class Example {

    // Method to add two numbers
    int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Example obj = new Example();
        int result = obj.add(5, 3);
        System.out.println("Sum: " + result);
    }
}`}
            </pre>
          </div>

          {/* Types of Methods */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Methods</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Predefined Methods:</strong> Provided by Java, e.g., <code>System.out.println()</code>.</li>
              <li><strong>User-defined Methods:</strong> Created by the programmer for custom functionality.</li>
            </ul>
          </div>

          {/* Static vs Non-static */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Static vs Non-static Methods</h2>
            <p className="mt-4 text-lg text-gray-600">
              A <strong>static method</strong> belongs to the class and can be called without creating an object, whereas a <strong>non-static method</strong> belongs to an object and requires object instantiation.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public class Demo {

    static void staticMethod() {
        System.out.println("Static method");
    }

    void nonStaticMethod() {
        System.out.println("Non-static method");
    }

    public static void main(String[] args) {
        staticMethod(); // No object needed

        Demo obj = new Demo();
        obj.nonStaticMethod(); // Object required
    }
}`}
            </pre>
          </div>

          {/* Method Overloading */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Method Overloading</h2>
            <p className="mt-4 text-lg text-gray-600">
              Method overloading allows multiple methods to have the same name with different parameters (type, number, or order).
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public class Overload {

    void display() {
        System.out.println("No parameters");
    }

    void display(String msg) {
        System.out.println("Message: " + msg);
    }

    public static void main(String[] args) {
        Overload obj = new Overload();
        obj.display();
        obj.display("Hello");
    }
}`}
            </pre>
          </div>

          {/* Best Practices */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use descriptive names for methods to clearly indicate their purpose.</li>
              <li>Keep methods short and focused on a single task (Single Responsibility Principle).</li>
              <li>Avoid deep nesting and repetitive code — reuse methods when possible.</li>
              <li>Use method overloading wisely to improve code readability and usability.</li>
            </ul>
          </div>

          {/* Call to Action */}
         
        </div>
      </div>
    </>
  );
};

export default Methodjava;
