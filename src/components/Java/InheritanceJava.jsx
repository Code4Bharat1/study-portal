import React from 'react';

const InheritanceJava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Inheritance in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Inheritance</strong> is one of the four fundamental Object-Oriented Programming (OOP) principles in Java. It allows one class to inherit the properties (fields) and behaviors (methods) of another class. The main goal of inheritance is to promote code reuse and establish a relationship between different classes.
          </p>

          {/* Why Use Inheritance */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why Use Inheritance?</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Promotes code reusability</li>
              <li>Supports method overriding (runtime polymorphism)</li>
              <li>Improves code organization through hierarchy</li>
              <li>Allows extension of existing functionality</li>
            </ul>
          </div>

          {/* Terminology */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Key Terminology</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Superclass (Parent):</strong> The class whose features are inherited</li>
              <li><strong>Subclass (Child):</strong> The class that inherits from the superclass</li>
              <li><strong>extends:</strong> The keyword used to inherit a class</li>
            </ul>
          </div>

          {/* Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Example</h2>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`// Superclass
class Animal {
    void eat() {
        System.out.println("This animal eats food");
    }
}

// Subclass
class Dog extends Animal {
    void bark() {
        System.out.println("The dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();   // Inherited method
        d.bark();  // Own method
    }
}`}
            </pre>
          </div>

          {/* Types of Inheritance */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Inheritance in Java</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Single Inheritance:</strong> One class inherits another</li>
              <li><strong>Multilevel Inheritance:</strong> A class inherits a class which inherits another class</li>
              <li><strong>Hierarchical Inheritance:</strong> Multiple classes inherit from a single class</li>
              <li><strong>Multiple Inheritance (via Interfaces):</strong> A class implements multiple interfaces</li>
            </ul>
          </div>

          {/* Method Overriding */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Method Overriding</h2>
            <p className="mt-4 text-lg text-gray-600">
              A subclass can provide a specific implementation of a method that is already defined in its parent class. This is known as method overriding.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}`}
            </pre>
          </div>

          {/* Limitations */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Limitations of Inheritance</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Can increase dependency between base and derived classes</li>
              <li>Deep inheritance hierarchies can reduce readability</li>
              <li>Java does not support multiple inheritance with classes (only with interfaces)</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use inheritance only when there is a clear "is-a" relationship</li>
              <li>Prefer composition over inheritance when behavior is shared but hierarchy isn't meaningful</li>
              <li>Avoid deep inheritance chains</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition">
              Learn Next: Polymorphism in Java &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InheritanceJava;
