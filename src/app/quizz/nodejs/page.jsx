'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NodeJSQuizPage() {
  const router = useRouter();
  const quizType = 'nodejs';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'What is Node.js?',
      options: ['A front-end framework', 'A JavaScript runtime', 'A database', 'A CSS preprocessor'],
      correctAnswer: 'A JavaScript runtime',
    },
    {
      question: 'Which module creates an HTTP server in Node.js?',
      options: ['fs', 'http', 'path', 'url'],
      correctAnswer: 'http',
    },
    {
      question: 'What is the purpose of the `package.json` file in Node.js?',
      options: ['Store application code', 'Manage dependencies', 'Define routes', 'Handle database connections'],
      correctAnswer: 'Manage dependencies',
    },
    {
      question: 'What is the Event Loop in Node.js?',
      options: ['A database query', 'A routing mechanism', 'A process for handling asynchronous tasks', 'A UI component'],
      correctAnswer: 'A process for handling asynchronous tasks',
    },
    {
      question: 'Which module handles file operations in Node.js?',
      options: ['fs', 'http', 'os', 'path'],
      correctAnswer: 'fs',
    },
    {
      question: 'What does `npm` stand for?',
      options: ['Node Package Manager', 'New Package Module', 'Node Project Manager', 'Node Process Module'],
      correctAnswer: 'Node Package Manager',
    },
    {
      question: 'How do you export a module in Node.js?',
      options: ['export default', 'module.exports', 'export', 'require()'],
      correctAnswer: 'module.exports',
    },
    {
      question: 'What is the purpose of `require()` in Node.js?',
      options: ['Import modules', 'Export modules', 'Run the server', 'Handle events'],
      correctAnswer: 'Import modules',
    },
    {
      question: 'Which module parses URLs in Node.js?',
      options: ['url', 'path', 'fs', 'http'],
      correctAnswer: 'url',
    },
    {
      question: 'What is a callback in Node.js?',
      options: ['A database query', 'A function passed as an argument', 'A routing method', 'A server response'],
      correctAnswer: 'A function passed as an argument',
    },
    {
      question: 'What is the default module system in Node.js?',
      options: ['ES Modules', 'CommonJS', 'AMD', 'SystemJS'],
      correctAnswer: 'CommonJS',
    },
    {
      question: 'Which command installs a package locally in Node.js?',
      options: ['npm install', 'npm add', 'npm get', 'npm fetch'],
      correctAnswer: 'npm install',
    },
    {
      question: 'What does the `process` object provide in Node.js?',
      options: ['File operations', 'Environment information', 'HTTP methods', 'Routing'],
      correctAnswer: 'Environment information',
    },
    {
      question: 'Which module provides operating system information in Node.js?',
      options: ['os', 'fs', 'path', 'http'],
      correctAnswer: 'os',
    },
    {
      question: 'What is a Promise in Node.js?',
      options: ['A database connection', 'An object for asynchronous operations', 'A routing method', 'A styling tool'],
      correctAnswer: 'An object for asynchronous operations',
    },
    {
      question: 'How do you handle errors in Node.js callbacks?',
      options: ['try-catch', 'Error-first callback', 'throw Error', 'res.error()'],
      correctAnswer: 'Error-first callback',
    },
    {
      question: 'What is the purpose of `async/await` in Node.js?',
      options: ['Handle synchronous code', 'Simplify asynchronous code', 'Manage state', 'Render templates'],
      correctAnswer: 'Simplify asynchronous code',
    },
    {
      question: 'Which command runs a Node.js script?',
      options: ['node script.js', 'run script.js', 'start script.js', 'execute script.js'],
      correctAnswer: 'node script.js',
    },
    {
      question: 'What is the `cluster` module used for in Node.js?',
      options: ['File operations', 'Multi-threading', 'Load balancing', 'Database connections'],
      correctAnswer: 'Load balancing',
    },
    {
      question: 'What does `path.join()` do in Node.js?',
      options: ['Joins arrays', 'Concatenates path segments', 'Parses URLs', 'Handles events'],
      correctAnswer: 'Concatenates path segments',
    },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setFeedback({ isCorrect, correctAnswer: questions[currentQuestion].correctAnswer });
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setQuizCompleted(true);
        const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
        const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
        scores[user.email] = scores[user.email] || {};
        scores[user.email][quizType] = score + (isCorrect ? 1 : 0);
        localStorage.setItem('quizScores', JSON.stringify(scores));
      }
    }, 1500);
  };

  const handleContinue = () => {
    router.push('/quizz/quizzes');
  };

  const handleStop = () => {
    router.push('/quizz/results');
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-4">🎉 Quiz Completed!</h1>
          <p className="text-xl font-medium text-gray-700 mb-6">
            You scored <span className="font-bold text-blue-600">{score}</span> out of {questions.length}
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-2 rounded-xl shadow-lg"
            >
              Stop
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-2 rounded-xl shadow-lg"
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-600">Node.js Quiz</h1>
          <span className="text-gray-500 font-medium">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
                className={`w-full px-5 py-4 text-left rounded-xl border transition-all duration-300 ${
                  selectedOption === option
                    ? feedback?.isCorrect
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-red-100 border-red-400 text-red-800'
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 px-6 py-4 rounded-xl font-medium text-center shadow ${
              feedback.isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback.isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${feedback.correctAnswer}`}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}