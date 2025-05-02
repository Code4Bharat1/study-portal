'use client';

import { useRouter } from 'next/navigation';

export default function FirstSQL() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/sql/home'); // Adjust path if needed
  };

  const handleVideoClick = () => {
    // Open SQL video in new tab
    window.open('https://www.youtube.com/watch?v=HXV3zeQKqGY', '_blank'); // SQL Tutorial - MySQL (freeCodeCamp)
  };

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-lg shadow-lg p-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">SQL</h1>
          <p className="text-xl text-black mb-6">
            SQL is the language for working with databases.
          </p>
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition whitespace-nowrap"
            >
              Learn SQL
            </button>
            <button
              onClick={handleVideoClick}
              className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition whitespace-nowrap"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition whitespace-nowrap">
              SQL Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">SQL Example:</h2>
          <pre className="bg-white text-sm text-green-800 p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
{`-- Create a table
CREATE TABLE Customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Insert data
INSERT INTO Customers (id, name, email)
VALUES (1, 'John Doe', 'john@example.com');

-- Query data
SELECT * FROM Customers;`}
          </pre>
        </div>
      </div>
    </main>
  );
}
