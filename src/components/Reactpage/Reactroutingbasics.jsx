'use client';
import React from 'react';

function Reactroutingbasics() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">React Routing Basics</h1>
      <p className="text-lg text-gray-800 mb-6">
        React Router is the standard library for routing in React. It enables navigation between different components, handling browser history, and dynamic URLs.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Installing React Router</h2>
        <p className="text-gray-800 mb-2">To get started, install the package using:</p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6 text-pink-500">
          <code>npm install react-router-dom</code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Basic Setup</h2>
        <p className="text-gray-800 mb-4">
          Wrap your app in a <code>BrowserRouter</code> and define routes using <code>Routes</code> and <code>Route</code> components:
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Linking Between Pages</h2>
        <p className="text-gray-800 mb-4">
          Use the <code>Link</code> component to navigate between routes without reloading the page:
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Using Route Parameters</h2>
        <p className="text-gray-800 mb-4">
          You can use dynamic segments in your routes (e.g., <code>:id</code>) to render pages based on parameters:
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`<Route path="/user/:id" element={<UserProfile />} />`}
          </code>
        </pre>

        <p className="text-gray-800 mb-4">In the component:</p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Navigate Programmatically</h2>
        <p className="text-gray-800 mb-4">
          Use the <code>useNavigate</code> hook to navigate programmatically (e.g., after form submission):
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // logic
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">404 Page (Not Found)</h2>
        <p className="text-gray-800 mb-4">Use a wildcard <code>*</code> route to display a fallback for unknown URLs:</p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`<Route path="*" element={<NotFound />} />`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Summary</h2>
        <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2">
          <li>Use <code>BrowserRouter</code> to enable routing</li>
          <li>Define routes using <code>Routes</code> and <code>Route</code></li>
          <li>Navigate with <code>Link</code> or <code>useNavigate</code></li>
          <li>Access route params using <code>useParams</code></li>
          <li>Handle 404 pages with <code>path="*"</code></li>
        </ul>

        <button className="mt-8 bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Next: Nested Routing →
        </button>
      </div>
    </div>
  );
}

export default Reactroutingbasics;
