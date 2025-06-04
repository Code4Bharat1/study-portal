import { useEffect, useState } from "react";
import { LEVEL_SCORE_MAP, calculateScore } from "./utils";

export default function TestPassed({ result, level, onClose, url, type = "exercise" }) {
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [breakdown, setBreakdown] = useState({ passScore: 0, attemptScore: 0, timeScore: 0 });

  useEffect(() => {
    let startTime = localStorage.getItem("startTimestamp");
    if (!startTime) {
      console.error("Start time not found in local storage.");
      return;
    }

    startTime = new Date(Number(startTime));
    const endTime = new Date(result.timestamp);
    const duration = (endTime - startTime) / 1000;

    setTimeTaken(duration);

    const { total, breakdown } = calculateScore(result.attempts, duration, level);
    setScore(total);
    setBreakdown(breakdown);
  }, [result, level]);

  const handleClose = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      onClose();
      return;
    }

    fetch("https://sp-api.code4bharat.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score, url, userId: localStorage.getItem("userId"), type }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Score submitted:", data);
        onClose();
      })
      .catch((err) => {
        console.error("Submission error:", err);
        onClose();
      });
  };

  return (
    <div className="text-center text-gray-800">
      <h1 className="text-3xl font-bold text-green-700 mb-2">🎉 Congratulations! 🎉</h1>
      <p className="mb-4">Your code passed all checks!</p>

      <div className="mb-4">
        <p><strong>Time Taken:</strong> {timeTaken.toFixed(2)} seconds</p>
        <p><strong>Attempts:</strong> {result.attempts}</p>
      </div>

      <div className="bg-green-200 rounded-md shadow-inner p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 Score Breakdown</h2>
        <ul className="space-y-1">
          <li>✅ Passed Checks: <strong>{breakdown.passScore}</strong></li>
          <li>🔁 Attempts Bonus: <strong>{breakdown.attemptScore}</strong></li>
          <li>⏱️ Time Bonus: <strong>{breakdown.timeScore}</strong></li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-2">
        Total Score: {score} / {LEVEL_SCORE_MAP[level]}
      </h2>

      <button
        onClick={handleClose}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  );
}