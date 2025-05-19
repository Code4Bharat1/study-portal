"use client";

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { SiPhp } from "react-icons/si";

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
    title: "Basic: Sum of Array",
    description: "Write a function `sumArray` that takes an array of integers and returns their sum.",
    initialCode: `<?php
function sumArray($numbers) {
    // Your code here
}
?>`,
    testCases: [
      { input: [1, 2, 3], expected: 6 },
      { input: [-1, 1], expected: 0 },
      { input: [], expected: 0 },
    ],
    sampleInput: [1, 2, 3, 4, 5],
    sampleOutputLabel: "Sum of array",
    timeLimit: 300,
    fnName: "sumArray",
  },
  intermediate: {
    title: "Intermediate: Reverse Words",
    description: "Write a function `reverseWords` that reverses the order of words in a string.",
    initialCode: `<?php
function reverseWords($str) {
    // Your code here
}
?>`,
    testCases: [
      { input: "hello world", expected: "world hello" },
      { input: "PHP is fun", expected: "fun is PHP" },
      { input: "", expected: "" },
    ],
    sampleInput: "coding is awesome",
    sampleOutputLabel: "Reversed words",
    timeLimit: 600,
    fnName: "reverseWords",
  },
  hard: {
    title: "Hard: Longest Palindromic Substring",
    description: "Write a function `longestPalindrome` that finds the longest palindromic substring in a string.",
    initialCode: `<?php
function longestPalindrome($str) {
    // Your code here
}
?>`,
    testCases: [
      { input: "babad", expected: ["bab", "aba"] },
      { input: "cbbd", expected: "bb" },
      { input: "racecar", expected: "racecar" },
    ],
    sampleInput: "racecar",
    sampleOutputLabel: "Longest palindrome",
    timeLimit: 900,
    fnName: "longestPalindrome",
  },
};

