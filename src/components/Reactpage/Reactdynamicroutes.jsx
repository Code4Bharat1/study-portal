'use client';
import React from 'react';

function Reactdynamicroutes() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">React Dynamic Routing</h1>
      <p className="text-lg text-gray-800 mb-6">
        Dynamic Routing allows us to create routes that are flexible and can change based on the URL parameters. In React, this is typically handled using <span className="text-pink-500 font-semibold">React Router</span>.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        {/* Setting up Dynamic Routes */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">1. Setting Up Dynamic Routes</h2>
        <p className="text-gray-800 mb-4">
          In React Router, you can create dynamic segments in the URL using a colon (<code>:</code>) followed by the parameter name:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}`}
          </code>
        </pre>

        {/* Accessing Route Parameters */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">2. Accessing Route Parameters</h2>
        <p className="text-gray-800 mb-4">
          Inside the routed component, use the <code>useParams</code> hook to access dynamic parameters:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  return <h2>User ID: {id}</h2>;
}

export default UserProfile;`}
          </code>
        </pre>

        {/* Nested Dynamic Routes */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">3. Nested Dynamic Routes</h2>
        <p className="text-gray-800 mb-4">
          You can also nest dynamic routes inside other routes. Example:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`<Route path="/user/:id" element={<UserProfile />}>
  <Route path="settings" element={<UserSettings />} />
</Route>`}
          </code>
        </pre>

        {/* Dynamic Route Navigation */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">4. Dynamic Navigation using Link</h2>
        <p className="text-gray-800 mb-4">
          You can navigate dynamically by setting the <code>to</code> prop in the <code>Link</code> component:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { Link } from 'react-router-dom';

<Link to="/user/42">View User 42</Link>`}
          </code>
        </pre>

        {/* Query Parameters */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">5. Handling Query Parameters</h2>
        <p className="text-gray-800 mb-4">
          For query parameters (like <code>?sort=asc</code>), use the <code>useLocation</code> hook:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { useLocation } from 'react-router-dom';

function SearchPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sort = queryParams.get('sort');

  return <div>Sorting by: {sort}</div>;
}`}
          </code>
        </pre>

        {/* Example Real-World Use Case */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">6. Real-World Example: Blog Posts</h2>
        <p className="text-gray-800 mb-4">
          Dynamic routes are useful for blogs, where each post has a unique ID or slug:
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li><code>/blog/post-1</code></li>
          <li><code>/blog/post-2</code></li>
          <li><code>/blog/post-3</code></li>
        </ul>
        <p className="text-gray-800 mb-4">
          Each of these URLs could map to a component fetching and displaying different content dynamically based on the ID or slug.
        </p>

        {/* Key Points */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Summary of Dynamic Routes</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Use <span className="text-pink-500 font-semibold">params</span> to capture dynamic values in URLs.</li>
          <li>Use <span className="text-pink-500 font-semibold">useParams</span> to access those values inside components.</li>
          <li>Use <span className="text-pink-500 font-semibold">Link</span> or <span className="text-pink-500 font-semibold">navigate</span> for dynamic navigation.</li>
          <li>Handle query strings with <span className="text-pink-500 font-semibold">useLocation</span> and <span className="text-pink-500 font-semibold">URLSearchParams</span>.</li>
        </ul>

        <button className="mt-8 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Next: Dynamic Routes with Data Fetching →
        </button>
      </div>
    </div>
  );
}

export default Reactdynamicroutes;
