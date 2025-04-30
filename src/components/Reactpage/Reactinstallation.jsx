import React from 'react';

function Reactinstallation() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Installing React</h1>
      <p className="text-lg text-gray-800 mb-6">
        In this section, we'll guide you through the process of installing React and setting up your first React project. React is a powerful JavaScript library for building user interfaces, and it can be easily integrated into any web application. Below are the steps for installing React using different methods.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Step 1: Installing Node.js and npm</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Before installing React, you'll need to install <strong>Node.js</strong> and <strong>npm</strong> (Node Package Manager) on your machine. Node.js is a JavaScript runtime, and npm is the package manager that helps you manage the libraries you will install in your project.
          </p>

          <p>
            Follow these steps to install Node.js:
          </p>
          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li>
              Go to the <a href="https://nodejs.org" className="text-pink-400" target="_blank" rel="noopener noreferrer">official Node.js website</a>.
            </li>
            <li>
              Download the latest stable version of Node.js (LTS).
            </li>
            <li>
              Follow the instructions to install Node.js on your system (Windows, macOS, or Linux).
            </li>
          </ol>
          <p>
            After installation, you can verify if Node.js and npm were installed correctly by running the following commands in your terminal:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`node -v
npm -v`}
            </code>
          </pre>

          <p>
            These commands will display the versions of Node.js and npm installed on your machine.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Step 2: Creating a React Application with Create React App</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            One of the easiest ways to start a new React project is by using the <strong>Create React App</strong> tool. It sets up everything you need, including the development environment, build tools, and configurations, so you can start coding right away.
          </p>

          <p>
            To create a new React project, follow these steps:
          </p>

          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li>
              Open your terminal (Command Prompt, PowerShell, or any terminal you use).
            </li>
            <li>
              Run the following command to install <strong>Create React App</strong> globally:
            </li>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-300">
                {`npm install -g create-react-app`}
              </code>
            </pre>

            <li>
              Once installed, create a new React application by running the following command, replacing <code>my-app</code> with the name of your project:
            </li>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-300">
                {`npx create-react-app my-app`}
              </code>
            </pre>

            <li>
              Navigate into your project directory by running:
            </li>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-300">
                {`cd my-app`}
              </code>
            </pre>

            <li>
              To start your development server and see the React app in action, run:
            </li>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-300">
                {`npm start`}
              </code>
            </pre>
          </ol>

          <p>
            After running <code>npm start</code>, your browser should automatically open and display your React application, which by default will say "Edit src/App.js and save to reload."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Step 3: Understanding the Project Structure</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            After creating the project, you will see a folder structure that looks like this:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`my-app/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
├── package.json
├── package-lock.json
├── README.md`}
            </code>
          </pre>

          <p>
            Here's a breakdown of the important files and directories:
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li><strong>public/index.html:</strong> This is the main HTML file where your React app will be rendered. React injects the app's content here.</li>
            <li><strong>src/App.js:</strong> This is the main JavaScript file where the root React component is located. You will be writing most of your React code here.</li>
            <li><strong>src/index.js:</strong> This is the entry point of the app. It connects the root component (App) to the DOM.</li>
            <li><strong>package.json:</strong> This file contains metadata about your project and its dependencies.</li>
          </ul>

          <p>
            Understanding this structure will help you navigate your project and start building with React!
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Step 4: Installing Additional Dependencies</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            As you build your React application, you may want to install additional dependencies for functionality such as routing, state management, and more. You can install dependencies using npm:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`npm install react-router-dom`}
            </code>
          </pre>
          <p>
            This command installs <strong>React Router</strong>, which is commonly used for handling routing in React applications.
          </p>
        </div>

        <button className="mt-8 bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}

export default Reactinstallation;
