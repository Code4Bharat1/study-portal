'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine } from 'react-icons/fa';

export default function ResultsPage() {
  const [scores, setScores] = useState({});
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('quizUser') || '{}');
    const storedScores = JSON.parse(localStorage.getItem('quizScores') || '{}')[user.email] || {};
    setScores(storedScores);
  }, []);

  const quizTypes = ['react', 'express', 'mongodb', 'nodejs'];

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'basic': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getDifficultyBg = (diff) => {
    switch (diff) {
      case 'basic': return 'bg-green-100';
      case 'intermediate': return 'bg-yellow-100';
      case 'hard': return 'bg-red-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Your Quiz Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {quizTypes.map((quizType) => (
          <motion.div
            key={quizType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-6"
          >
            <div className="flex items-center mb-4">
              <FaTrophy className="text-yellow-400 text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-white capitalize">{quizType} Quiz</h2>
            </div>
            {scores[quizType] ? (
              <>
                <p className="text-white mb-2">
                  Score: {scores[quizType].score} / 10
                </p>
                <div className="flex items-center mb-2">
                  <FaChartLine className={`${getDifficultyColor(scores[quizType].difficulty)} mr-2`} />
                  <span className={`text-white capitalize ${getDifficultyColor(scores[quizType].difficulty)}`}>
                    {scores[quizType].difficulty} Difficulty
                  </span>
                </div>
                <p className="text-white mb-4">
                  Completed: {new Date(scores[quizType].completedAt).toLocaleDateString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(scores[quizType].score / 10) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-white mt-2">
                  {Math.round((scores[quizType].score / 10) * 100)}%
                </p>
              </>
            ) : (
              <p className="text-white">Not attempted yet</p>
            )}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/quizz/quizzes')}
          className="bg-blue-600 text-white px-6 py-3 rounded-full"
        >
          Back to Quizzes
        </motion.button>
      </div>
    </div>
  );
}