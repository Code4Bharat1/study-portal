'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython, SiMysql, SiPhp, SiJavascript } from 'react-icons/si';

export default function QuizSelection() {
  const quizzes = [
    { name: 'MongoDB', link: '/quizz/mongodb', color: 'from-green-500 to-emerald-600', icon: <SiMongodb size={40} /> },
    { name: 'Express', link: '/quizz/express', color: 'from-blue-500 to-indigo-600', icon: <SiExpress size={40} /> },
    { name: 'React', link: '/quizz/react', color: 'from-cyan-500 to-teal-600', icon: <SiReact size={40} /> },
    { name: 'Node.js', link: '/quizz/nodejs', color: 'from-lime-500 to-green-600', icon: <SiNodedotjs size={40} /> },
    { name: 'Python', link: '#', color: 'from-yellow-500 to-orange-600', icon: <SiPython size={40} />, comingSoon: true },
    { name: 'SQL', link: '#', color: 'from-blue-700 to-blue-900', icon: <SiMysql size={40} />, comingSoon: true },
    { name: 'PHP', link: '#', color: 'from-purple-500 to-pink-600', icon: <SiPhp size={40} />, comingSoon: true },
    { name: 'JavaScript', link: '#', color: 'from-yellow-400 to-amber-600', icon: <SiJavascript size={40} />, comingSoon: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2ff] via-indigo-100 to-purple-100 py-16 px-6 relative overflow-hidden">
      {/* Background Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-[-80px] left-[-80px] w-[450px] h-[450px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 text-center mb-16 drop-shadow-md tracking-tight"
      >
        Choose Your Quiz
      </motion.h1>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto z-10">
        {quizzes.map((quiz, index) => (
          <Link href={quiz.comingSoon ? '#' : quiz.link} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotate: 0.5,
              }}
              whileTap={{ scale: 0.96 }}
              className={`relative bg-gradient-to-br ${quiz.color} rounded-3xl p-6 shadow-2xl cursor-pointer transition-all duration-300 group overflow-hidden`}
            >
              {/* Neon ring border on hover */}
              <div className="absolute inset-0 border-2 border-white rounded-3xl opacity-0 group-hover:opacity-10 group-hover:animate-pulse transition duration-300 pointer-events-none" />

              {/* Glass overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Icon */}
              <div className="flex justify-center mb-4 text-white drop-shadow-md">{quiz.icon}</div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-2 text-white group-hover:scale-105 transition-transform">
                {quiz.name}
              </h2>

              {/* Description */}
              <p className={`text-sm text-white/80 group-hover:text-white transition-colors ${quiz.comingSoon ? 'text-gray-500' : ''}`}>
                {quiz.comingSoon ? 'Coming Soon!' : `Test your ${quiz.name} knowledge with 20 questions!`}
              </p>

              {/* Arrow */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: -8 }}
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

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-gray-500">
          Powered by <span className="font-semibold text-indigo-600">Skill Bridge</span>
        </p>
      </motion.div>
    </div>
  );
}
