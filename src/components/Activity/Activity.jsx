"use client";

import { useEffect, useState } from "react";

const Activity = () => {
  const [readingData, setReadingData] = useState({});

  useEffect(() => {
    // This effect only runs on the client side
    const storedData = localStorage.getItem("readingStats");
    setReadingData(storedData ? JSON.parse(storedData) : {});

    const handleStorageChange = () => {
      const updatedData = localStorage.getItem("readingStats");
      if (updatedData) {
        setReadingData(JSON.parse(updatedData));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const formatTime = (timeValue) => {
    // Determine if stored as seconds or minutes
    const isLikelySeconds = Object.values(readingData).some(val => val > 60);
    
    const totalSeconds = isLikelySeconds ? timeValue : timeValue * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    // Format based on duration
    if (minutes === 0) return `${seconds} sec`;
    if (seconds === 0) return `${minutes} min`;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-4 border-blue-400 inline-block pb-2">
        📚 Reading History
      </h1>

      {Object.keys(readingData).length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No reading history found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-900 uppercase text-sm tracking-wider">
                <th className="p-4 border-b border-gray-300">Topic</th>
                <th className="p-4 border-b border-gray-300">Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(readingData).map(([topic, timeValue], index) => (
                <tr
                  key={topic}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                    {topic}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-blue-700 font-semibold">
                    {formatTime(timeValue)}
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