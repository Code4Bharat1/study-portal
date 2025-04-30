'use client'

const NodeIntroPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10"> {/* Updated to shadow-xl for a more pronounced shadow */}
        <h1 className="text-4xl font-bold">Node.js Introduction</h1>
        <p className="text-lg">What is Node.js?</p>
        <p>
          Node.js is an open-source, cross-platform JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
        </p>
        <p>
          Traditionally, JavaScript was used only for client-side scripting in web browsers. With Node.js, you can now write JavaScript on the **server-side** as well.
        </p>

        <h2 className="text-2xl font-semibold">Why Use Node.js?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Fast execution powered by Google Chrome's V8 engine.</li>
          <li>Uses a non-blocking, event-driven architecture.</li>
          <li>Ideal for building scalable network applications.</li>
          <li>Single programming language (JavaScript) for both frontend and backend.</li>
          <li>Large ecosystem of open-source packages using npm (Node Package Manager).</li>
        </ul>

        <h2 className="text-2xl font-semibold">Features of Node.js</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Asynchronous and Event Driven:</strong> Node.js APIs are non-blocking, meaning the server doesn't wait for an API to return data.</li>
          <li><strong>Very Fast:</strong> Built on Google Chrome’s V8 engine, making it very fast in code execution.</li>
          <li><strong>Single Threaded but Highly Scalable:</strong> Uses a single-threaded model with event looping for scalability.</li>
          <li><strong>No Buffering:</strong> Node.js applications never buffer any data – it simply outputs the data in chunks.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Where is Node.js Used?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real-time web apps (chat apps, live updates)</li>
          <li>RESTful APIs and backend services</li>
          <li>Single-page applications (SPAs)</li>
          <li>Streaming applications</li>
          <li>IoT and embedded devices</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Simple Console Log</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`console.log('Welcome to Node.js!');
console.log('This is your first server-side JavaScript code.');`}
          </code>
        </pre>

        <p className="italic text-blue-300">Run this in a terminal using <code>node filename.js</code></p>
      </div>
    </div>
  );
};

export default NodeIntroPage;
