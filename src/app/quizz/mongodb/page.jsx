'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function MongoDBQuizPage() {
  const router = useRouter();
  const quizType = 'mongodb';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    { question: 'What is MongoDB primarily used for?', options: ['Relational database', 'NoSQL database', 'Caching', 'Message queue'], correctAnswer: 'NoSQL database' },
    { question: 'Which command creates a new database in MongoDB?', options: ['use', 'create', 'db.create', 'new'], correctAnswer: 'use' },
    { question: 'What is a collection in MongoDB equivalent to in a relational database?', options: ['Table', 'Row', 'Column', 'Index'], correctAnswer: 'Table' },
    { question: 'What data format does MongoDB use to store documents?', options: ['JSON', 'BSON', 'XML', 'YAML'], correctAnswer: 'BSON' },
    { question: 'Which operator is used to query documents in MongoDB?', options: ['$query', '$find', '$match', '$select'], correctAnswer: '$match' },
    { question: 'How do you insert a single document in MongoDB?', options: ['db.collection.insert()', 'db.collection.add()', 'db.collection.save()', 'db.collection.push()'], correctAnswer: 'db.collection.insert()' },
    { question: 'What is the purpose of the _id field in MongoDB?', options: ['Optional identifier', 'Unique identifier', 'Index name', 'Collection name'], correctAnswer: 'Unique identifier' },
    { question: 'Which command updates multiple documents in a collection?', options: ['update()', 'updateMany()', 'modify()', 'replaceMany()'], correctAnswer: 'updateMany()' },
    { question: 'What is the aggregation pipeline in MongoDB used for?', options: ['Data backup', 'Data transformation', 'User authentication', 'Schema validation'], correctAnswer: 'Data transformation' },
    { question: 'Which operator performs a logical AND in MongoDB queries?', options: ['$or', '$and', '$nor', '$not'], correctAnswer: '$and' },
    { question: 'How do you delete a single document in MongoDB?', options: ['deleteOne()', 'remove()', 'drop()', 'delete()'], correctAnswer: 'deleteOne()' },
    { question: 'What is sharding in MongoDB?', options: ['Data encryption', 'Data partitioning', 'Data indexing', 'Data compression'], correctAnswer: 'Data partitioning' },
    { question: 'Which command finds all documents in a collection?', options: ['find()', 'get()', 'select()', 'retrieve()'], correctAnswer: 'find()' },
    { question: 'What is the default port for MongoDB?', options: ['27017', '8080', '3306', '5432'], correctAnswer: '27017' },
    { question: 'Which index type improves text search in MongoDB?', options: ['Text index', 'Hash index', 'Geo index', 'Unique index'], correctAnswer: 'Text index' },
    { question: 'What does the $lookup operator do in MongoDB?', options: ['Joins collections', 'Sorts documents', 'Groups documents', 'Filters documents'], correctAnswer: 'Joins collections' },
    { question: 'How do you create an index in MongoDB?', options: ['createIndex()', 'addIndex()', 'index()', 'buildIndex()'], correctAnswer: 'createIndex()' },
    { question: 'What is a replica set in MongoDB?', options: ['A backup system', 'A group of servers for redundancy', 'A caching layer', 'A query optimizer'], correctAnswer: 'A group of servers for redundancy' },
    { question: 'Which operator increments a field value in MongoDB?', options: ['$inc', '$add', '$set', '$push'], correctAnswer : '$inc' },
    { question: 'What is the purpose of MongoDB Atlas?', options: ['Local database', 'Cloud-hosted MongoDB', 'Query language', 'Schema designer'], correctAnswer: 'Cloud-hosted MongoDB' },
  ];

  const handleOptionSelect = (option) => {
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
  };

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
          <h1 className="text-3xl font-bold text-blue-600">MongoDB Quiz</h1>
          <span className="text-gray-500 font-medium">
            {currentQuestion}/{questions.length}
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