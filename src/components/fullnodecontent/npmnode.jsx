'use client';

const NpmModulePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Node.js NPM (Node Package Manager)</h1>
        <p className="text-lg">
          NPM (Node Package Manager) is the default package manager for Node.js. It allows developers to install, share, and manage dependencies (libraries and tools) in their projects.
        </p>

        <h2 className="text-2xl font-semibold">🔧 Initializing a Project</h2>
        <p>To start using npm in your project, initialize it with the following command:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm init</code>
        </pre>
        <p>Use <code>npm init -y</code> to skip the questions and generate a default <code>package.json</code> file.</p>

        <h2 className="text-2xl font-semibold">📦 Installing a Package</h2>
        <p>To install a package (e.g., <code>lodash</code>):</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm install lodash</code>
        </pre>
        <p>This will add <code>lodash</code> to your <code>node_modules</code> folder and update <code>package.json</code>.</p>

        <h2 className="text-2xl font-semibold">🔄 Installing Dev Dependencies</h2>
        <p>Dev dependencies are used only during development (e.g., testing tools):</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm install nodemon --save-dev</code>
        </pre>

        <h2 className="text-2xl font-semibold">📁 package.json File</h2>
        <p>This file keeps track of the metadata and dependencies of your project.</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">📜 Useful NPM Commands</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><code>npm install</code> – installs all dependencies listed in <code>package.json</code>.</li>
          <li><code>npm uninstall &lt;package&gt;</code> – removes a package.</li>
          <li><code>npm update</code> – updates all packages to the latest allowed versions.</li>
          <li><code>npm list</code> – shows installed packages.</li>
          <li><code>npm run &lt;script&gt;</code> – runs a custom script defined in <code>package.json</code>.</li>
        </ul>

        <h2 className="text-2xl font-semibold">🧠 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>NPM manages packages and project dependencies.</li>
          <li><code>package.json</code> describes the project and its dependencies.</li>
          <li>Use <code>npm install</code> to install packages globally or locally.</li>
          <li>Use dev dependencies for development-only tools.</li>
        </ul>
      </div>
    </div>
  );
};

export default NpmModulePage;
