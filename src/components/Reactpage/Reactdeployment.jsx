'use client';
import React from 'react';

function Reactdeployment() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-6">React App Deployment</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        {/* Introduction */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Introduction to Deployment</h2>
        <p className="text-gray-800 mb-6">
          After building your amazing React application, the final step is deploying it online so that users can access it. Deployment involves optimizing your app and putting it on a web server.
        </p>

        {/* Building the App */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">1. Building Your React App</h2>
        <p className="text-gray-800 mb-4">
          First, you need to create a production build of your app. Run the following command in your project directory:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">npm run build</code>
        </pre>
        <p className="text-gray-800 mb-6">
          This will create a <code>build/</code> folder containing the optimized production-ready version of your app.
        </p>

        {/* Popular Deployment Options */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">2. Popular Deployment Platforms</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li><span className="font-semibold text-pink-500">Vercel</span> - Great for Next.js and React apps, free for most projects.</li>
          <li><span className="font-semibold text-pink-500">Netlify</span> - Easy CI/CD, free tier available, supports custom domains.</li>
          <li><span className="font-semibold text-pink-500">GitHub Pages</span> - Good for small static sites.</li>
          <li><span className="font-semibold text-pink-500">Firebase Hosting</span> - Scalable and fast, integrates with Firebase backend services.</li>
          <li><span className="font-semibold text-pink-500">Render</span> - Simple hosting with backend support too.</li>
        </ul>

        {/* Deploy to Vercel */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">3. Deploying to Vercel (Recommended)</h2>
        <ol className="list-decimal list-inside text-gray-800 space-y-2 mb-6">
          <li>Go to <a href="https://vercel.com" target="_blank" className="text-pink-500 underline">vercel.com</a> and sign up.</li>
          <li>Connect your GitHub repository containing the React project.</li>
          <li>Import the project, and Vercel will automatically detect it as a React app.</li>
          <li>Click "Deploy". That's it!</li>
        </ol>

        {/* Deploy to Netlify */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">4. Deploying to Netlify</h2>
        <p className="text-gray-800 mb-4">
          Another very popular option:
        </p>
        <ol className="list-decimal list-inside text-gray-800 space-y-2 mb-6">
          <li>Go to <a href="https://netlify.com" target="_blank" className="text-pink-500 underline">netlify.com</a> and sign up.</li>
          <li>Create a new site from Git.</li>
          <li>Connect your GitHub account and select the project.</li>
          <li>Set the build command as <code>npm run build</code> and publish directory as <code>build/</code>.</li>
          <li>Click "Deploy site".</li>
        </ol>

        {/* Deploying on GitHub Pages */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">5. Deploying on GitHub Pages</h2>
        <p className="text-gray-800 mb-4">
          For simple apps, GitHub Pages is free and easy. First install the GitHub Pages package:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
          <code className="text-pink-500">npm install --save gh-pages</code>
        </pre>
        <p className="text-gray-800 mb-4">
          Then in your <code>package.json</code> file, add:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
          <code className="text-pink-500">
{`"homepage": "https://yourusername.github.io/your-repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}`}
          </code>
        </pre>
        <p className="text-gray-800 mb-6">
          Finally, run:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">npm run deploy</code>
        </pre>

        {/* Environment Variables */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">6. Handling Environment Variables</h2>
        <p className="text-gray-800 mb-4">
          Create a <code>.env</code> file for environment-specific variables. Important: prefix all variables with <code>REACT_APP_</code>.
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`REACT_APP_API_URL=https://yourapi.com`}
          </code>
        </pre>
        <p className="text-gray-800 mb-6">
          Access it inside your code with <code>process.env.REACT_APP_API_URL</code>.
        </p>

        {/* Common Deployment Issues */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">7. Common Issues during Deployment</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Wrong build directory selected</li>
          <li>API URL hardcoded to localhost (fix it with environment variables)</li>
          <li>Routing issues (use <code>HashRouter</code> or proper server configurations for client-side routing)</li>
          <li>Permissions issues with GitHub Pages</li>
        </ul>

        {/* Conclusion */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Conclusion</h2>
        <p className="text-gray-800 mb-6">
          Deploying your React application can seem intimidating at first, but platforms like Vercel and Netlify make it incredibly simple. Follow the proper build and environment setup, and your app will be live in minutes!
        </p>

        <button className="mt-8 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Next: React App Optimization →
        </button>
      </div>
    </div>
  );
}

export default Reactdeployment;
