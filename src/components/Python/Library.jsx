import React from 'react';

const Library = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Libraries</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          A library in Python is a collection of pre-written code that you can use to perform common tasks. Python comes with a standard library, and there are also many third-party libraries available for various purposes such as data science, web development, machine learning, and more.
        </p>

        {/* Why Use Libraries */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Why Use Libraries?</h2>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li>Save time by using reusable code.</li>
            <li>Access powerful tools and features with minimal effort.</li>
            <li>Improve code readability and maintainability.</li>
            <li>Encourage modular and structured programming.</li>
          </ul>
        </div>

        {/* Standard Libraries */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Python Standard Library</h2>
          <p className="mt-4 text-lg text-gray-600">
            Python comes with a standard library that includes modules for handling files, mathematics, dates, and more. Examples include:
          </p>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li><code>math</code> – for mathematical operations</li>
            <li><code>datetime</code> – to work with dates and times</li>
            <li><code>os</code> – for interacting with the operating system</li>
            <li><code>random</code> – to generate random numbers</li>
            <li><code>json</code> – to handle JSON data</li>
          </ul>
        </div>

        {/* Example Usage */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Example: Using the math Library</h2>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`import math

print(math.sqrt(16))     # Output: 4.0
print(math.pi)           # Output: 3.141592653589793`}
          </pre>
        </div>

        {/* Popular Third-Party Libraries */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Popular Third-Party Libraries</h2>
          <p className="mt-4 text-lg text-gray-600">You can install third-party libraries using <code>pip</code>:</p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`pip install numpy`}
          </pre>
          <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
            <li><strong>NumPy</strong> – for numerical computations</li>
            <li><strong>Pandas</strong> – for data analysis</li>
            <li><strong>Matplotlib</strong> – for data visualization</li>
            <li><strong>Requests</strong> – for making HTTP requests</li>
            <li><strong>Flask / Django</strong> – for web development</li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            Python libraries help developers build applications faster and with fewer errors. Explore the vast ecosystem of libraries to become a more efficient and powerful Python programmer.
          </p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Explore Python Libraries &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
