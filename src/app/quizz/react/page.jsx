'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaSignOutAlt, FaTrophy } from 'react-icons/fa';
import Confetti from 'react-confetti';

export default function ReactQuizPage() {
  const router = useRouter();
  const quizType = 'react';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const questions = [
    { question: 'What is React primarily used for?', options: ['Server-side rendering', 'Building user interfaces', 'Database management', 'API development'], correctAnswer: 'Building user interfaces', category: 'Basics' },
    { question: 'What is a React component?', options: ['A database model', 'A reusable piece of UI', 'A server route', 'A CSS style'], correctAnswer: 'A reusable piece of UI', category: 'Components' },
    { question: 'Which hook manages state in functional components?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 'useState', category: 'Hooks' },
    { question: 'What does JSX stand for?', options: ['JavaScript XML', 'JavaScript Extension', 'JSON XML', 'Java Syntax'], correctAnswer: 'JavaScript XML', category: 'Syntax' },
    { question: 'What is the purpose of useEffect in React?', options: ['Manage state', 'Handle side effects', 'Render components', 'Route navigation'], correctAnswer: 'Handle side effects', category: 'Hooks' },
    { question: 'How do you pass data to a React component?', options: ['Props', 'State', 'Hooks', 'Context'], correctAnswer: 'Props', category: 'Props' },
    { question: 'What is the virtual DOM in React?', options: ['A database', 'A copy of the real DOM', 'A CSS framework', 'A server API'], correctAnswer: 'A copy of the real DOM', category: 'Performance' },
    { question: 'Which method updates state in a class component?', options: ['setState()', 'updateState()', 'changeState()', 'modifyState()'], correctAnswer: 'setState()', category: 'Class Components' },
    { question: 'What is the purpose of useContext in React?', options: ['Manage state', 'Access context data', 'Handle side effects', 'Render components'], correctAnswer: 'Access context data', category: 'Hooks' },
    { question: 'What is React Router used for?', options: ['State management', 'Navigation', 'API calls', 'Styling'], correctAnswer: 'Navigation', category: 'Routing' },
  ];

  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setFeedback({ isCorrect, correctAnswer: questions[currentQuestion].correctAnswer });
    if (isCorrect) {
      setScore(score + 1);
      new Audio('/sounds/correct.mp3').play().catch(() => {});
    } else {
      new Audio('/sounds/incorrect.mp3').play().catch(() => {});
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFeedback(null);
        setTimeLeft(30);
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

  useEffect(() => {
    if (!quizCompleted && !selectedOption && !isTimeUp) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            setFeedback({ isCorrect: false, correctAnswer: questions[currentQuestion].correctAnswer });
            setTimeout(() => {
              if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setFeedback(null);
                setTimeLeft(30);
                setIsTimeUp(false);
              } else {
                setQuizCompleted(true);
                const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
                const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
                scores[user.email] = scores[user.email] || {};
                scores[user.email][quizType] = score;
                localStorage.setItem('quizScores', JSON.stringify(scores));
              }
            }, 1500);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, selectedOption, quizCompleted, isTimeUp]);

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-6 bg-[url('/pattern.svg')] bg-opacity-10">
        <Confetti width={typeof window !== 'undefined' ? window.innerWidth : 0} height={typeof window !== 'undefined' ? window.innerHeight : 0} recycle={false} numberOfPieces={200} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-blue-100 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-white/20"
        >
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-md flex items-center justify-center gap-2">
            <FaTrophy className="text-yellow-400" /> Quiz Completed!
          </h1>
          <p className="text-2xl font-medium text-gray-600 mb-6 drop-shadow-md">
            Your Score: <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="font-bold text-yellow-400"
            >{score}</motion.span> / {questions.length}
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
            >
              <span className="relative z-10">View Results</span>
              <span className="absolute inset-0 bg-red-700 opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
            >
              <span className="relative z-10">Try Another Quiz</span>
              <span className="absolute inset-0 bg-green-700 opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/pattern.svg')] bg-opacity-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl p-10 border border-white/20 tilt-card"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease',
        }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 50;
          const rotateY = (centerX - x) / 50;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src="/react.png"
              alt="React Logo"
              className="h-10 w-auto mr-4"
            />
            <h1 className="text-3xl font-bold text-blue-600">React Quiz</h1>
          </div>
          <div className="flex items-center gap-6">
            <motion.div
              className="text-gray-700 font-semibold"
              initial={{ scale: 1 }}
              animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              Score: {score}/{questions.length}
            </motion.div>
            <span className="text-gray-700 font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Quit Quiz"
            >
              <FaSignOutAlt className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200/50 rounded-full h-3 mb-8">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Timer with Progress Circle */}
        <div className="text-center mb-8 relative">
          <svg className="w-20 h-20 mx-auto" viewBox="0 0 36 36">
            <path
              className="fill-none stroke-gray-200 stroke-2"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="fill-none stroke-blue-600 stroke-2"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray="100"
              strokeDashoffset={100 - (timeLeft / 30) * 100}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <motion.span
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}
            animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: timeLeft <= 10 ? Infinity : 0, duration: 0.5 }}
          >
            {timeLeft}s
          </motion.span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {questions[currentQuestion].category}
              </span>
              <h2 className="text-xl font-semibold text-gray-800">
                {questions[currentQuestion].question}
              </h2>
            </div>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null || isTimeUp}
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
        </AnimatePresence>

        <AnimatePresence>
          {isTimeUp && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
              className="mt-6 px-6 py-4 rounded-xl font-medium text-center shadow bg-red-100/80 text-red-800 flex items-center justify-center gap-2"
            >
              <FaClock className="text-xl" />
              Time's Up! Correct answer: {questions[currentQuestion].correctAnswer}
            </motion.div>
          )}
          {!isTimeUp && feedback && (
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}