'use client';
import React from 'react';
import { motion } from 'framer-motion';

const questions = [
  "What is MongoDB and how is it different from SQL databases?",
  "Explain the concept of a document and a collection in MongoDB.",
  "How do you insert a new document into a MongoDB collection?",
  "What is the use of the `_id` field in MongoDB?",
  "How can you retrieve all documents from a MongoDB collection?",
  "How do you update a specific document in MongoDB?",
  "What is the difference between `updateOne()` and `updateMany()`?",
  "How do you delete documents from a MongoDB collection?",
  "What are MongoDB indexes and why are they important?",
  "How does MongoDB handle relationships between data (embedding vs referencing)?",
  // Hard Level
  "Explain the CAP theorem and how MongoDB fits into it.",
  "What is sharding in MongoDB and how does it work?",
  "How does MongoDB ensure data consistency in a replica set?",
  "What is the WiredTiger storage engine and what are its advantages?",
  "How do you perform aggregation operations in MongoDB? Explain `$group`, `$match`, and `$project` stages.",
  "Describe how MongoDB handles concurrency and locking mechanisms.",
  "How do you optimize MongoDB queries for performance?",
  "Explain the difference between Replica Sets and Sharded Clusters.",
  "What are transactions in MongoDB and how are they different from traditional SQL transactions?",
  "How would you backup and restore a large MongoDB database efficiently?",
];

const QuestionMongo = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Blurred Background Effects */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-2xl opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl text-center relative z-10"
      >
        <h1 className="text-3xl font-extrabold text-green-700 mb-12 tracking-tight">
          🚀 MongoDB Interview Questions
        </h1>

        <div className="space-y-8 text-left">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group border-b border-green-300 pb-4"
            >
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition">
                {index + 1}. {question}
              </h2>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default QuestionMongo;

