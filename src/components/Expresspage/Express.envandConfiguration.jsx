import React from 'react';

function ExpressenvandConfiguration() {
  return (
    <div className="p-6 ml-60">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Environment Variables and Configuration in Express.js</h1>

      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Introduction</h2>
          <p className="text-lg text-gray-800 mb-4">
            Managing configuration settings is an important aspect of building production-ready applications. In Express.js, environment variables allow you to manage configuration values that can change depending on your environment (e.g., development, production).
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Using environment variables ensures that sensitive information, such as API keys, database URLs, and other configuration data, are not hardcoded into the source code.
          </p>
        </section>

        {/* Setting Up Environment Variables */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Setting Up Environment Variables</h2>
          <p className="text-lg text-gray-800 mb-4">
            To use environment variables in an Express.js application, you typically use a <code>.env</code> file that contains key-value pairs of configuration settings.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`// .env file example
PORT=3000
DB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            In this example, the <code>.env</code> file contains configuration values for the server's port, the MongoDB connection string, and a JWT secret key.
          </p>
        </section>

        {/* Installing dotenv Package */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Installing dotenv Package</h2>
          <p className="text-lg text-gray-800 mb-4">
            To load the environment variables into your Node.js application, you need to install the <code>dotenv</code> package. This package reads the <code>.env</code> file and makes its values available in the <code>process.env</code> object.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`npm install dotenv`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            Once installed, you can require the <code>dotenv</code> package at the top of your main application file (typically <code>app.js</code> or <code>server.js</code>) and configure it like this:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`require('dotenv').config();`}
            </code>
          </pre>
        </section>

        {/* Accessing Environment Variables */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Accessing Environment Variables</h2>
          <p className="text-lg text-gray-800 mb-4">
            After setting up the <code>.env</code> file and loading it using <code>dotenv</code>, you can access the environment variables using <code>process.env.&lt;variable_name&gt;</code>.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
  console.log(\`Database URI: \${dbUri}\`);
});`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            In this example, <code>process.env.PORT</code> retrieves the port number, and <code>process.env.DB_URI</code> retrieves the database connection string from the <code>.env</code> file.
          </p>
        </section>

        {/* Handling Missing Environment Variables */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Handling Missing Environment Variables</h2>
          <p className="text-lg text-gray-800 mb-4">
            It's important to handle cases where environment variables may be missing, especially in production environments. You can provide default values or throw an error if required variables are not set.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error('Database URI is not defined in the environment variables');
}

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            In this example, if the <code>DB_URI</code> environment variable is not defined, the application will throw an error, ensuring that the issue is noticed early in the process.
          </p>
        </section>

        {/* Configuring Different Environments */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Configuring Different Environments</h2>
          <p className="text-lg text-gray-800 mb-4">
            For most applications, you'll have multiple environments (e.g., development, testing, production) with different configurations. You can manage different configurations by creating multiple <code>.env</code> files, like <code>.env.development</code>, <code>.env.production</code>, and so on.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            You can also specify the environment when running your application:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`// Run in development mode
NODE_ENV=development node app.js

// Run in production mode
NODE_ENV=production node app.js`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            Based on the environment, you can load different configurations by specifying which <code>.env</code> file to load:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.development' });
}`}
            </code>
          </pre>
        </section>

        {/* Using Config Files for Advanced Configuration */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Using Config Files for Advanced Configuration</h2>
          <p className="text-lg text-gray-800 mb-4">
            For more complex applications, you might want to manage configuration using a separate configuration file (e.g., <code>config.js</code>) instead of relying solely on environment variables.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`// config.js
module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
};`}
            </code>
          </pre>
          <p className="text-lg text-gray-800 mb-4">
            You can then import the configuration file wherever needed in your Express application:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`const config = require('./config');

app.listen(config.port, () => {
  console.log(\`Server is running on port \${config.port}\`);
});`}
            </code>
          </pre>
        </section>

        {/* Conclusion */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Conclusion</h2>
          <p className="text-lg text-gray-800 mb-4">
            Properly managing environment variables and configuration settings is essential for building scalable and secure Express.js applications.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            By using <code>.env</code> files, <code>dotenv</code>, and environment-specific configurations, you can ensure that your application behaves correctly across different environments and keeps sensitive data secure.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ExpressenvandConfiguration;
