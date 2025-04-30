"use client"
import React, { useState } from 'react';

const questionsWithAnswers = [
  {
    question: "What is Express.js?",
    answer: "Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications."
  },
  {
    question: "How do you create a basic Express server?",
    answer: "You create an Express server by requiring Express, creating an app with `express()`, and calling `app.listen(port)`."
  },
  {
    question: "What is middleware in Express?",
    answer: "Middleware functions are functions that have access to the request and response objects and the next middleware function in the application’s request-response cycle."
  },
  {
    question: "How do you handle routing in Express?",
    answer: "You use `app.get()`, `app.post()`, `app.put()`, `app.delete()` for handling different routes."
  },
  {
    question: "How do you serve static files with Express?",
    answer: "You can use `express.static()` middleware to serve static files like images, CSS, JavaScript, etc."
  },
  {
    question: "What are the benefits of using Express?",
    answer: "Express is fast, unopinionated, has a large ecosystem, and simplifies the process of building APIs and web servers."
  },
  {
    question: "How do you handle errors in Express?",
    answer: "You can handle errors using a middleware with four parameters: `err, req, res, next`."
  },
  {
    question: "What is `app.use()` in Express?",
    answer: "`app.use()` is used to mount middleware functions at a path."
  },
  {
    question: "How can you use a router in Express?",
    answer: "You create a router using `express.Router()` and define routes on it, then mount it with `app.use()`."
  },
  {
    question: "How do you handle form data in Express?",
    answer: "You use `express.urlencoded()` and `express.json()` middleware to parse form data and JSON."
  },
  {
    question: "What is `req.params` in Express?",
    answer: "`req.params` contains route parameters from the URL."
  },
  {
    question: "What is `req.query` in Express?",
    answer: "`req.query` contains query parameters sent in the URL."
  },
  {
    question: "How do you create a REST API using Express?",
    answer: "You define endpoints for HTTP methods (GET, POST, PUT, DELETE) to interact with your resources."
  },
  {
    question: "What is the difference between `app.get()` and `app.post()`?",
    answer: "`app.get()` handles HTTP GET requests, while `app.post()` handles HTTP POST requests."
  },
  {
    question: "How do you set headers in Express?",
    answer: "You use `res.set()` or `res.header()` to set HTTP headers."
  },
  {
    question: "How do you manage cookies in Express?",
    answer: "You can use the `cookie-parser` middleware to read and set cookies."
  },
  {
    question: "What is CORS and how do you enable it in Express?",
    answer: "CORS (Cross-Origin Resource Sharing) allows you to control which domains can access your API. Use the `cors` package to enable it."
  },
  {
    question: "How do you connect a database to an Express app?",
    answer: "You use a database driver or ORM (like Mongoose for MongoDB) and connect inside your app."
  },
  {
    question: "How do you secure an Express app?",
    answer: "Use helmet, CORS, input validation, HTTPS, and authentication to secure your app."
  },
  {
    question: "What is `next()` in middleware functions?",
    answer: "`next()` is a function that passes control to the next middleware in the stack."
  },
];

const QuestionExpress = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Express.js Interview Questions</h1>
      <div className="space-y-4">
        {questionsWithAnswers.map((item, index) => (
          <div key={index} className="border rounded-2xl shadow p-4 transition-all">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left flex justify-between items-center font-medium text-lg"
            >
              {item.question}
              <span className="text-gray-500 text-xl">{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionExpress;
