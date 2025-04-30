import React from 'react';

function Epressrouteparameters() {
  return (
    <div className="p-6 ml-72">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Express Route Parameters</h1>
      
      <p className="text-lg text-gray-800 mb-6">
        Route parameters are named URL segments used to capture the values specified at their position in the URL. They are used to pass data to routes.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Basic Example</h2>
        <p className="mb-4">
          Suppose you want to access a user by their ID. You can define a route like this:
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-yellow-600">
{`app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(\`User ID is: \${userId}\`);
});`}
          </code>
        </pre>

        <p className="mb-6">
          Here, <code className="bg-yellow-200 px-1 rounded">:userId</code> is a route parameter. When you visit <code className="bg-yellow-200 px-1 rounded">/users/42</code>, the response will be <strong>User ID is: 42</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Multiple Parameters</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-yellow-600">
{`app.get('/users/:userId/books/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  res.send(\`User ID: \${userId}, Book ID: \${bookId}\`);
});`}
          </code>
        </pre>
        <p className="mb-6">
          Visit <code className="bg-yellow-200 px-1 rounded">/users/10/books/5</code> to get the output: <strong>User ID: 10, Book ID: 5</strong>.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Accessing Parameters</h2>
        <p className="mb-6">
          Route parameters are accessed using <code className="bg-yellow-200 px-1 rounded">req.params</code>, which returns an object containing all parameters as key-value pairs.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Optional Parameters</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-yellow-600">
{`app.get('/items/:itemId?', (req, res) => {
  const itemId = req.params.itemId;
  if (itemId) {
    res.send(\`Item ID: \${itemId}\`);
  } else {
    res.send('No Item ID provided.');
  }
});`}
          </code>
        </pre>

        <p className="mb-6">
          The <code className="bg-yellow-200 px-1 rounded">?</code> makes the parameter optional.
        </p>
      </div>
    </div>
  );
}

export default Epressrouteparameters;
