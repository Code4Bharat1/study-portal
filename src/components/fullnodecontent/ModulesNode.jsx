'use client'

const NodeModulesPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <h1 className="text-4xl font-bold">Node.js Modules</h1>

      <p className="text-lg">
        In Node.js, modules are reusable blocks of code whose existence does not accidentally impact other code.
      </p>

      <h2 className="text-2xl font-semibold">Types of Modules</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Core Modules:</strong> Built-in modules provided by Node.js (like <code>fs</code>, <code>http</code>, <code>path</code>).</li>
        <li><strong>Local Modules:</strong> Custom modules you create in your own files.</li>
        <li><strong>Third-Party Modules:</strong> Modules installed via npm (like <code>express</code>, <code>mongoose</code>).</li>
      </ul>

      <h2 className="text-2xl font-semibold">Example: Using a Core Module (<code>fs</code>)</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        <code>
{`const fs = require('fs');

// Create a new file with some text
fs.writeFileSync('example.txt', 'Hello from Node.js!');
console.log('File created successfully.');`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold">Creating Your Own Module</h2>
      <p>Step 1: Create a file <code>math.js</code></p>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        <code>
{`// math.js
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;`}
        </code>
      </pre>

      <p>Step 2: Use it in another file</p>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        <code>
{`// app.js
const math = require('./math');

console.log('Sum:', math.add(5, 3));
console.log('Difference:', math.sub(10, 4));`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold">Installing Third-Party Modules</h2>
      <p>Use npm to install external modules. Example: installing <code>chalk</code> for colored console output</p>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        <code>npm install chalk</code>
      </pre>

      <p>Then use it in your code:</p>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        <code>
{`const chalk = require('chalk');
console.log(chalk.green('Success!'));`}
        </code>
      </pre>

      <h2 className="text-2xl font-semibold">📦 Summary</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Modules help organize code and keep it clean.</li>
        <li>You can use built-in, custom, or external npm modules.</li>
        <li>Use <code>require()</code> to load a module.</li>
        <li>Export functions or values using <code>exports</code> or <code>module.exports</code>.</li>
      </ul>
    </div>
  );
};

export default NodeModulesPage;
