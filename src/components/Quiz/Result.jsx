'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ResultsPage() {
  const [scores, setScores] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('quizUser') || '{}');
    const scoreData = JSON.parse(localStorage.getItem('quizScores') || '{}');
    setUser(userData);
    setScores(scoreData[userData.email] || {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-700 text-center mb-12"
      >
        Your Quiz Results, {user.name || 'User'}
      </motion.h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {['mongodb', 'express', 'react', 'nodejs'].map((quizType, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-700 capitalize mb-4">
              {quizType} Quiz
            </h2>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                Score: <span className="font-bold text-blue-700">
                  {scores[quizType] !== undefined ? scores[quizType] : 'Not attempted'}
                </span> / 20
              </p>
              {scores[quizType] !== undefined && (
                <>
                  <p className="text-lg font-medium text-gray-700">
                    Percentage: <span className="font-bold text-blue-700">
                      {((scores[quizType] / 20) * 100).toFixed(2)}%
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                    <div 
                      className="bg-blue-700 h-4 rounded-full" 
                      style={{ width: `${(scores[quizType] / 20) * 100}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
