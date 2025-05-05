'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, ArrowRight } from 'lucide-react';
import { PiFlowerLotusDuotone } from 'react-icons/pi';

export default function QuizForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to start the quiz.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserEmail(data.email);
        setEmail(data.email);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to start the quiz.');
      return;
    }

    if (!name || !email) {
      setError('Please fill in both fields.');
      return;
    }

    if (email !== userEmail) {
      setError('You can only start the quiz with your logged-in email.');
      return;
    }

    localStorage.setItem('quizUser', JSON.stringify({ name, email }));
    router.push('/quizz/quizzes');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div 
          whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50"
        >
          <div className="p-8">
            <div className="text-center mb-6">
              {/* Logo */}
              <PiFlowerLotusDuotone className="text-blue-600 w-8 h-8 mx-auto mb-2 animate-glow" />
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 tracking-tight"
              >
                Start Your Quiz
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-500 text-sm max-w-xs mx-auto"
              >
                Enter details to begin
              </motion.p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50/80 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 border border-red-100/50 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-blue-500" />
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/50 text-gray-800 placeholder-gray-400 shadow-sm text-sm"
                    placeholder="Your name"
                    required
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-xl"
                    initial={{ height: 0 }}
                    animate={{ height: name ? '100%' : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl -z-10 bg-blue-100/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                  <Mail className="h-4 w-4 mr-1.5 text-blue-500" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200/50 rounded-xl bg-gray-100/50 text-gray-600 shadow-sm text-sm cursor-not-allowed"
                    readOnly
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-xl"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)',
                    backgroundPosition: 'right center'
                  }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold text-base shadow-lg"
                  style={{
                    backgroundSize: '200% auto',
                    transition: 'background-position 0.3s ease'
                  }}
                >
                  <span>Launch Quiz</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </form>
          </div>
          {/* Subtle Footer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-3 text-center">
            <p className="text-xs text-gray-500">
              Powered by <span className="font-semibold text-blue-600">Skill Bridge</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}