// Simulated PHP code execution utility
const safeExecute = (code, fnName, input) => {
  try {
    // Simulated execution: Extract the function body and evaluate based on known solutions
    // In a real app, this would call a server-side API to execute PHP code
    let result;
    if (fnName === "sumArray") {
      // Simulate sumArray execution
      if (code.includes("$sum = 0") && code.includes("foreach ($numbers as $num)") && code.includes("$sum += $num")) {
        result = input.reduce((sum, num) => sum + num, 0);
      } else {
        throw new Error("Incorrect implementation or syntax error");
      }
    } else if (fnName === "reverseWords") {
      // Simulate reverseWords execution
      if (code.includes("explode") && code.includes("array_reverse") && code.includes("implode")) {
        result = input ? input.split(/\s+/).reverse().join(" ") : "";
      } else {
        throw new Error("Incorrect implementation or syntax error");
      }
    } else if (fnName === "longestPalindrome") {
      // Simulate longestPalindrome execution (simplified)
      if (code.includes("for") && code.includes("substr")) {
        const longestPalindrome = (str) => {
          if (!str) return "";
          let longest = "";
          for (let i = 0; i < str.length; i++) {
            for (let j = i; j < str.length; j++) {
              const substr = str.substring(i, j + 1);
              if (substr === substr.split("").reverse().join("") && substr.length > longest.length) {
                longest = substr;
              }
            }
          }
          return longest;
        };
        result = longestPalindrome(input);
      } else {
        throw new Error("Incorrect implementation or syntax error");
      }
    } else {
      throw new Error("Unknown function");
    }
    return { success: true, result: result ?? null };
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

export default function PHPSandboxPage() {
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
      const saved = localStorage.getItem("completedChallengesPHP");
      console.log("Initial completedChallenges from localStorage:", saved);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      console.log("Saving completedChallenges to localStorage:", completedChallenges);
      localStorage.setItem("completedChallengesPHP", JSON.stringify(completedChallenges));
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

    // Execute sample input
    let sampleOutput = "";
    const sampleResult = safeExecute(code, challenge.fnName, challenge.sampleInput);
    if (sampleResult.success) {
      sampleOutput = `${challenge.sampleOutputLabel}: ${JSON.stringify(sampleResult.result)}`;
    } else {
      sampleOutput = `${challenge.sampleOutputLabel} Error: ${sampleResult.error}`;
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [
        ...prev,
        { run: runCount + 1, error: sampleResult.error, input: challenge.sampleInput },
      ]);
    }

    // Execute test cases
    const results = challenge.testCases.map((test, i) => {
      const execResult = safeExecute(code, challenge.fnName, test.input);
      if (!execResult.success) {
        setErrorCount((prev) => prev + 1);
        setErrorHistory((prev) => [
          ...prev,
          { run: runCount + 1, error: execResult.error, input: test.input },
        ]);
        console.log(`Test ${i + 1} failed with error:`, execResult.error);
        return { passed: false, error: execResult.error, input: test.input, actual: null };
      }
      const actual = execResult.result;
      const expected = Array.isArray(test.expected) ? test.expected : [test.expected];
      const actualValue = actual === null || actual === undefined ? (challenge.fnName === "sumArray" ? 0 : "") : actual;
      const passed = expected.some(exp => 
        actualValue === exp || 
        (typeof exp === "number" && typeof actualValue === "number" && actualValue === exp)
      );
      console.log(`Test ${i + 1}: Input=${JSON.stringify(test.input)}, Expected=${JSON.stringify(expected)}, Got=${actual}, Passed=${passed}`);
      return { passed, actual, expected: test.expected, input: test.input };
    });

    const allTestsPassed = results.every((res) => res.passed);
    console.log("All tests passed:", allTestsPassed);
    const timeTaken = challenge.timeLimit - timeLeft;

    // Format test case output
    const outputText = results
      .map((res, i) => {
        const inputStr = JSON.stringify(res.input);
        const expectedStr = JSON.stringify(res.expected);
        const actualStr = res.actual !== null ? JSON.stringify(res.actual) : "N/A";
        if (!res.passed) {
          return res.error
            ? `Test ${i + 1} failed (Error): ${res.error}\n   Input: ${inputStr}\n   Expected: ${expectedStr}\n   Got: N/A`
            : `Test ${i + 1} failed: \n   Input: ${inputStr}\n   Expected: ${expectedStr}\n   Got: ${actualStr}`;
        }
        return `Test ${i + 1} passed!\n   Input: ${inputStr}\n   Expected: ${expectedStr}\n   Got: ${actualStr}`;
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
          feedback += `- Run ${err.run}: ${err.error} (Input: ${JSON.stringify(err.input)})\n`;
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
          ? "Well done! Try to optimize your code for a higher score."
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
          feedback += `- Run ${err.run}: ${err.error} (Input: ${JSON.stringify(err.input)})\n`;
        });
      }
      feedback += score >= 50
        ? "Not bad, but some tests failed. Review the errors and try again!"
        : "Too many issues. Study the test cases and debug your code.";
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
    <main className="min-h-screen bg-gradient-to-br from-[#f3e8ff] via-[#edd9ff] to-[#e7c9ff] flex items-center justify-center p-4 relative overflow-hidden">
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
          <SiPhp
            className={`absolute text-indigo-600 text-5xl z-10 rotate-12 ${Object.entries(pos)
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
              PHP Sandbox
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-6" variants={itemVariants}>
              {challenges[level].description}
            </motion.p>
            <motion.div className="flex gap-4 mb-6" variants={containerVariants} key={completedChallenges.join()}>
              {["basic", "intermediate", "hard"].map((lvl) => (
                <motion.button
                  key={lvl}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    level === lvl
                      ? "bg-purple-500 text-white"
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
              defaultLanguage="php"
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
            <motion.button
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRunCode}
              disabled={isRunning && timeLeft <= 0}
              aria-label="Run code"
            >
              Run Code
            </motion.button>
          </motion.div>
          {/* Right: Output and Feedback */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 md:p-12 flex flex-col"
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
              <pre className="text-sm text-gray-800">{output || "Run your code to see the output."}</pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}