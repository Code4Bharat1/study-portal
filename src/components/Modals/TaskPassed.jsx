"use client";
import { useEffect, useState } from "react";
import { LEVEL_SCORE_MAP, calculateScore } from "./utils";

export default function TestPassed({
  result,
  level,
  onClose,
  url,
  type = "exercise", // "exercise" or "project"
}) {
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [breakdown, setBreakdown] = useState({
    passScore: 0,
    attemptScore: 0,
    timeScore: 0,
  });

  useEffect(() => {
    const startTimestamp = localStorage.getItem("startTimestamp");
    if (!startTimestamp) {
      console.error("Start time not found in localStorage.");
      return;
    }

    const startTime = new Date(Number(startTimestamp));
    const endTime = new Date(result.timestamp);
    const duration = (endTime - startTime) / 1000;

    setTimeTaken(duration);

    const { total, breakdown } = calculateScore(result.attempts, duration, level);
    setScore(total);
    setBreakdown(breakdown);
  }, [result, level]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("Missing auth token or user ID.");
      setIsSubmitting(false);
      onClose();
      return;
    }

    try {
      const response = await fetch("http://localhost:3902/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score,
          url,
          userId,
          type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error submitting score:", data.message || data);
      } else {
        console.log("Score submitted successfully:", data);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="text-center text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        🎉 Congratulations! 🎉
      </h1>
      <p className="mb-4">Your code passed all test cases!</p>

      <div className="mb-4">
        <p><strong>Time Taken:</strong> {timeTaken.toFixed(2)} seconds</p>
        <p><strong>Attempts:</strong> {result.attempts}</p>
      </div>

      <div className="bg-green-100 border border-green-300 rounded-md shadow-inner p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">📊 Score Breakdown</h2>
        <ul className="space-y-1 text-left inline-block">
          <li>✅ Passed Checks: <strong>{breakdown.passScore}</strong></li>
          <li>🔁 Attempts Bonus: <strong>{breakdown.attemptScore}</strong></li>
          <li>⏱️ Time Bonus: <strong>{breakdown.timeScore}</strong></li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Total Score: {score} / {LEVEL_SCORE_MAP[level] || 100}
      </h2>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Close"}
      </button>
    </div>
  );
}
