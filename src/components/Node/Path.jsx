'use client';

const PathModulePage = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Node.js <code>path</code> Module</h1>
        <p className="text-lg">
          The <code>path</code> module in Node.js provides utilities for working with file and directory paths. It is a core module, so no installation is needed.
        </p>

        <h2 className="text-2xl font-semibold">📦 Importing the Module</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>{`const path = require('path');`}</code>
        </pre>

        <h2 className="text-2xl font-semibold">📁 Common Methods</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><code>path.basename(p)</code> – returns the last portion of a path.</li>
          <li><code>path.dirname(p)</code> – returns the directory name of a path.</li>
          <li><code>path.extname(p)</code> – returns the extension of the file.</li>
          <li><code>path.join(...paths)</code> – joins all given path segments together.</li>
          <li><code>path.resolve(...paths)</code> – resolves a sequence of paths into an absolute path.</li>
        </ul>

        <h2 className="text-2xl font-semibold">🔧 Example</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const path = require('path');

const filePath = '/users/shiri/documents/report.pdf';

console.log('Base name:', path.basename(filePath)); // report.pdf
console.log('Directory name:', path.dirname(filePath)); // /users/shiri/documents
console.log('Extension:', path.extname(filePath)); // .pdf
console.log('Joined path:', path.join('/users', 'shiri', 'notes.txt'));
console.log('Resolved path:', path.resolve('folder', 'file.txt'));`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">🧠 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The <code>path</code> module helps handle and transform file paths.</li>
          <li>It works across platforms, ensuring consistent behavior.</li>
          <li>No installation is required as it's a core module.</li>
        </ul>
      </div>
    </div>
  );
};

export default PathModulePage;
