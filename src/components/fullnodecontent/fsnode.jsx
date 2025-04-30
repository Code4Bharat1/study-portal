'use client';

const FileSystemModulePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Node.js File System Module</h1>
        <p className="text-lg">
          The <code>fs</code> module allows you to work with the file system on your computer. It is a core module in Node.js used for reading, writing, updating, and deleting files.
        </p>

        <h2 className="text-2xl font-semibold">Importing the Module</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>{`const fs = require('fs');`}</code>
        </pre>

        <h2 className="text-2xl font-semibold">Create or Overwrite a File</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`fs.writeFileSync('example.txt', 'Hello from Node.js!');
console.log('File created successfully.');`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Read a File</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const data = fs.readFileSync('example.txt', 'utf8');
console.log('File content:', data);`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Append to a File</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`fs.appendFileSync('example.txt', '\\nAppended text!');
console.log('Text appended successfully.');`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Delete a File</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`fs.unlinkSync('example.txt');
console.log('File deleted successfully.');`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">📦 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><code>fs</code> is a core module for file operations.</li>
          <li>Use <code>writeFileSync()</code> to create or overwrite files.</li>
          <li>Use <code>readFileSync()</code> to read files.</li>
          <li>Use <code>appendFileSync()</code> to add data to existing files.</li>
          <li>Use <code>unlinkSync()</code> to delete files.</li>
        </ul>
      </div>
    </div>
  );
};

export default FileSystemModulePage;
