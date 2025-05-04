import React from "react";

const HomePython = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">Python Tutorial</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          Python is a popular programming language. It can be used on a server to create web applications and much more.
        </p>

        {/* Learn by Examples */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Learning by Examples</h2>
          <p className="mt-4 text-lg text-gray-600">
            With our "Try it Yourself" editor, you can edit Python code and view the result instantly.
          </p>
          <pre className="p-4 bg-gray-100 text-blue-600 rounded-lg">
{`# Example: Print Hello World
print("Hello, World!")`}
          </pre>
          <p className="mt-4 text-lg text-gray-600">
            Click on the "Try it Yourself" button to see how it works.
          </p>
        </div>

        {/* File Handling */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Python File Handling</h2>
          <p className="mt-4 text-lg text-gray-600">
            In our File Handling section, you will learn how to open, read, write, and delete files in Python.
          </p>
        </div>

        {/* Database Handling */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Python Database Handling</h2>
          <p className="mt-4 text-lg text-gray-600">
            In our database section, you will learn how to access and work with MySQL and MongoDB databases using Python.
          </p>
          <ul className="mt-4 list-disc text-lg text-gray-600 pl-6">
            <li><strong>Python MySQL Tutorial</strong></li>
            <li><strong>Python MongoDB Tutorial</strong></li>
          </ul>
        </div>

        {/* Exercises */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Python Exercises</h2>
          <p className="mt-4 text-lg text-gray-600">
            Many chapters in this tutorial end with an exercise where you can check your level of knowledge.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Start Learning Python Now &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePython;

