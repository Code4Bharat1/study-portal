import React from 'react';

const ClassObjectJava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Classes and Objects in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            Java is an object-oriented programming language, and everything in Java revolves around <strong>classes</strong> and <strong>objects</strong>. A class is a blueprint for creating objects, and an object is an instance of a class.
          </p>

          {/* Class Syntax */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Class Syntax</h2>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`class ClassName {
    // Fields (variables)
    // Methods
}`}
            </pre>
          </div>

          {/* Object Creation */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Creating an Object</h2>
            <p className="mt-4 text-lg text-gray-600">
              An object is created using the <code>new</code> keyword. This allocates memory and initializes the object.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`ClassName obj = new ClassName();`}
            </pre>
          </div>

          {/* Full Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Example: Class and Object</h2>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`// Defining a class
class Car {
    String color;
    int speed;

    void drive() {
        System.out.println("The car is driving.");
    }
}

// Main class
public class Main {
    public static void main(String[] args) {
        // Creating an object
        Car myCar = new Car();

        // Accessing fields and methods
        myCar.color = "Red";
        myCar.speed = 100;

        System.out.println("Color: " + myCar.color);
        System.out.println("Speed: " + myCar.speed);
        myCar.drive();
    }
}`}
            </pre>
          </div>

          {/* Key Concepts */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Key Concepts</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Class:</strong> Defines structure and behavior (data + methods).</li>
              <li><strong>Object:</strong> Instance of a class with real values in memory.</li>
              <li><strong>Fields:</strong> Variables declared inside a class.</li>
              <li><strong>Methods:</strong> Functions defined inside a class to perform operations.</li>
              <li><strong>new keyword:</strong> Used to instantiate objects from classes.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use meaningful class and variable names (e.g., <code>Student</code>, <code>BankAccount</code>).</li>
              <li>Keep class responsibilities focused (Single Responsibility Principle).</li>
              <li>Use access modifiers (like <code>private</code>, <code>public</code>) appropriately for encapsulation.</li>
              <li>Favor composition over inheritance when structuring class relationships.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Next: Learn Java Inheritance &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassObjectJava;
