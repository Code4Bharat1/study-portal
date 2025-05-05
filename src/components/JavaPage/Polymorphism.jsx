import React from 'react';

const Polymorphism = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Polymorphism in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Polymorphism</strong> is one of the core principles of Object-Oriented Programming (OOP). The word "polymorphism" means "many forms". In Java, polymorphism allows objects to be treated as instances of their parent class rather than their actual class. The behavior is determined at runtime or compile-time depending on the type of polymorphism.
          </p>

          {/* Types of Polymorphism */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Types of Polymorphism in Java</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Compile-time Polymorphism (Static Binding / Method Overloading)</strong></li>
              <li><strong>Runtime Polymorphism (Dynamic Binding / Method Overriding)</strong></li>
            </ul>
          </div>

          {/* Method Overloading */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">1. Method Overloading (Compile-time)</h2>
            <p className="mt-4 text-lg text-gray-600">
              Method overloading occurs when two or more methods in the same class have the same name but different parameters (type, number, or order). It is resolved at compile time.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`}
            </pre>
          </div>

          {/* Method Overriding */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">2. Method Overriding (Runtime)</h2>
            <p className="mt-4 text-lg text-gray-600">
              Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. The method call is resolved at runtime.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class TestPolymorphism {
    public static void main(String[] args) {
        Animal a = new Dog(); // Upcasting
        a.sound(); // Outputs: Dog barks
    }
}`}
            </pre>
          </div>

          {/* Upcasting and Downcasting */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Upcasting and Downcasting</h2>
            <p className="mt-4 text-lg text-gray-600">
              <strong>Upcasting</strong> refers to treating a subclass object as if it were a superclass object.
              <br />
              <strong>Downcasting</strong> is casting back to the original subclass (not recommended unless necessary and must be done with caution).
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`Animal a = new Dog(); // Upcasting
Dog d = (Dog) a;       // Downcasting (safe here because 'a' is actually a Dog)`}
            </pre>
          </div>

          {/* Advantages */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Advantages of Polymorphism</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Improves code reusability and maintainability</li>
              <li>Makes the code more flexible and extensible</li>
              <li>Supports a cleaner, modular design using interfaces and inheritance</li>
              <li>Allows for dynamic method dispatch</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Use interfaces or abstract classes to generalize behavior</li>
              <li>Avoid excessive overloading with unclear method signatures</li>
              <li>Ensure proper use of @Override annotation</li>
              <li>Prefer upcasting when working with polymorphism</li>
            </ul>
          </div>

          {/* CTA */}
          
        </div>
      </div>
    </>
  );
};

export default Polymorphism;
