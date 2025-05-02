"use client";
import useReadingTracker from "@/app/hook/useReadingTracker";

export default function ReactHome() { 
  useReadingTracker('reacthome')
    return (
      <div className="p-6 ml-70">
        <h1 className="text-3xl text-gray-800 font-bold mb-4">React Home</h1>
        <p className="text-lg text-gray-800 mb-6">
          Welcome to the React tutorial! In this tutorial, you'll learn the fundamentals of React, a popular JavaScript library for building user interfaces. You'll explore how React allows you to create interactive, reusable components that form the building blocks of a modern web application. This tutorial will guide you step by step through the core concepts of React, starting from the basics to more advanced techniques. By the end, you will have a solid understanding of how to create and manage components, handle state, and work with props. Let's dive into the world of React and start building dynamic web applications together!
        </p>
  
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">Understanding React Components</h2>
  
          <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
            <p>
              In React, components are the building blocks of your UI. Components enable you to split your user interface into smaller, independent, reusable pieces. This modular approach to building UIs makes it easier to manage and maintain your code. Each component is responsible for rendering a part of the UI and can be reused wherever needed. React supports two types of components: functional components and class components. Functional components are the most commonly used in modern React development due to their simplicity and ease of use.
            </p>
  
            <p>
              Here's a simple example of a <strong>functional component</strong>:
            </p>
  
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-300">
  {`function Welcome() {
    return <h1>Hello, React!</h1>;
  }`}
              </code>
            </pre>
  
            <p>
              This is a basic React component that renders a greeting message. Let's break it down to understand each part:
            </p>
  
            <ul className="list-disc list-inside text-gray-800 space-y-2">
              <li><strong>Function Declaration:</strong> The component is declared as a standard JavaScript function using the <code>function</code> keyword.</li>
              <li><strong>Component Name:</strong> By convention, component names start with an uppercase letter. This helps React differentiate between components and HTML elements. In this case, the component is named <code>Welcome</code>.</li>
              <li><strong>Return JSX:</strong> The component returns a JSX element. JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript. It is then transformed into JavaScript that React can understand and render to the DOM.</li>
              <li><strong>Usage:</strong> This component can be used anywhere in your application by including it as <code>&lt;Welcome /&gt;</code>.</li>
            </ul>
  
            <p>
              Components in React help you create maintainable and scalable user interfaces. Instead of writing all the HTML in a single file, React allows you to break your UI into separate, smaller components. Each component is self-contained, meaning it handles its own structure, behavior, and state.
            </p>
  
            <p>
              **Why use components?**
              Components are essential for building modern web applications. They help you organize your code better, make it more readable, and enable you to reuse pieces of the interface. As your application grows, you will need to break it into multiple components. React components can accept inputs called props, and they can also maintain their own state. By breaking down your UI into smaller, isolated components, you improve the overall structure and maintainability of your application.
            </p>
  
            <p>
              **Handling State in React Components**
              In React, state refers to data that can change over time and affect the rendering of a component. When state changes, React re-renders the component to reflect the updated data. For example, a counter component might display a number that increases every time a button is clicked. The counter's value is part of its state. Here's an example of how you can add state to a functional component using the <code>useState</code> hook:
            </p>
  
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-400">
  {`import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    const increment = () => setCount(count + 1);
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increase</button>
      </div>
    );
  }`}
              </code>
            </pre>
  
            <p>
              In this example, the <code>useState</code> hook is used to create state within the <code>Counter</code> component. The <code>useState(0)</code> call initializes the state with a value of 0, and the <code>setCount</code> function is used to update the count when the button is clicked. When the state changes, the component re-renders to reflect the updated count value.
            </p>
  
            <p>
              **Props: Passing Data Between Components**
              In React, components can communicate with each other through props. Props are values passed to a component by its parent, and they allow you to configure and customize the component's behavior. Here's an example of passing props to a child component:
            </p>
  
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-pink-400">
  {`function ParentComponent() {
    return <ChildComponent message="Hello from parent!" />;
  }
  
  function ChildComponent({ message }) {
    return <p>{message}</p>;
  }`}
              </code>
            </pre>
  
            <p>
              In this example, the <code>ParentComponent</code> passes a prop called <code>message</code> to the <code>ChildComponent</code>. The <code>ChildComponent</code> then receives this prop and renders it in the UI. This is how data flows from parent to child components in React.
            </p>
  
            <p>
              React components are powerful because they allow you to build complex UIs by composing smaller, simpler components. They promote code reuse and make it easier to manage and update your application over time. As you continue learning React, you'll encounter more advanced features such as hooks, context, and lifecycle methods, which will help you build even more dynamic and interactive applications.
            </p>
  
            <p>
              Now that we've covered the basics of React components, it's time to dive deeper into the advanced topics, such as managing state, handling events, and interacting with APIs. Keep experimenting with different components and try building your own React applications as you go. The more you practice, the more proficient you'll become at React.
            </p>
          </div>
  
          <button className="mt-8 bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-700">
            Learn Next Concept
          </button>
        </div>
      </div>
    );
  }
  