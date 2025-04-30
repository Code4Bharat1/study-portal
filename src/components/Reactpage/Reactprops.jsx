"use client";
import React, { useState } from 'react';

export default function Reactprops() {
  // Example of state usage
  const [count, setCount] = useState(0); // Declaring state for the count

  // Function to handle state change
  const handleClick = () => {
    setCount(count + 1); // Increment the count value
  };

  // Function to reset the count to 0
  const handleReset = () => {
    setCount(0); // Reset the count value to 0
  };

  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Understanding React Props and State</h1>
      
      {/* Displaying count (State) */}
      <p className="text-lg text-gray-800 mb-6">
        Current count: {count}
      </p>

      {/* Increment Button */}
      <button
        className="bg-pink-500 text-white p-2 rounded-md mr-4"
        onClick={handleClick}
      >
        Increment Count
      </button>

      {/* Reset Button */}
      <button
        className="bg-pink-300 text-white p-2 rounded-md"
        onClick={handleReset}
      >
        Reset Count
      </button>

      <p className="text-lg text-gray-800 mt-6">
        Props (short for "properties") are an essential part of React, enabling communication between components...
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-pink-400 mb-4">What are Props?</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            In React, props are the inputs to a component. They are passed from the parent component to the child component and are used to configure the child. Props are read-only, meaning they cannot be changed by the child component, but the child can use them to render UI or even pass them down further to other child components.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">How Props Work</h3>
          <p>
            When you create a React component, you can define props that it can accept. These props are passed from the parent component and are available in the child component as an object. The child component can access and display or manipulate these props, but it cannot modify them.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`function ParentComponent() {
  return <ChildComponent message="Hello from parent!" />;
}

function ChildComponent(props) {
  return <p>{props.message}</p>;
}`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">Accessing Props in Child Components</h3>
          <p>
            Inside a child component, props are accessed through the <code>props</code> object. This object contains all the props that were passed down from the parent. You can access individual props using <code>props.propName</code>, where <code>propName</code> is the name of the prop.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">State Example</h3>
          <p>
            Here's an example where we use state to store and change the value of the count when the button is clicked:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`}
            </code>
          </pre>

          <p>
            In this example, the component has state that tracks the count. The state is updated when the user clicks the button.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">Destructuring Props for Simplicity</h3>
          <p>
            Instead of accessing props through <code>props.propName</code>, you can use JavaScript destructuring to extract individual props directly in the function parameters. This makes your code cleaner and easier to read.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}`}
            </code>
          </pre>

          <p>
            In this example, instead of accessing props using <code>props.name</code> and <code>props.age</code>, we destructure the props directly in the function parameters, which simplifies the syntax.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">Default Props</h3>
          <p>
            Sometimes, you may want to provide default values for props if they are not passed from the parent. React allows you to define default values for props using the <code>defaultProps</code> property.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

ChildComponent.defaultProps = {
  name: 'Anonymous',
  age: 30
};`}
            </code>
          </pre>

          <p>
            In this example, if the <code>name</code> and <code>age</code> props are not passed by the parent, the component will use the default values specified in <code>defaultProps</code>.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">Prop Types: Validating Props</h3>
          <p>
            React allows you to validate the props that are passed to a component using the <code>PropTypes</code> library. This helps ensure that the correct type of data is passed, and it can be useful for debugging.
          </p>

          <p>
            To use <code>PropTypes</code>, you need to install the <code>prop-types</code> package, then define the expected types for each prop.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`import PropTypes from 'prop-types';

function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

ChildComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};`}
            </code>
          </pre>

          <p>
            In this example, we use <code>PropTypes.string</code> to validate that the <code>name</code> prop is a string and <code>PropTypes.number</code> to validate that the <code>age</code> prop is a number. The <code>isRequired</code> modifier makes the prop mandatory.
          </p>

          <h3 className="text-xl font-semibold text-pink-300 mb-2">Passing Functions as Props</h3>
          <p>
            In React, you can also pass functions as props. This allows the parent component to pass down behavior that the child component can invoke. This is useful for handling events or modifying the parent component's state from a child.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-pink-300">
              {`function ParentComponent() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <ChildComponent onClick={handleClick} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}`}
            </code>
          </pre>

          <p>
            In this example, the <code>ParentComponent</code> passes a function <code>handleClick</code> as a prop called <code>onClick</code> to the <code>ChildComponent</code>. The child component then calls this function when the button is clicked, triggering the alert.
          </p>
        </div>
      </div>
    </div>
  );
}
