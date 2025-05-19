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
    title: "Basic: Insert and Select Users",
    description: "Insert a user into the users table and then select all users.",
    initialCode: `-- Insert a user
INSERT INTO users VALUES(1, 'Rohan', 'rohan@gmail.com');

-- Select all users
SELECT * FROM users;`,
    schema: `users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))`,
    sampleOutputLabel: "Selected users",
    timeLimit: 300,
  },
  intermediate: {
    title: "Intermediate: Join Tables",
    description: "Write a query to join users and orders tables to get user orders.",
    initialCode: `-- Write your query here
SELECT users.name, orders.order_id
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
    schema: `users (id INT, name VARCHAR(255)), orders (order_id INT, user_id INT)`,
    sampleData: {
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      orders: [
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
SELECT users.name, COUNT(orders.order_id) as order_count
FROM users
INNER JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name;`,
    schema: `users (id INT, name VARCHAR(255)), orders (order_id INT, user_id INT)`,
    sampleData: {
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      orders: [
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

// Utility to parse INSERT INTO statement
const parseInsertStatement = (code) => {
  const insertRegex = /INSERT INTO users\s*\(?.*\)?\s*VALUES\s*\((\d+),\s*'([^']+)',\s*'([^']+)'\);?/gi;
  const matches = [...code.matchAll(insertRegex)];
  return matches.map((match) => {
    const [, id, name, email] = match;
    return { id: parseInt(id), name, email };
  });
};

// Simulated MySQL execution utility
const safeExecute = (code, challenge, usersTable) => {
  try {
    let result;
    if (challenge.title === "Basic: Insert and Select Users") {
      // Parse all INSERT statements
      const insertedUsers = parseInsertStatement(code);
      if (insertedUsers.length === 0) {
        throw new Error("No valid INSERT INTO users statement found");
      }

      // Update the in-memory table with inserted users
      usersTable.push(...insertedUsers);

      // Check for SELECT statement
      if (!code.toUpperCase().includes("SELECT * FROM USERS")) {
        throw new Error("Incorrect query: Expected SELECT * FROM users");
      }

      // Return the current state of the users table
      result = usersTable;
    } else if (challenge.title === "Intermediate: Join Tables") {
      if (
        code.toUpperCase().includes("SELECT") &&
        code.toUpperCase().includes("FROM USERS") &&
        (code.toUpperCase().includes("JOIN ORDERS") || code.toUpperCase().includes("INNER JOIN ORDERS")) &&
        code.toUpperCase().includes("ON") &&
        code.toUpperCase().includes("USERS.ID") &&
        code.toUpperCase().includes("ORDERS.USER_ID")
      ) {
        result = challenge.testCases[0].expected;
      } else {
        throw new Error("Incorrect query: Expected a JOIN between users and orders");
      }
    } else if (challenge.title === "Hard: Group and Aggregate") {
      if (
        code.toUpperCase().includes("SELECT") &&
        code.toUpperCase().includes("COUNT") &&
        code.toUpperCase().includes("FROM USERS") &&
        (code.toUpperCase().includes("JOIN ORDERS") || code.toUpperCase().includes("INNER JOIN ORDERS")) &&
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
const calculateScore = (timeTaken, timeLimit, errorCount, hasOutput) => {
  const baseScore = hasOutput ? 60 : 0;
  const timeFactor = Math.max(0, 1 - timeTaken / timeLimit);
  const timeScore = timeFactor * 20;
  const errorPenalty = Math.max(0, 20 - errorCount * 2);
  const totalScore = Math.round(baseScore + timeScore + errorPenalty);
  return totalScore;
};

export default function MySQLSandboxPage() {
  const [level, setLevel] = useState("basic");
  const [code, setCode] = useState(challenges.basic.initialCode);
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(challenges.basic.timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [errorHistory, setErrorHistory] = useState([]);
  const [runCount, setRunCount] = useState(0);
  const [usersTable, setUsersTable] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedChallengesMySQL");
      console.log("Initial completedChallenges from localStorage:", saved);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      console.log("Saving completedChallenges to localStorage:", completedChallenges);
      localStorage.setItem("completedChallengesMySQL", JSON.stringify(completedChallenges));
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
    setUsersTable([]); // Reset the table when changing levels
    if (timerRef.current) clearInterval(timerRef.current);
  }, [level]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setOutput((prev) => prev + "\n\nTime's up! You need to learn more to complete this challenge.");
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

    // Execute the query
    let sampleOutput = "";
    const execResult = safeExecute(code, challenge, usersTable);
    let hasOutput = false;

    if (execResult.success) {
      sampleOutput = `${challenge.sampleOutputLabel}: ${JSON.stringify(execResult.result)}`;
      hasOutput = execResult.result.length > 0;
    } else {
      sampleOutput = `${challenge.sampleOutputLabel} Error: ${execResult.error}`;
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [
        ...prev,
        { run: runCount + 1, error: execResult.error },
      ]);
    }

    const timeTaken = challenge.timeLimit - timeLeft;

    // Format feedback
    let feedback = "";
    if (execResult.success && hasOutput) {
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
      const score = calculateScore(timeTaken, challenge.timeLimit, errorCount, hasOutput);
      setScore(score);
      feedback = `Congratulations, you retrieved the inserted data in ${formatTime(timeTaken)}!\n`;
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
      const score = calculateScore(timeTaken, challenge.timeLimit, errorCount, hasOutput);
      setScore(score);
      feedback = `Score: ${score}/100\n`;
      if (errorCount > 0) {
        feedback += `You had ${errorCount} error${errorCount > 1 ? "s" : ""} in ${runCount + 1} run${runCount > 0 ? "s" : ""}:\n`;
        errorHistory.forEach((err) => {
          feedback += `- Run ${err.run}: ${err.error}\n`;
        });
      }
      feedback += hasOutput
        ? "Data retrieved, but review your query for better performance."
        : "No data retrieved. Ensure you insert and select data correctly.";
    }

    setOutput(`Sample Run:\n${sampleOutput}\n\n${feedback}`);
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
    <main className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] flex items-center justify-center p-4 relative overflow-hidden">
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
            className={`absolute text-blue-600 text-5xl z-10 rotate-12 ${Object.entries(pos)
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
              MySQL Sandbox
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
                      ? "bg-cyan-500 text-white"
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
              className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium shadow-lg"
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
            className="flex-1 bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 md:p-12 flex flex-col"
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