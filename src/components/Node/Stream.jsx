'use client';

const StreamModulePage = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Node.js <code>stream</code> Module</h1>
        <p className="text-lg">
          The <code>stream</code> module in Node.js is used to handle streaming data. Streams are instances of EventEmitter and can be readable, writable, or both (duplex).
        </p>

        <h2 className="text-2xl font-semibold">📂 Types of Streams</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Readable:</strong> Stream from which data can be read (e.g. <code>fs.createReadStream</code>).</li>
          <li><strong>Writable:</strong> Stream to which data can be written (e.g. <code>fs.createWriteStream</code>).</li>
          <li><strong>Duplex:</strong> Stream that is both Readable and Writable (e.g. TCP sockets).</li>
          <li><strong>Transform:</strong> Duplex stream where output is computed based on input (e.g. zlib streams).</li>
        </ul>

        <h2 className="text-2xl font-semibold">🛠️ Example: Reading and Writing with Streams</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const fs = require('fs');

// Create a readable stream
const reader = fs.createReadStream('input.txt');

// Create a writable stream
const writer = fs.createWriteStream('output.txt');

// Pipe the read and write operations
reader.pipe(writer);

console.log('File copied using streams.');`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">🔄 Using Events with Streams</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`reader.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});

reader.on('end', () => {
  console.log('Read completed.');
});`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">🧠 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Streams efficiently handle large data by processing it in chunks.</li>
          <li>Use <code>pipe()</code> to chain readable and writable streams.</li>
          <li>Streams are event-based, reacting to <code>data</code>, <code>end</code>, <code>error</code> events.</li>
        </ul>
      </div>
    </div>
  );
};

export default StreamModulePage;
