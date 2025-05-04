import React from 'react';

const Abstraction = () => {
  return (
    <>
      <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Abstraction in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Abstraction</strong> is one of the fundamental OOP concepts in Java. It is the process of hiding the implementation details and showing only the essential features of an object.
            Abstraction helps reduce complexity and increase code reusability and maintainability.
          </p>

          {/* Why Use Abstraction */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why Use Abstraction?</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Hides complex code implementation from the user</li>
              <li>Improves code readability and maintainability</li>
              <li>Promotes security by exposing only relevant data</li>
              <li>Supports loose coupling between components</li>
            </ul>
          </div>

          {/* Types of Abstraction */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">How Abstraction is Achieved in Java</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java achieves abstraction using:
            </p>
            <ul className="mt-2 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Abstract Classes</strong></li>
              <li><strong>Interfaces</strong></li>
            </ul>
          </div>

          {/* Abstract Class Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Abstract Class</h2>
            <p className="mt-4 text-lg text-gray-600">
              An abstract class is a class that is declared with the keyword <code>abstract</code>. It can have both abstract (without body) and non-abstract (with body) methods.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`// Abstract class
abstract class Animal {
    abstract void sound(); // abstract method

    void sleep() {
        System.out.println("Sleeping...");
    }
}

// Subclass
class Dog extends Animal {
    void sound() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal obj = new Dog();
        obj.sound();  // Output: Bark
        obj.sleep();  // Output: Sleeping...
    }
}`}
            </pre>
          </div>

          {/* Interface Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Interface</h2>
            <p className="mt-4 text-lg text-gray-600">
              An interface is a fully abstract class used to achieve abstraction and multiple inheritance. All methods in an interface are implicitly abstract and public.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`interface Vehicle {
    void start();
}

class Bike implements Vehicle {
    public void start() {
        System.out.println("Bike started");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Bike();
        v.start();  // Output: Bike started
    }
}`}
            </pre>
          </div>

          {/* Key Differences */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Abstract Class vs Interface</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Abstract classes can have constructors and member variables; interfaces cannot.</li>
              <li>Interfaces support multiple inheritance; abstract classes do not.</li>
              <li>Use abstract class when you want to provide some common code; use interface for total abstraction.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use interfaces when behavior is shared by unrelated classes.</li>
              <li>Use abstract classes when classes are closely related and share code.</li>
              <li>Avoid adding implementation logic in interfaces unless using default methods (Java 8+).</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Learn Next: Inheritance in Java &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Abstraction;

