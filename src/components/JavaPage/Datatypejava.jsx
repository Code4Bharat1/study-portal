import React from 'react';

const Datatypejava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Java Data Types</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            Data types in Java specify the type of data that a variable can hold. Java is a strongly typed language, which means every variable must be declared with a data type.
          </p>

          {/* Categories of Data Types */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Data Types in Java</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Primitive Data Types:</strong> Built-in types in Java (8 total).</li>
              <li><strong>Non-Primitive Data Types:</strong> Includes classes, arrays, and interfaces.</li>
            </ul>
          </div>

          {/* Primitive Data Types */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Primitive Data Types</h2>
            <p className="mt-4 text-lg text-gray-600">Java has 8 primitive data types:</p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>byte:</strong> 1 byte, range: -128 to 127</li>
              <li><strong>short:</strong> 2 bytes, range: -32,768 to 32,767</li>
              <li><strong>int:</strong> 4 bytes, range: -2^31 to 2^31-1</li>
              <li><strong>long:</strong> 8 bytes, range: -2^63 to 2^63-1</li>
              <li><strong>float:</strong> 4 bytes, single-precision 32-bit IEEE 754</li>
              <li><strong>double:</strong> 8 bytes, double-precision 64-bit IEEE 754</li>
              <li><strong>char:</strong> 2 bytes, stores a single character/letter or ASCII values</li>
              <li><strong>boolean:</strong> 1 bit, stores <code>true</code> or <code>false</code></li>
            </ul>
          </div>

          {/* Non-Primitive Data Types */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Non-Primitive Data Types</h2>
            <p className="mt-4 text-lg text-gray-600">
              These are created by the programmer and include:
            </p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>String</strong></li>
              <li><strong>Arrays</strong></li>
              <li><strong>Classes</strong></li>
              <li><strong>Interfaces</strong></li>
            </ul>
          </div>

          {/* Example Code */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Example Code</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here's an example that shows how to use different data types in Java:
            </p>
            <pre className="p-4 bg-gray-100 text-[#547475] rounded-lg overflow-auto">
{`public class DataTypeExample {
    public static void main(String[] args) {
        int age = 25;
        float weight = 65.5f;
        double height = 175.5;
        char grade = 'A';
        boolean isJavaFun = true;
        String name = "John";

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Weight: " + weight);
        System.out.println("Height: " + height);
        System.out.println("Grade: " + grade);
        System.out.println("Is Java fun? " + isJavaFun);
    }
}`}
            </pre>
          </div>

          {/* Best Practices */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use <code>int</code> for whole numbers unless large range is required.</li>
              <li>Use <code>double</code> for decimal numbers unless memory optimization is needed.</li>
              <li>Always initialize variables before use.</li>
              <li>Use meaningful variable names that describe the data they hold.</li>
            </ul>
          </div>

          {/* CTA */}
         
        </div>
      </div>
    </>
  );
};

export default Datatypejava;
