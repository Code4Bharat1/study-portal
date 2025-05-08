'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { PiFlowerLotusDuotone } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeminiChat() {
  const [showChat, setShowChat] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:5000/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.text || 'No response from SkillBridge.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get response from SkillBridge.');
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setPrompt('');
      setResponse('');
    }
  };

  const formatResponse = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-black my-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('* ')) {
        return <li key={i} className="list-disc ml-5 my-1 text-black">{line.substring(2)}</li>;
      }
      if (line.match(/^#+\s/)) {
        const level = line.match(/^#+/)[0].length;
        const HeadingTag = `h${Math.min(6, level)}`;
        return <HeadingTag key={i} className={`font-bold text-black my-3 text-${7 - level}xl`}>{line.replace(/^#+\s/, '')}</HeadingTag>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      if (line.includes('`')) {
        const parts = line.split('`');
        return (
          <p key={i} className="my-2">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <code key={j} className="bg-gray-600 px-1.5 py-0.5 rounded text-sm font-mono text-white">{part}</code>
              ) : (
                <span key={j} className="text-black">{part}</span>
              )
            )}
          </p>
        );
      }
      return <p key={i} className="my-2 text-black">{line}</p>;
    });
  };

  useEffect(() => {
    setResponse('');
  }, [prompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [response]);

  return (
    <>
      {/* Floating Button */}
      {!showChat && (
        <motion.div
          className="fixed bottom-6 right-6 w-30 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:from-gray-800 hover:to-black transition-all duration-300 z-50"
          onClick={toggleChat}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <BsChatDots className="text-white text-lg mr-2" />
          <span className="text-white text-sm font-medium">Ask Me</span>
        </motion.div>
      )}

      {/* Chatbox */}
      {showChat && (
        <motion.div
          className="fixed bottom-6 right-6 w-96 h-[400px] bg-black rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Header */}
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <div className="flex items-center">
              <PiFlowerLotusDuotone className="text-blue-400 w-6 h-6 mr-2" />
              <strong className="text-lg">SkillBridge AI Assistant</strong>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-gray-800 rounded-full p-1 focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 bg-white border border-2 overflow-y-auto">
            {!prompt && !response && !loading && (
              <div className="mb-4">
                <div className="font-bold text-black mb-2">SkillBridge</div>
                <div className="text-black text-sm">How could I help you?</div>
              </div>
            )}
            {prompt && (
              <div className="mb-4">
                <div className="font-bold text-black mb-2">You</div>
                <div className="text-black text-sm">{prompt}</div>
              </div>
            )}
            {response && (
              <div className="mb-4">
                <div className="font-bold text-black mb-2">SkillBridge</div>
                <div className="text-black text-sm">{formatResponse(response)}</div>
              </div>
            )}
            {loading && (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 bg-black">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none h-12 text-sm focus:outline-none text-black bg-white placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className={`bg-gradient-to-r from-gray-700 to-gray-900 text-white p-2 rounded-lg hover:from-gray-800 hover:to-black focus:outline-none transition duration-200 ${
                  loading || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}