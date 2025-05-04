'use client';
import useReadingTracker from '@/components/useReadingTracker';
import React from 'react';

function Reactusestate() {
  useReadingTracker('reactusestate');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Understanding useState in React</h1>
      <p className="text-lg text-gray-800 mb-6">
        The <code>useState</code> hook is one of the most fundamental hooks provided by React. It allows functional components to hold onto and manage state. Without it, functional components would be stateless and static. Let's dive deep into how <code>useState</code> works and how you can effectively use it in your React applications.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-pink-400 mb-4">What is State?</h2>
        <p className="text-gray-800 mb-6">
          State is a JavaScript object that stores dynamic data and information about the component. It influences what gets rendered on the screen. When the state of a component changes, React automatically re-renders the component to reflect those changes.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Syntax of useState</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`const [state, setState] = useState(initialState);`}
          </code>
        </pre>

        <p className="text-gray-800 mb-6">
          - <strong>state:</strong> The current value of the state.<br/>
          - <strong>setState:</strong> A function that lets you update the state.<br/>
          - <strong>initialState:</strong> The initial value you want to assign to the state.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Simple Example</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;`}
          </code>
        </pre>

        <p className="text-gray-800 mb-6">
          In this example, the state variable <code>count</code> is initialized with <code>0</code>. When the button is clicked, <code>setCount</code> updates the count, and the component re-renders automatically with the new value.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Multiple useState Calls</h2>
        <p className="text-gray-800 mb-6">
          You can call <code>useState</code> multiple times to manage multiple state variables within a single component.
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`function UserProfile() {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(25);

  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Updating State Based on Previous State</h2>
        <p className="text-gray-800 mb-6">
          Sometimes you need to update the state based on its previous value. In such cases, use the callback form of <code>setState</code>.
        </p>

        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`setCount(prevCount => prevCount + 1);`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Keep state minimal and only store what's necessary.</li>
          <li>When dealing with complex objects or arrays, prefer immutability (spread operator or array methods).</li>
          <li>Separate unrelated pieces of state into different useState calls.</li>
          <li>Use the callback version of setState when the new state depends on the previous one.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Common Mistakes</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Mutating state directly (never do <code>state.value++</code>).</li>
          <li>Forgetting that <code>useState</code> updates are asynchronous.</li>
          <li>Calling the state setter incorrectly (should not call it outside event handlers/render cycle).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-400 mb-4">Conclusion</h2>
        <p className="text-gray-800 mb-6">
          The <code>useState</code> hook is an essential tool in the React developer's toolkit. Mastering it will allow you to build interactive, dynamic, and responsive web applications. Start by practicing with simple counters, toggles, and forms, and then move on to more complex state management scenarios.
        </p>

        <button className="mt-8 bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Learn About useEffect →
        </button>
      </div>
    </div>
  );
}

export default Reactusestate;
