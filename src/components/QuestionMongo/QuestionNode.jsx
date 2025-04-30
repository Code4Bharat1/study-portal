"use client";
import React, { useState } from "react";

const questionsWithAnswers = [
  {
    question: "What is Node.js?",
    answer: "Node.js is a runtime environment that allows you to run JavaScript on the server side using the V8 engine."
  },
  {
    question: "What is the difference between Node.js and JavaScript?",
    answer: "JavaScript is a programming language; Node.js is a runtime to execute JavaScript outside the browser."
  },
  {
    question: "What is the event loop in Node.js?",
    answer: "The event loop is a mechanism that handles asynchronous operations in Node.js using callbacks and non-blocking I/O."
  },
  {
    question: "What is a callback function?",
    answer: "A callback is a function passed into another function to be executed later, often after an asynchronous operation."
  },
  {
    question: "What is npm?",
    answer: "npm (Node Package Manager) is the default package manager for Node.js, used to install and manage packages."
  },
  {
    question: "What is the difference between synchronous and asynchronous functions in Node.js?",
    answer: "Synchronous functions block code execution until they finish, while asynchronous functions do not."
  },
  {
    question: "What is the role of 'require' in Node.js?",
    answer: "`require` is used to import modules, JSON, and local files in a Node.js application."
  },
  {
    question: "What is a buffer in Node.js?",
    answer: "A buffer is a temporary storage area for binary data, used when reading from or writing to a stream."
  },
  {
    question: "What are streams in Node.js?",
    answer: "Streams are objects used to read or write data in chunks, enabling efficient processing of large data sets."
  },
  {
    question: "What is the difference between process.nextTick() and setImmediate()?",
    answer: "`process.nextTick()` executes before any I/O events, while `setImmediate()` executes after the current poll phase."
  },
  {
    question: "How do you handle exceptions in Node.js?",
    answer: "You can handle exceptions using try/catch blocks and 'process.on(\"uncaughtException\")' for uncaught errors."
  },
  {
    question: "What is middleware in Node.js?",
    answer: "Middleware refers to functions that process requests before they reach the final route handler (especially in Express)."
  },
  {
    question: "What are environment variables in Node.js?",
    answer: "Environment variables store configuration data and can be accessed via `process.env`."
  },
  {
    question: "How do you read files in Node.js?",
    answer: "You can read files using the `fs` module with methods like `fs.readFile()` and `fs.createReadStream()`."
  },
  {
    question: "What is the purpose of the 'fs' module?",
    answer: "The `fs` module allows you to interact with the file system, including reading and writing files."
  },
  {
    question: "What is clustering in Node.js?",
    answer: "Clustering allows Node.js to use multiple cores by creating child processes that share the same server port."
  },
  {
    question: "How can you make a simple HTTP server in Node.js?",
    answer: "Use the built-in `http` module to create a server using `http.createServer()` and listen on a port."
  },
  {
    question: "What is the 'path' module used for?",
    answer: "The `path` module provides utilities for working with file and directory paths."
  },
  {
    question: "How do you export a function or object in Node.js?",
    answer: "You export using `module.exports` and import it using `require()` in another file."
  },
  {
    question: "What is the role of the 'util' module in Node.js?",
    answer: "The `util` module provides utility functions like `promisify()` to convert callback-based functions to promises."
  }
];

const QuestionNode = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="relative min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Node.js Interview Questions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

export default QuestionNode;

