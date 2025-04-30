'use client'

const NodeHomePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10"> {/* Updated to shadow-xl for a more pronounced shadow */}
        <h1 className="text-4xl font-bold">Welcome to Node.js Home</h1>
        <p className="text-lg">What is Node.js and why should you learn it?</p>
        <p>
          Node.js is a powerful JavaScript runtime that allows you to run JavaScript code outside of the browser. It has gained immense popularity because of its performance and versatility, especially in server-side development.
        </p>
        
        <h2 className="text-2xl font-semibold">Node.js Ecosystem</h2>
        <p>
          Node.js is not just a runtime; it’s an ecosystem of tools, libraries, and modules. With its extensive package manager, npm, Node.js is highly customizable and easy to integrate with a range of tools for building scalable applications.
        </p>
        
        <h2 className="text-2xl font-semibold">Key Features of Node.js</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Event-driven:</strong> Non-blocking I/O operations using events.</li>
          <li><strong>Single-threaded:</strong> Efficient resource usage due to single-threaded model.</li>
          <li><strong>Fast execution:</strong> Powered by V8 engine for high performance.</li>
          <li><strong>Scalable:</strong> Perfect for real-time apps and microservices.</li>
          <li><strong>npm Package Manager:</strong> Access to thousands of packages to extend functionality.</li>
        </ul>

        <h2 className="text-2xl font-semibold">What You Can Build With Node.js</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fast and scalable web servers</li>
          <li>Real-time apps like chat applications and live data streaming</li>
          <li>Microservices architecture</li>
          <li>Command-line tools and automation scripts</li>
          <li>APIs and backend services</li>
        </ul>

        <h2 className="text-2xl font-semibold">First Example: Node.js Server</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`// Importing the http module to create a server
const http = require('http');

// Create a simple HTTP server
http.createServer((req, res) => {
  res.write('Hello from Node.js!');
  res.end();
}).listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});`}
          </code>
        </pre>

        <p className="italic text-blue-300">Run this using <code>node filename.js</code> and visit <code>http://localhost:3000</code></p>
      </div>
    </div>
  );
};

export default NodeHomePage;
