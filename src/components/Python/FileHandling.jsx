import React from 'react';

const Filehandling = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800">File Handling in Python</h1>

        {/* Introduction */}
        <p className="mt-4 text-lg text-gray-600">
          File handling is an essential part of any programming language. Python provides built-in functions to open, read, write, and close files. Using file handling, you can store output or read input from files instead of working directly with standard input/output.
        </p>

        {/* Opening a File */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Opening a File</h2>
          <p className="mt-4 text-lg text-gray-600">
            Use the built-in <code>open()</code> function to open a file. It returns a file object:
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`file = open("example.txt", "r")  # 'r' mode means read`}
          </pre>
        </div>

        {/* Reading from a File */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Reading from a File</h2>
          <p className="mt-4 text-lg text-gray-600">You can read the content using:</p>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>read()</code> – reads the entire file.</li>
            <li><code>readline()</code> – reads a single line.</li>
            <li><code>readlines()</code> – reads all lines into a list.</li>
          </ul>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`file = open("example.txt", "r")
content = file.read()
print(content)
file.close()`}
          </pre>
        </div>

        {/* Writing to a File */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Writing to a File</h2>
          <p className="mt-4 text-lg text-gray-600">
            Use <code>"w"</code> to write (overwrites existing content), or <code>"a"</code> to append.
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`file = open("example.txt", "w")
file.write("Hello, this is a new line!")
file.close()`}
          </pre>
        </div>

        {/* Using with Statement */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Using <code>with</code> Statement</h2>
          <p className="mt-4 text-lg text-gray-600">
            Python provides the <code>with</code> statement for automatically closing the file after its suite finishes execution.
          </p>
          <pre className="bg-gray-100 text-blue-700 p-4 rounded-lg mt-2">
{`with open("example.txt", "r") as file:
    print(file.read())`}
          </pre>
        </div>

        {/* File Modes */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">File Modes</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600 mt-2">
            <li><code>'r'</code> – Read (default)</li>
            <li><code>'w'</code> – Write (overwrite)</li>
            <li><code>'a'</code> – Append</li>
            <li><code>'x'</code> – Create a new file</li>
            <li><code>'b'</code> – Binary mode</li>
            <li><code>'t'</code> – Text mode (default)</li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            Mastering file handling in Python is crucial for dealing with external data sources, logging, configuration files, and more.
          </p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Try File Handling &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filehandling;
