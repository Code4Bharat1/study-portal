import React from 'react';

const Encapsulation = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Encapsulation in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Encapsulation</strong> is a fundamental concept in object-oriented programming (OOP) that refers to the bundling of data (variables) and methods (functions) that operate on the data into a single unit, typically a class. It also involves restricting direct access to some of the object’s components, which is achieved using access modifiers.
          </p>

          {/* Key Concepts */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why Encapsulation is Important</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Improves modularity by keeping fields private</li>
              <li>Helps to maintain control over the data</li>
              <li>Makes code more flexible and maintainable</li>
              <li>Prevents unauthorized access and modification</li>
            </ul>
          </div>

          {/* Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Example of Encapsulation</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here's a simple example of how encapsulation is used in Java:
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`public class Person {
  private String name;
  private int age;

  // Constructor
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // Getter for name
  public String getName() {
    return name;
  }

  // Setter for name
  public void setName(String name) {
    this.name = name;
  }

  // Getter for age
  public int getAge() {
    return age;
  }

  // Setter for age
  public void setAge(int age) {
    if (age > 0) {
      this.age = age;
    }
  }
}`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              In this example, the fields <code>name</code> and <code>age</code> are marked as <code>private</code>, meaning they cannot be accessed directly from outside the class. Instead, we use public methods (getters and setters) to access and modify these fields.
            </p>
          </div>

          {/* Access Modifiers */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Access Modifiers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Encapsulation heavily relies on access modifiers:
            </p>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>private:</strong> The member is accessible only within the class</li>
              <li><strong>public:</strong> The member is accessible from anywhere</li>
              <li><strong>protected:</strong> Accessible within the package and subclasses</li>
              <li><strong>default:</strong> Accessible within the package (no modifier)</li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Benefits of Encapsulation</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Improves security by hiding internal state</li>
              <li>Encourages loose coupling between components</li>
              <li>Improves maintainability and flexibility of code</li>
              <li>Allows validation and controlled access via setters</li>
            </ul>
          </div>

          {/* CTA */}
         
        </div>
      </div>
    </>
  );
};

export default Encapsulation;
