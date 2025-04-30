'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function QuizSelection() {
  const quizzes = [
    { name: 'MongoDB', link: '/quizz/mongodb', color: 'from-green-500 to-emerald-600' },
    { name: 'Express', link: '/quizz/express', color: 'from-blue-500 to-indigo-600' },
    { name: 'React', link: '/quizz/react', color: 'from-cyan-500 to-teal-600' },
    { name: 'Node.js', link: '/quizz/nodejs', color: 'from-lime-500 to-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-8 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-center mb-10 tracking-tight"
      >
        Select Your MERN Quiz
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {quizzes.map((quiz, index) => (
          <Link href={quiz.link} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ 
                scale: 1.05, 
                y: -8, 
                boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.2)',
                rotate: 1
              }}
              whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${quiz.color} rounded-3xl shadow-xl p-6 text-white text-center cursor-pointer overflow-hidden relative group`}
            >
              {/* Subtle Card Background Effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-3xl -z-10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <h2 className="text-2xl font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">
                {quiz.name}
              </h2>
              <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                Test your {quiz.name} skills with 20 questions!
              </p>
              {/* Hover Arrow */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Subtle Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <p className="text-sm text-gray-500">
          Powered by <span className="font-semibold text-blue-600">Skill Bridge</span>
        </p>
      </motion.div>
    </div>
  );
}