"use client";

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { FaDatabase } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const iconVariants = {
  hover: {
    rotate: 360,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Challenge configurations
const challenges = {
  basic: {
    title: "Basic: Select Users",
    description: "Write a query to select all users from the Users table.",
    initialCode: `-- Write your query here
SELECT * FROM Users;`,
    schema: `Users (id INT, name VARCHAR(100), email VARCHAR(100))`,
    sampleData: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
    testCases: [
      {
        expected: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
        ],
      },
    ],
    sampleOutputLabel: "Selected users",
    timeLimit: 300,
  },
  intermediate: {
    title: "Intermediate: Join Tables",
    description: "Write a query to join Users and Orders tables to get user orders.",
    initialCode: `-- Write your query here
SELECT Users.name, Orders.order_id
FROM Users
JOIN Orders ON Users.id = Orders.user_id;`,
    schema: `Users (id INT, name VARCHAR(100)), Orders (order_id INT, user_id INT)`,
    sampleData: {
      Users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      Orders: [
        { order_id: 101, user_id: 1 },
        { order_id: 102, user_id: 1 },
        { order_id: 103, user_id: 2 },
      ],
    },
    testCases: [
      {
        expected: [
          { name: "John Doe", order_id: 101 },
          { name: "John Doe", order_id: 102 },
          { name: "Jane Smith", order_id: 103 },
        ],
      },
    ],
    sampleOutputLabel: "User orders",
    timeLimit: 600,
  },
  hard: {
    title: "Hard: Group and Aggregate",
    description: "Write a query to count orders per user, grouping by user.",
    initialCode: `-- Write your query here
SELECT Users.name, COUNT(Orders.order_id) as order_count
FROM Users
JOIN Orders ON Users.id = Orders.user_id
GROUP BY Users.id, Users.name;`,
    schema: `Users (id INT, name VARCHAR(100)), Orders (order_id INT, user_id INT)`,
    sampleData: {
      Users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      Orders: [
        { order_id: 101, user_id: 1 },
        { order_id: 102, user_id: 1 },
        { order_id: 103, user_id: 2 },
      ],
    },
    testCases: [
      {
        expected: [
          { name: "John Doe", order_count: 2 },
          { name: "Jane Smith", order_count: 1 },
        ],
      },
    ],
    sampleOutputLabel: "Orders per user",
    timeLimit: 900,
  },
};

// Simulated SQL execution utility
const safeExecute = (code, challenge) => {
  try {
    // Simulated SQL execution: Check query patterns and return predefined results
    // In a real app, this would call a backend to execute SQL against a database
    let result;
    if (challenge.title === "Basic: Select Users") {
      if (code.toUpperCase().includes("SELECT * FROM USERS")) {
        result = challenge.sampleData;
      } else {
        throw new Error("Incorrect query: Expected SELECT * FROM Users");
      }
    } else if (challenge.title === "Intermediate: Join Tables") {
      if (
        code.toUpperCase().includes("SELECT") &&
        code.toUpperCase().includes("FROM USERS") &&
        code.toUpperCase().includes("JOIN ORDERS") &&
        code.toUpperCase().includes("ON") &&
        code.toUpperCase().includes("USERS.ID") &&
        code.toUpperCase().includes("ORDERS.USER_ID")
      ) {
        result = challenge.testCases[0].expected;
      } else {
        throw new Error("Incorrect query: Expected a JOIN between Users and Orders");
      }
    } else if (challenge.title === "Hard: Group and Aggregate") {
      if (
        code.toUpperCase().includes("SELECT") &&
        code.toUpperCase().includes("COUNT") &&
        code.toUpperCase().includes("FROM USERS") &&
        code.toUpperCase().includes("JOIN ORDERS") &&
        code.toUpperCase().includes("GROUP BY")
      ) {
        result = challenge.testCases[0].expected;
      } else {
        throw new Error("Incorrect query: Expected GROUP BY with COUNT");
      }
    } else {
      throw new Error("Unknown challenge");
    }
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Scoring utility
const calculateScore = (results, timeTaken, timeLimit, errorCount) => {
  const passedTests = results.filter((r) => r.passed).length;
  const totalTests = results.length;
  const baseScore = (passedTests / totalTests) * 60;
  const timeFactor = Math.max(0, 1 - timeTaken / timeLimit);
  const timeScore = timeFactor * 20;
  const errorPenalty = Math.max(0, 20 - errorCount * 2);
  const totalScore = Math.round(baseScore + timeScore + errorPenalty);
  return totalScore;
};

export default function SQLSandboxPage() {
  const [level, setLevel] = useState("basic");
  const [code, setCode] = useState(challenges.basic.initialCode);
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(challenges.basic.timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [errorHistory, setErrorHistory] = useState([]);
  const [runCount, setRunCount] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedChallengesSQL");
      console.log("Initial completedChallenges from localStorage:", saved);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      console.log("Saving completedChallenges to localStorage:", completedChallenges);
      localStorage.setItem("completedChallengesSQL", JSON.stringify(completedChallenges));
    }
  }, [completedChallenges]);

  useEffect(() => {
    setCode(challenges[level].initialCode);
    setTimeLeft(challenges[level].timeLimit);
    setOutput("");
    setScore(null);
    setIsRunning(false);
    setErrorCount(0);
    setErrorHistory([]);
    setRunCount(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [level]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setOutput("Time's up! You need to learn more to complete this challenge.");
            setScore(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const handleRunCode = () => {
    setIsRunning(true);
    setRunCount((prev) => prev + 1);
    const challenge = challenges[level];

    // Execute sample query
    let sampleOutput = "";
    const sampleResult = safeExecute(code, challenge);
    if (sampleResult.success) {
      sampleOutput = `${challenge.sampleOutputLabel}: ${JSON.stringify(sampleResult.result)}`;
    } else {
      sampleOutput = `${challenge.sampleOutputLabel} Error: ${sampleResult.error}`;
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [
        ...prev,
        { run: runCount + 1, error: sampleResult.error },
      ]);
    }

    // Execute test cases
    const results = challenge.testCases.map((test, i) => {
      const execResult = safeExecute(code, challenge);
      if (!execResult.success) {
        setErrorCount((prev) => prev + 1);
        setErrorHistory((prev) => [
          ...prev,
          { run: runCount + 1, error: execResult.error },
        ]);
        console.log(`Test ${i + 1} failed with error:`, execResult.error);
        return { passed: false, error: execResult.error, actual: null };
      }
      const actual = execResult.result;
      const expected = test.expected;
      const passed = JSON.stringify(actual) === JSON.stringify(expected);
      console.log(`Test ${i + 1}: Expected=${JSON.stringify(expected)}, Got=${JSON.stringify(actual)}, Passed=${passed}`);
      return { passed, actual, expected };
    });

    const allTestsPassed = results.every((res) => res.passed);
    console.log("All tests passed:", allTestsPassed);
    const timeTaken = challenge.timeLimit - timeLeft;

    // Format test case output
    const outputText = results
      .map((res, i) => {
        const expectedStr = JSON.stringify(res.expected);
        const actualStr = res.actual !== null ? JSON.stringify(res.actual) : "N/A";
        if (!res.passed) {
          return res.error
            ? `Test ${i + 1} failed (Error): ${res.error}\n   Expected: ${expectedStr}\n   Got: N/A`
            : `Test ${i + 1} failed: \n   Expected: ${expectedStr}\n   Got: ${actualStr}`;
        }
        return `Test ${i + 1} passed!\n   Expected: ${expectedStr}\n   Got: ${actualStr}`;
      })
      .join("\n\n");

    // Format feedback
    let feedback = "";
    if (allTestsPassed) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      setCompletedChallenges((prev) => {
        if (!prev.includes(level)) {
          console.log(`Completing ${level}, new completedChallenges:`, [...prev, level]);
          return [...prev, level];
        }
        console.log(`${level} already completed, no change`);
        return prev;
      });
      const score = calculateScore(results, timeTaken, challenge.timeLimit, errorCount);
      setScore(score);
      feedback = `Congratulations, you passed all tests in ${formatTime(timeTaken)}!\n`;
      feedback += `Runs: ${runCount + 1}, Errors encountered: ${errorCount}\n`;
      if (errorCount > 0) {
        feedback += `You had ${errorCount} error${errorCount > 1 ? "s" : ""}:\n`;
        errorHistory.forEach((err) => {
          feedback += `- Run ${err.run}: ${err.error}\n`;
        });
        feedback += score >= 80
          ? "Great job, but review your errors to improve efficiency!"
          : score >= 50
          ? "Good effort! Study the errors to boost your score."
          : "You passed, but too many errors. Practice debugging techniques.";
      } else {
        feedback += score >= 80
          ? "Perfect! No errors and great speed!"
          : score >= 50
          ? "Well done! Try to optimize your query for a higher score."
          : "You passed, but took too long. Practice for better speed.";
      }
      if (level !== "hard") {
        feedback += `${level === "basic" ? "Intermediate" : "Hard"} is now unlocked.\n`;
      }
    } else {
      const score = calculateScore(results, timeTaken, challenge.timeLimit, errorCount);
      setScore(score);
      feedback = `Score: ${score}/100\n`;
      if (errorCount > 0) {
        feedback += `You had ${errorCount} error${errorCount > 1 ? "s" : ""} in ${runCount + 1} run${runCount > 0 ? "s" : ""}:\n`;
        errorHistory.forEach((err) => {
          feedback += `- Run ${err.run}: ${err.error}\n`;
        });
      }
      feedback += score >= 50
        ? "Not bad, but some tests failed. Review the errors and try again!"
        : "Too many issues. Study the test cases and debug your query.";
    }

    setOutput(`Sample Run:\n${sampleOutput}\n\nTest Results:\n${outputText}\n\n${feedback}`);
  };

  const isLevelUnlocked = (lvl) => {
    const unlocked = lvl === "basic" || 
      (lvl === "intermediate" && completedChallenges.includes("basic")) || 
      (lvl === "hard" && completedChallenges.includes("intermediate"));
    console.log(`Checking if ${lvl} is unlocked:`, unlocked, "completedChallenges:", completedChallenges);
    return unlocked;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e6f4ea] via-[#d4edda] to-[#c3e6cb] flex items-center justify-center p-4 relative overflow-hidden">
      {[
        { top: "top-30", left: "left-50" },
        { top: "top-30", right: "right-34" },
        { top: "top-40", right: "right-90" },
        { top: "top-90", left: "left-23" },
        { bottom: "bottom-16", left: "left-12" },
        { top: "top-[30%]", left: "left-[5%]" },
        { top: "top-[40%]", right: "right-[8%]" },
        { bottom: "bottom-20", right: "right-[10%]" },
        { top: "top-[6%]", right: "right-[55%]" },
        { top: "top-5", right: "right-[40%]" },
        { bottom: "bottom-4", right: "right-4" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          variants={iconVariants}
          whileHover="hover"
        >
          <FaDatabase
            className={`absolute text-green-600 text-5xl z-10 rotate-12 ${Object.entries(pos)
              .map(([k, v]) => `${k}-${v}`)
              .join(" ")}`}
            aria-hidden="true"
          />
        </motion.div>
      ))}

      <motion.div
        className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left: Editor and Controls */}
          <motion.div className="flex-1 p-8 md:p-12 flex flex-col" variants={itemVariants}>
            <motion.h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              SQL Sandbox
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-6" variants={itemVariants}>
              {challenges[level].description}
              <br />
              <strong>Schema:</strong> {challenges[level].schema}
            </motion.p>
            <motion.div className="flex gap-4 mb-6" variants={containerVariants} key={completedChallenges.join()}>
              {["basic", "intermediate", "hard"].map((lvl) => (
                <motion.button
                  key={lvl}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    level === lvl
                      ? "bg-green-500 text-white"
                      : isLevelUnlocked(lvl)
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  variants={buttonVariants}
                  whileHover={isLevelUnlocked(lvl) ? "hover" : ""}
                  whileTap={isLevelUnlocked(lvl) ? "tap" : ""}
                  onClick={() => isLevelUnlocked(lvl) && setLevel(lvl)}
                  disabled={!isLevelUnlocked(lvl)}
                  aria-label={`Select ${lvl} challenge${!isLevelUnlocked(lvl) ? " (locked)" : ""}`}
                  title={
                    !isLevelUnlocked(lvl)
                      ? `Complete ${lvl === "intermediate" ? "Basic" : "Intermediate"} challenge to unlock`
                      : ""
                  }
                >
                  {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                </motion.button>
              ))}
            </motion.div>
            <Editor
              height="400px"
              defaultLanguage="sql"
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
            <motion.button
              className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRunCode}
              disabled={isRunning && timeLeft <= 0}
              aria-label="Run query"
            >
              Run Query
            </motion.button>
          </motion.div>
          {/* Right: Output and Feedback */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-green-50 to-teal-50 p-8 md:p-12 flex flex-col"
            variants={itemVariants}
          >
            <motion.div className="flex justify-between items-center mb-4" variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-gray-900">{challenges[level].title}</h2>
              <span className="text-lg text-gray-600">Time Left: {formatTime(timeLeft)}</span>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 h-[400px] overflow-auto"
              variants={itemVariants}
            >
              <pre className="text-sm text-gray-800">{output || "Run your query to see the output."}</pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}