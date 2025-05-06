'use client';
import useReadingTracker from '@/app/hook/useReadingTracker';
import React from 'react';

function ExpressRouteParameters() {
  useReadingTracker('expressparams');
  
  return (
    <div className="p-6 ml-72">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Express Route Parameters: A Beginner's Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">What Are Route Parameters?</h2>
        <p className="text-lg text-gray-800 mb-4">
          Route parameters are like special placeholders in website addresses that help your application understand what specific information to show.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Real-world example:</strong> Imagine a library website where:</p>
          <ul className="list-disc pl-6">
            <li><code>/books/123</code> shows book with ID 123</li>
            <li><code>/books/456</code> shows book with ID 456</li>
          </ul>
          <p className="mt-2">Instead of creating separate pages for each book, we use one route that adapts based on the parameter!</p>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Your First Route Parameter</h2>
        
        <div className="mb-4">
          <p>Here's how to create a simple user profile route:</p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mt-2">
            <code className="text-yellow-600">
{`app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(\`User ID is: \${userId}\`);
});`}
            </code>
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">How It Works:</h3>
            <ol className="list-decimal pl-5">
              <li><code>:userId</code> is our parameter placeholder</li>
              <li>Express captures whatever comes after <code>/users/</code></li>
              <li>We access it with <code>req.params.userId</code></li>
            </ol>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Try It Out:</h3>
            <p>If you visit:</p>
            <ul className="list-disc pl-5">
              <li><code>/users/42</code> → Shows "User ID is: 42"</li>
              <li><code>/users/alice</code> → Shows "User ID is: alice"</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Multiple Parameters</h2>
        
        <p className="mb-4">You can have multiple parameters in one route:</p>
        
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
          <code className="text-yellow-600">
{`app.get('/users/:userId/books/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  res.send(\`User ID: \${userId}, Book ID: \${bookId}\`);
});`}
          </code>
        </pre>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">How This Works:</h3>
          <ul className="list-disc pl-5">
            <li><code>:userId</code> captures the user ID</li>
            <li><code>:bookId</code> captures the book ID</li>
            <li>We use object destructuring to get both values at once</li>
          </ul>
          <p className="mt-2"><strong>Example:</strong> <code>/users/10/books/5</code> shows "User ID: 10, Book ID: 5"</p>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Optional Parameters</h2>
        
        <p className="mb-4">Sometimes you want parameters to be optional (not required):</p>
        
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">With Parameter:</h3>
            <p><code>/items/15</code></p>
            <p>Shows: "Item ID: 15"</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Without Parameter:</h3>
            <p><code>/items</code></p>
            <p>Shows: "No Item ID provided."</p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Why Use Route Parameters?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">1. Clean URLs</h3>
            <p>Makes web addresses easy to read and remember compared to query parameters like <code>?id=123</code></p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">2. Dynamic Content</h3>
            <p>Lets one route handle many different cases without repeating code</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">3. Better Organization</h3>
            <p>Helps structure your application in a logical way</p>
          </div>
        </div>
        
        <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Practice Exercise:</h3>
          <p>Try creating these routes:</p>
          <ol className="list-decimal pl-5 mt-2">
            <li>A product page route that shows different products (<code>/products/:productId</code>)</li>
            <li>A blog route with optional category (<code>/blog/:category?</code>)</li>
            <li>A user dashboard with multiple parameters (<code>/users/:userId/dashboard/:tab</code>)</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

export default ExpressRouteParameters;