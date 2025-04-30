'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpressQuizPage() {
  const router = useRouter();
  const quizType = 'express';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'What is Express.js?',
      options: ['A database', 'A web framework for Node.js', 'A front-end library', 'A testing tool'],
      correctAnswer: 'A web framework for Node.js',
    },
    {
      question: 'Which method handles HTTP GET requests in Express?',
      options: ['app.post()', 'app.get()', 'app.put()', 'app.delete()'],
      correctAnswer: 'app.get()',
    },
    {
      question: 'What is middleware in Express?',
      options: ['A database connector', 'A function that processes requests', 'A routing protocol', 'A template engine'],
      correctAnswer: 'A function that processes requests',
    },
    {
      question: 'What does `app.use()` do in Express?',
      options: ['Defines a route', 'Mounts middleware', 'Sends a response', 'Creates a server'],
      correctAnswer: 'Mounts middleware',
    },
    {
      question: 'Which Express method sends a JSON response?',
      options: ['res.send()', 'res.json()', 'res.render()', 'res.redirect()'],
      correctAnswer: 'res.json()',
    },
    {
      question: 'How do you access URL parameters in Express?',
      options: ['req.query', 'req.params', 'req.body', 'req.url'],
      correctAnswer: 'req.params',
    },
    {
      question: 'What is the purpose of `express.Router()`?',
      options: ['Handle HTTP methods', 'Create modular routes', 'Parse JSON', 'Serve static files'],
      correctAnswer: 'Create modular routes',
    },
    {
      question: 'Which middleware parses incoming JSON payloads?',
      options: ['express.json()', 'express.urlencoded()', 'express.static()', 'express.cookie()'],
      correctAnswer: 'express.json()',
    },
    {
      question: 'How do you serve static files in Express?',
      options: ['express.static()', 'express.file()', 'express.serve()', 'express.assets()'],
      correctAnswer: 'express.static()',
    },
    {
      question: 'What is the default port for an Express server?',
      options: ['8080', '3000', '5000', '27017'],
      correctAnswer: '3000',
    },
    {
      question: 'Which method redirects a request in Express?',
      options: ['res.redirect()', 'res.send()', 'res.render()', 'res.json()'],
      correctAnswer: 'res.redirect()',
    },
    {
      question: 'What does `next()` do in Express middleware?',
      options: ['Sends a response', 'Calls the next middleware', 'Ends the request', 'Parses the request'],
      correctAnswer: 'Calls the next middleware',
    },
    {
      question: 'How do you handle errors in Express?',
      options: ['try-catch', 'Error middleware', 'res.error()', 'throw Error'],
      correctAnswer: 'Error middleware',
    },
    {
      question: 'Which package is commonly used with Express for CORS?',
      options: ['cors', 'helmet', 'morgan', 'body-parser'],
      correctAnswer: 'cors',
    },
    {
      question: 'What is the purpose of `res.render()` in Express?',
      options: ['Send JSON', 'Render a view template', 'Redirect', 'Serve static files'],
      correctAnswer: 'Render a view template',
    },
    {
      question: 'Which HTTP status code indicates a successful request in Express?',
      options: ['200', '404', '500', '301'],
      correctAnswer: '200',
    },
    {
      question: 'How do you access query parameters in Express?',
      options: ['req.params', 'req.query', 'req.body', 'req.url'],
      correctAnswer: 'req.query',
    },
    {
      question: 'What is the role of `body-parser` in Express?',
      options: ['Serve static files', 'Parse request bodies', 'Handle routing', 'Manage sessions'],
      correctAnswer: 'Parse request bodies',
    },
    {
      question: 'Which method starts an Express server?',
      options: ['app.start()', 'app.listen()', 'app.run()', 'app.serve()'],
      correctAnswer: 'app.listen()',
    },
    {
      question: 'What does `express.urlencoded()` parse?',
      options: ['JSON payloads', 'Form data', 'XML data', 'Binary data'],
      correctAnswer: 'Form data',
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

  const handleContinue = () => router.push('/quizz/quizzes');
  const handleStop = () => router.push('/quizz/results');

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
          <h1 className="text-3xl font-bold text-blue-600">Express Quiz</h1>
          <span className="text-gray-500 font-medium">
            {currentQuestion}/{questions.length}
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