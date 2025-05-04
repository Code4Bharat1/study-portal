"use client";

const Home = () => {
  return (
    <div className="p-6 ml-80">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Welcome to Javascript Home</h1>
        <p className="text-lg">
          What is Javascript and why should you learn it?
        </p>
        <p>
          JavaScript is a programming language that is widely used in web
          development to create interactive and dynamic websites. It's a core
          technology of the web, alongside HTML (which structures the web page)
          and CSS (which styles the web page).{" "}
        </p>
        <h2 className="text-2xl font-semibold">Javascript Ecosystem</h2>
        <p>
          The JavaScript ecosystem refers to the vast collection of libraries,
          frameworks, tools, and technologies built around JavaScript that help
          developers build web, mobile, and server-side applications. It
          includes frontend libraries like React, Vue, and Angular, backend
          frameworks such as Node.js and Express, and a wide range of tools for
          managing dependencies, automating tasks, testing, and deploying
          applications. With its large community, constant updates, and
          versatility across different types of projects, the JavaScript
          ecosystem has become one of the most powerful and widely used
          programming environments, allowing developers to build everything from
          websites to mobile apps and games.
        </p>
        <h2 className="text-2xl font-semibold">Key Features of Node.js</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dynamic Typing</strong>: Variables can hold any data type,
            and types are determined at runtime.
          </li>
          <li>
            <strong>Event-Driven</strong>: JavaScript is built around events,
            enabling interactive behavior.
          </li>
          <li>
            <strong>Asynchronous</strong>: Supports non-blocking operations
            (e.g., async/await, promises).
          </li>
          <li>
            <strong>Object-Oriented</strong>: Supports objects, classes, and
            inheritance.
          </li>
          <li>
            <strong>Functional Programming</strong>: First-class functions and
            higher-order functions.
          </li>
          <li>
            <strong>Prototypal Inheritance</strong>: Objects inherit properties
            and methods from other objects.
          </li>
          <li>
            <strong>DOM Manipulation</strong>: Can modify HTML and CSS
            dynamically.
          </li>
          <li>
            <strong>Cross-Platform</strong>: Works across browsers and on both
            client and server (via Node.js).
          </li>
          <li>
            <strong>First-Class Functions</strong>: Functions can be assigned to
            variables, passed, and returned.
          </li>
          <li>
            <strong>ECMAScript Standards</strong>: Regular updates for new
            features and enhancements.
          </li>
          <li>
            <strong>Libraries & Frameworks</strong>: Rich ecosystem (e.g.,
            React, Angular, Node.js).
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">
          What You Can Build With Javascript
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Websites</strong>: Static and dynamic websites.
          </li>
          <li>
            <strong>User Interfaces</strong>: Interactive and responsive web
            pages.
          </li>
          <li>
            <strong>Web Apps</strong>: Single-page apps (SPAs), e-commerce
            platforms.
          </li>
          <li>
            <strong>Mobile Apps</strong>: Cross-platform apps (React Native).
          </li>
          <li>
            <strong>APIs</strong>: RESTful APIs, GraphQL APIs.
          </li>
          <li>
            <strong>Real-Time Apps</strong>: Chat apps, live notifications.
          </li>
          <li>
            <strong>Games</strong>: Browser-based games.
          </li>
          <li>
            <strong>Desktop Apps</strong>: Cross-platform desktop apps
            (Electron).
          </li>
          <li>
            <strong>Browser Extensions</strong>: Custom extensions.
          </li>
          <li>
            <strong>Automation</strong>: Task automation, bots.
          </li>
          <li>
            <strong>Data Visualization</strong>: Interactive charts and graphs.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold">
          First Example: Hello World in Javascript
        </h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
            {`<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

  <script>
    alert( 'Hello, world!' );
  </script>

  <p>...After the script.</p>

</body>

</html>`}
          </code>
        </pre>
        <p className="italic text-blue-300">
          Run this by <code>Open With Browser</code>
        </p>
      </div>
    </div>
  );
};

export default Home;
