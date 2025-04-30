"use client";
import React, { useState } from "react";

const questionsWithAnswers = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces, especially single-page applications."
  },
  {
    question: "What are components in React?",
    answer: "Components are reusable pieces of UI in React that can be functional or class-based."
  },
  {
    question: "What is JSX?",
    answer: "JSX stands for JavaScript XML. It allows writing HTML in React using JavaScript syntax."
  },
  {
    question: "What is the virtual DOM?",
    answer: "The virtual DOM is a lightweight JavaScript representation of the actual DOM, used for efficient updates."
  },
  {
    question: "What are props in React?",
    answer: "Props are inputs to components that allow data to be passed from parent to child."
  },
  {
    question: "What is state in React?",
    answer: "State is a built-in object that stores dynamic data in a component and re-renders the UI on change."
  },
  {
    question: "What is the difference between props and state?",
    answer: "Props are read-only and passed from parent to child, while state is managed within a component."
  },
  {
    question: "What is a React hook?",
    answer: "Hooks are functions that let you use state and other React features in functional components."
  },
  {
    question: "What does useEffect do?",
    answer: "`useEffect` runs side effects like data fetching, subscriptions, or DOM manipulation."
  },
  {
    question: "What is useState?",
    answer: "`useState` is a React hook that lets you add state to functional components."
  },
  {
    question: "What are keys in React lists?",
    answer: "Keys help React identify which items have changed, are added, or are removed in lists."
  },
  {
    question: "What is conditional rendering?",
    answer: "Conditional rendering lets you show different UI elements based on conditions."
  },
  {
    question: "How do you handle events in React?",
    answer: "You attach event handlers like `onClick`, and define functions to respond to those events."
  },
  {
    question: "What is lifting state up?",
    answer: "Lifting state up means moving state to the closest common ancestor of components that share it."
  },
  {
    question: "What is context in React?",
    answer: "Context provides a way to pass data through the component tree without props drilling."
  },
  {
    question: "What is React Router?",
    answer: "React Router is a library for handling routing in React applications."
  },
  {
    question: "What is memoization in React?",
    answer: "Memoization (e.g., using `React.memo`, `useMemo`) optimizes performance by caching values or components."
  },
  {
    question: "What is a controlled component?",
    answer: "A controlled component is a form input whose value is controlled by React state."
  },
  {
    question: "What are fragments in React?",
    answer: "Fragments let you return multiple elements without adding extra nodes to the DOM."
  },
  {
    question: "What is reconciliation in React?",
    answer: "Reconciliation is the process React uses to compare the new virtual DOM with the old one and apply changes."
  }
];

const QuestionReact = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="relative min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">React.js Interview Questions</h1>
      <div className="space-y-4">
        {questionsWithAnswers.map((item, index) => (
          <div key={index} className="border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md p-4 shadow-lg transition-all text-black">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left flex justify-between items-center font-medium text-lg"
            >
              {item.question}
              <span className="text-black text-xl">{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-black/90">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionReact;
