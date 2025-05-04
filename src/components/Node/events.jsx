'use client';

const EventModulePage = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Node.js Event Module</h1>
        <p className="text-lg">
          The <code>events</code> module in Node.js allows you to work with events and event-driven architecture. It’s a built-in module that lets you create, fire, and listen for your own events.
        </p>

        <h2 className="text-2xl font-semibold">Importing the Event Module</h2>
        <p className="text-lg">Use the <code>require()</code> function to load the <code>events</code> module and create an instance of <code>EventEmitter</code>:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const events = require('events');
const eventEmitter = new events.EventEmitter();`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Creating and Listening to Events</h2>
        <p className="text-lg">Define a function to run when an event is triggered, and then emit the event:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`// Listener function
const greetUser = () => {
  console.log('Hello! Welcome to Node.js events.');
};

// Bind the event with the listener
eventEmitter.on('greet', greetUser);

// Trigger the event
eventEmitter.emit('greet');`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Passing Arguments to Event Listeners</h2>
        <p className="text-lg">You can also pass parameters when emitting events:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`eventEmitter.on('orderPlaced', (item, quantity) => {
  console.log(\`Order received: \${quantity} x \${item}\`);
});

eventEmitter.emit('orderPlaced', 'Pizza', 2);`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">📦 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The <code>events</code> module is built-in and used for handling events.</li>
          <li>Create an event emitter using <code>new events.EventEmitter()</code>.</li>
          <li>Use <code>.on()</code> to listen for an event and <code>.emit()</code> to trigger it.</li>
          <li>You can pass arguments to listeners using <code>.emit()</code>.</li>
        </ul>
      </div>
    </div>
  );
};

export default EventModulePage;
