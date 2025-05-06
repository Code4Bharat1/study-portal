"use client";

const ApiRoutesPage = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">API Routes in Next.js</h1>
        <p className="mb-4">
          Think of API Routes like the kitchen staff behind the scenes at a restaurant. They handle special tasks like preparing ingredients (data), sending orders (requests), and giving back results (responses).
        </p>

        {/* What are API Routes? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are API Routes?</h2>
          <p className="mb-4">
            API Routes in Next.js let you write backend code (like fetching data from a database or sending a message) directly inside your project. It’s like having your frontend and backend in one kitchen!
          </p>
          <p className="mb-4">
            These routes are placed inside a special <code>/pages/api</code> folder, and each file becomes a unique API endpoint.
          </p>
        </section>

        {/* Basic Example */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Basic Example: Hello API</h2>
          <p className="mb-4">
            Here’s how you can make a simple API route that says "Hello!":
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: "Hello from the server!" });
}`}</code>
          </pre>

          <p className="mb-4">
            Visit <code>/api/hello</code> in your browser and you’ll see a JSON message. That’s your backend in action!
          </p>
        </section>

        {/* Real-world Analogy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Analogy: API Route as a Waiter</h2>
          <p className="mb-4">
            Imagine you're in a restaurant. You tell the waiter what you want. The waiter goes to the kitchen, gets your food, and brings it back to you. That's what an API route does — it takes your request, talks to a server or database, and gives you back a response.
          </p>
        </section>

        {/* Handling Methods */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Handling Different Requests (GET, POST)</h2>
          <p className="mb-4">
            Just like you can order different meals (starter, main, dessert), an API can respond to different types of requests: GET (get data), POST (send data), etc.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'This is a GET request' });
  } else if (req.method === 'POST') {
    const data = req.body;
    res.status(200).json({ message: 'Data received', data });
  }
}`}</code>
          </pre>
        </section>

        {/* When to Use API Routes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. When Should You Use API Routes?</h2>
          <p className="mb-4">
            Use API routes when you need to:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Send or receive data from a database</li>
            <li>Handle form submissions</li>
            <li>Connect to third-party APIs (like weather or payments)</li>
          </ul>
        </section>

        {/* Final Notes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Final Notes</h2>
          <p className="mb-4">
            API Routes are like secret behind-the-scenes helpers in your app. They allow you to do powerful backend tasks without setting up a separate server.
          </p>
        </section>

        <p className="italic text-blue-300">
          Backend and frontend in one — that's the magic of Next.js!
        </p>
      </div>
    </div>
  );
};

export default ApiRoutesPage;
