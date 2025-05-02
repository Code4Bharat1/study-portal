"use client";

import { useEffect, useState } from 'react';

const Activity = () => {
  const [readingData, setReadingData] = useState(() => {
    const storedData = localStorage.getItem('readingStats');
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem('readingStats');
      if (storedData) {
        setReadingData(JSON.parse(storedData));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="p-8  bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-4 border-blue-400 inline-block pb-2">
        📚 Reading History
      </h1>

      {Object.keys(readingData).length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No history found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-900 uppercase text-sm tracking-wider">
                <th className="p-4 border-b border-gray-300">Topic</th>
                <th className="p-4 border-b border-gray-300">Secund Read</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(readingData).map(([topic, minutes], index) => (
                <tr
                  key={topic}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                    {topic}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-blue-700 font-semibold">
                    {minutes} sec
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activity;