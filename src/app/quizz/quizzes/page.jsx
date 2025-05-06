'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Quizzes() {
  const router = useRouter();

  const quizzes = [
    { name: 'React', path: '/quizz/react', logo: '/react.png' },
    { name: 'Express', path: '/quizz/express', logo: '/express.png' },
    { name: 'MongoDB', path: '/quizz/mongodb', logo: '/mongodb.png' },
    { name: 'NodeJS', path: '/quizz/nodejs', logo: '/nodejs.png' },
  ];

  const handleStartQuiz = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('quizUser');
    router.push('/quizz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-700">Choose Your Quiz</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt className="text-2xl" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-100/50"
            >
              <div className="p-6 text-center">
                <img
                  src={quiz.logo}
                  alt={`${quiz.name} Logo`}
                  className="h-16 w-auto mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{quiz.name}</h2>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartQuiz(quiz.path)}
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all"
                >
                  Start Quiz
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}