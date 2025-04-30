'use client';
import React from 'react';

export default function ExpressHome() {
  return (
    <div className="p-6 ml-72 ">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Express Home</h1>
      <p className="text-lg text-gray-800 mb-6">
        Welcome to the Express.js tutorial! In this tutorial, you'll learn the fundamentals of Express, a powerful and minimalist web framework for Node.js. It helps you create robust APIs and web applications quickly and efficiently. By the end of this tutorial, you'll understand how to set up routes, handle middleware, serve static files, manage errors, and build full RESTful APIs with Express. Let's get started and unlock the power of backend web development!
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Understanding Express Middleware & Routing</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Express simplifies web server creation by providing a clean API for routing, middleware, and request handling. At its core, it lets you define different routes and attach specific logic to those routes. Middleware functions play a crucial role in Express—they can modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack.
          </p>

          <p>
            Here's a simple example of a basic Express app:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-600">
{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`}
            </code>
          </pre>

          <p>
            This sets up a simple Express server that listens on port 3000 and responds with "Hello Express!" when visiting the root route (<code>/</code>).
          </p>

          <h3 className="text-xl font-semibold text-yellow-500">What is Middleware?</h3>

          <p>
            Middleware in Express is a function that has access to the request, response, and the next middleware in the pipeline. You can use it for logging, authentication, body parsing, and more.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-600">
{`app.use((req, res, next) => {
  console.log('Middleware triggered');
  next(); // Pass control to the next handler
});`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-yellow-500">Routing in Express</h3>

          <p>
            Routing refers to how your application responds to client requests to specific endpoints (URLs). You can define multiple routes to handle different paths and HTTP methods like GET, POST, PUT, and DELETE.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-600">
{`app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-yellow-500">Handling Errors</h3>
          <p>
            Express allows you to handle errors globally using an error-handling middleware function. This function should always have four parameters: <code>err</code>, <code>req</code>, <code>res</code>, and <code>next</code>.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-600">
{`app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`}
            </code>
          </pre>

          <p>
            This ensures a consistent error-handling strategy throughout your app.
          </p>

          <h3 className="text-xl font-semibold text-yellow-500">Serving Static Files</h3>
          <p>
            Express can serve static files like HTML, CSS, and JavaScript using the built-in <code>express.static</code> middleware.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-600">
{`app.use(express.static('public'));`}
            </code>
          </pre>

          <p>
            Now, files in the <code>public</code> directory can be accessed directly via the browser.
          </p>

          <p>
            As you continue learning Express, you'll explore concepts like REST APIs, connecting to databases (like MongoDB), user authentication, and deployment. These fundamentals lay the groundwork for any server-side or full-stack application you build.
          </p>
        </div>

        <button className="mt-8 bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-600">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}
