'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaReact, FaNodeJs, FaDatabase, FaServer } from 'react-icons/fa';

export default function Quizzes() {
  const router = useRouter();
  // Define available quizzes with their names, icons, and navigation paths
  const quizzes = [
    { name: 'React', icon: <FaReact className="text-sky-600 text-6xl shadow-none" />, path: '/quizz/react' },
    { name: 'Express', icon: <FaServer className="text-gray-800 text-6xl shadow-none" />, path: '/quizz/express' },
    { name: 'MongoDB', icon: <FaDatabase className="text-green-600 text-6xl shadow-none" />, path: '/quizz/mongodb' },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500 text-6xl shadow-none" />, path: '/quizz/nodejs' }
    
  ];

  // Check for authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
    const email = user.email || '';
    if (!token || !email) {
      router.push('/quizz');
    }
  }, [router]);

  // Handle logout: clear token and user, but preserve login count for difficulty progression
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('quizUser');
    // Do not clear login count to persist difficulty progression
    router.push('/quizz');
  };

  // Handle quiz navigation with authentication check
  const handleQuizNavigation = (path) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
    const email = user.email || '';
    if (!token || !email) {
      router.push('/quizz');
    } else {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-white to-indigo-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
          Available Quizzes
        </h1>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0, 162, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <FaSignOutAlt />
          Logout
        </motion.button>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.name}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
            className="relative p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-gray-100/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,162,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="flex flex-col items-center">
              {quiz.icon}
              <h2 className="text-2xl font-bold text-gray-900 mt-4">{quiz.name} Quiz</h2>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0, 162, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuizNavigation(quiz.path)}
                className="mt-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                Start Quiz
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}