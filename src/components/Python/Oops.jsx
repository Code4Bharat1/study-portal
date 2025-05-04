import React from 'react';

const Oops = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Object-Oriented Programming in Python (OOP)</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Python is an object-oriented programming language. OOP allows you to structure your code using classes and objects,
          promoting code reusability, organization, and clarity.
        </p>

        {/* Key Concepts */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Core OOP Concepts</h2>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-600">
            <li><strong>Class:</strong> A blueprint for creating objects.</li>
            <li><strong>Object:</strong> An instance of a class.</li>
            <li><strong>Encapsulation:</strong> Hides internal state and requires all interaction to be performed through an object’s methods.</li>
            <li><strong>Inheritance:</strong> A way to form new classes using classes that have already been defined.</li>
            <li><strong>Polymorphism:</strong> The ability to present the same interface for different data types.</li>
          </ul>
        </div>

        {/* Example of Class and Object */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Creating a Class and Object</h2>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, my name is {self.name} and I'm {self.age} years old.")

# Creating an object
p1 = Person("Alice", 30)
p1.greet()`}
          </pre>
        </div>

        {/* Inheritance Example */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Inheritance Example</h2>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`class Animal:
    def speak(self):
        print("Animal speaks")

class Dog(Animal):
    def speak(self):
        print("Dog barks")

d = Dog()
d.speak()  # Output: Dog barks`}
          </pre>
        </div>

        {/* Encapsulation Example */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Encapsulation Example</h2>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # Output: 1500`}
          </pre>
        </div>

        {/* Polymorphism Example */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Polymorphism Example</h2>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`class Cat:
    def sound(self):
        print("Meow")

class Dog:
    def sound(self):
        print("Bark")

def make_sound(animal):
    animal.sound()

make_sound(Cat())  # Output: Meow
make_sound(Dog())  # Output: Bark`}
          </pre>
        </div>

        {/* Conclusion */}
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            Object-Oriented Programming in Python helps you write clean, modular, and reusable code. It’s essential for building scalable applications.
          </p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Practice OOP Concepts &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oops;
