'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ReactQuizPage() {
  const router = useRouter();
  const quizType = 'react';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'What is React primarily used for?',
      options: ['Server-side rendering', 'Building user interfaces', 'Database management', 'API development'],
      correctAnswer: 'Building user interfaces',
    },
    {
      question: 'What is a React component?',
      options: ['A database model', 'A reusable piece of UI', 'A server route', 'A CSS style'],
      correctAnswer: 'A reusable piece of UI',
    },
    {
      question: 'Which hook manages state in functional components?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 'useState',
    },
    {
      question: 'What does JSX stand for?',
      options: ['JavaScript XML', 'JavaScript Extension', 'JSON XML', 'Java Syntax'],
      correctAnswer: 'JavaScript XML',
    },
    {
      question: 'What is the purpose of useEffect in React?',
      options: ['Manage state', 'Handle side effects', 'Render components', 'Route navigation'],
      correctAnswer: 'Handle side effects',
    },
    {
      question: 'How do you pass data to a React component?',
      options: ['Props', 'State', 'Hooks', 'Context'],
      correctAnswer: 'Props',
    },
    {
      question: 'What is the virtual DOM in React?',
      options: ['A database', 'A copy of the real DOM', 'A CSS framework', 'A server API'],
      correctAnswer: 'A copy of the real DOM',
    },
    {
      question: 'Which method updates state in a class component?',
      options: ['setState()', 'updateState()', 'changeState()', 'modifyState()'],
      correctAnswer: 'setState()',
    },
    {
      question: 'What is the purpose of useContext in React?',
      options: ['Manage state', 'Access context data', 'Handle side effects', 'Render components'],
      correctAnswer: 'Access context data',
    },
    {
      question: 'Which lifecycle method runs after a component renders?',
      options: ['componentDidMount', 'componentWillMount', 'componentDidUpdate', 'render'],
      correctAnswer: 'componentDidMount',
    },
    {
      question: 'What is a controlled component in React?',
      options: ['A component with no state', 'A form element controlled by React', 'A server component', 'A stateless component'],
      correctAnswer: 'A form element controlled by React',
    },
    {
      question: 'How do you create a ref in React?',
      options: ['useRef', 'useState', 'useEffect', 'useCallback'],
      correctAnswer: 'useRef',
    },
    {
      question: 'What does the key prop do in a React list?',
      options: ['Styles the list', 'Identifies unique items', 'Handles events', 'Stores data'],
      correctAnswer: 'Identifies unique items',
    },
    {
      question: 'Which hook memoizes a function in React?',
      options: ['useMemo', 'useCallback', 'useRef', 'useReducer'],
      correctAnswer: 'useCallback',
    },
    {
      question: 'What is React Router used for?',
      options: ['State management', 'Navigation', 'API calls', 'Styling'],
      correctAnswer: 'Navigation',
    },
    {
      question: 'What does useMemo do in React?',
      options: ['Memoizes values', 'Handles side effects', 'Manages state', 'Renders components'],
      correctAnswer: 'Memoizes values',
    },
    {
      question: 'Which method prevents a component from re-rendering?',
      options: ['shouldComponentUpdate', 'componentDidUpdate', 'render', 'componentWillMount'],
      correctAnswer: 'shouldComponentUpdate',
    },
    {
      question: 'What is the purpose of React.Fragment?',
      options: ['Handle events', 'Group elements without a wrapper', 'Manage state', 'Style components'],
      correctAnswer: 'Group elements without a wrapper',
    },
    {
      question: 'What is Next.js in relation to React?',
      options: ['A database', 'A React framework', 'A testing library', 'A CSS library'],
      correctAnswer: 'A React framework',
    },
    {
      question: 'How do you handle events in React?',
      options: ['Event listeners', 'onClick handlers', 'Native JavaScript', 'CSS events'],
      correctAnswer: 'onClick handlers',
    },
  ];

  const handleOptionSelect = useCallback((option) => {
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
  }, [currentQuestion, score, questions]);

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
          <h1 className="text-3xl font-bold text-blue-600">React Quiz</h1>
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