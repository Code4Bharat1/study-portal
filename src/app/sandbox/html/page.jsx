"use client";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { SiHtml5 } from "react-icons/si";

const challenges = [
  {
    level: "Basic",
    title: "Create a Simple HTML Page",
    description: "Create an HTML page with a heading, paragraph, and ordered list of 3 items.",
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page</title>
</head>
<body>
    <!-- Your code here -->
</body>
</html>`,
    testCases: [
      { description: "Has <h1>", check: (output) => output.includes("<h1>"), points: 30 },
      { description: "Has <p>", check: (output) => output.includes("<p>"), points: 30 },
      {
        description: "Has <ol> with 3 <li>",
        check: (output) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(output, "text/html");
          const ol = doc.querySelector("ol");
          return ol && ol.querySelectorAll("li").length === 3;
        },
        points: 40,
      },
    ],
    timeLimit: 300, // 5 minutes
  },
  {
    level: "Intermediate",
    title: "Build a Form",
    description: "Create a form with a text input, email input, and submit button, styled with basic CSS.",
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Contact Form</title>
    <style>
        /* Your CSS here */
    </style>
</head>
<body>
    <!-- Your form here -->
</body>
</html>`,
    testCases: [
      { description: "Has <form>", check: (output) => output.includes("<form"), points: 20 },
      { description: "Has text input", check: (output) => output.includes('type="text"'), points: 20 },
      { description: "Has email input", check: (output) => output.includes('type="email"'), points: 20 },
      { description: "Has submit button", check: (output) => output.includes('type="submit"'), points: 20 },
      { description: "Has CSS styles", check: (output) => output.includes("<style"), points: 20 },
    ],
    timeLimit: 600, // 10 minutes
  },
  {
    level: "Hard",
    title: "Create a Responsive Navbar",
    description: "Build a responsive navbar with at least 4 links, using HTML and CSS with a media query.",
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Navbar</title>
    <style>
        /* Your CSS with media query here */
    </style>
</head>
<body>
    <!-- Your navbar here -->
</body>
</html>`,
    testCases: [
      { description: "Has <nav>", check: (output) => output.includes("<nav"), points: 20 },
      {
        description: "Has at least 4 links",
        check: (output) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(output, "text/html");
          return doc.querySelectorAll("a").length >= 4;
        },
        points: 20,
      },
      { description: "Has CSS media query", check: (output) => output.includes("@media"), points: 30 },
      {
        description: "Has flex or grid",
        check: (output) => output.includes("display: flex") || output.includes("display: grid"),
        points: 30,
      },
    ],
    timeLimit: 900, // 15 minutes
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)", transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

export default function HtmlSandboxPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(challenges[0].timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [errorHistory, setErrorHistory] = useState([]);
  const [runCount, setRunCount] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedChallengesHtml");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      localStorage.setItem("completedChallengesHtml", JSON.stringify(completedChallenges));
    }
  }, [completedChallenges]);

  useEffect(() => {
    setCode(challenges[currentChallenge].initialCode);
    setTimeLeft(challenges[currentChallenge].timeLimit);
    setOutput("");
    setScore(null);
    setIsTimeUp(false);
    setErrorCount(0);
    setErrorHistory([]);
    setRunCount(0);
    if (iframeRef.current) iframeRef.current.srcdoc = "";
    if (timerRef.current) clearInterval(timerRef.current);
  }, [currentChallenge]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          setOutput("Time's up! Please review HTML concepts and try again. Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentChallenge]);

  const runCode = () => {
    setScore(null);
    setRunCount((prev) => prev + 1);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/html");
      if (!doc.body) throw new Error("Invalid HTML structure");
      setOutput("Rendered successfully");
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
      }
    } catch (error) {
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [...prev, { run: runCount + 1, error: error.message }]);
      setOutput(`Error: ${error.message}`);
    }
  };

  const evaluateCode = () => {
    const challenge = challenges[currentChallenge];
    let totalScore = 0;
    const results = challenge.testCases.map((test) => {
      const passed = test.check(code);
      if (passed) {
        totalScore += test.points;
      }
      return { passed };
    });

    setScore(totalScore);

    if (results.every((res) => res.passed)) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!completedChallenges.includes(challenge.level.toLowerCase())) {
        setCompletedChallenges((prev) => [...prev, challenge.level.toLowerCase()]);
      }
      let feedback = `Congratulations, you passed all tests!\n`;
      feedback += `Total Runs: ${runCount + 1}\n`;
      feedback += `Errors Encountered: ${errorCount}\n`;
      if (errorCount > 0) {
        feedback += `Error Details:\n`;
        errorHistory.forEach((err) => {
          feedback += `- Run ${err.run}: ${err.error}\n`;
        });
        feedback += errorCount > 2
          ? "You had several errors. Practice debugging HTML structure to improve."
          : "Good effort, but review your errors to avoid similar mistakes.";
      } else {
        feedback += "Perfect! No errors, great job!";
      }
      setOutput(feedback);
    }
  };

  const selectChallenge = (index) => {
    const level = challenges[index].level.toLowerCase();
    if (index === 0 || completedChallenges.includes(challenges[index - 1].level.toLowerCase())) {
      setCurrentChallenge(index);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
        <SiHtml5
          key={i}
          className={`absolute text-indigo-600 text-5xl z-10 rotate-12 ${Object.entries(pos)
            .map(([k, v]) => `${k}-${v}`)
            .join(" ")}`}
        />
      ))}

      <motion.div
        className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row">
          <motion.div className="flex-1 p-8 md:p-12 flex flex-col" variants={itemVariants}>
            <motion.h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              HTML Sandbox
            </motion.h1>
            <motion.p className="text-lg text-gray-600 mb-6" variants={itemVariants}>
              {challenges[currentChallenge].description}
            </motion.p>
            <motion.div className="flex gap-4 mb-6" variants={containerVariants}>
              {challenges.map((challenge, index) => (
                <motion.button
                  key={challenge.level}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentChallenge === index
                      ? "bg-purple-500 text-white"
                      : index === 0 || completedChallenges.includes(challenges[index - 1]?.level.toLowerCase())
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  variants={buttonVariants}
                  whileHover={
                    index === 0 || completedChallenges.includes(challenges[index - 1]?.level.toLowerCase())
                      ? "hover"
                      : ""
                  }
                  whileTap={
                    index === 0 || completedChallenges.includes(challenges[index - 1]?.level.toLowerCase())
                      ? "tap"
                      : ""
                  }
                  onClick={() => selectChallenge(index)}
                  disabled={index !== 0 && !completedChallenges.includes(challenges[index - 1]?.level.toLowerCase())}
                >
                  {challenge.level}
                </motion.button>
              ))}
            </motion.div>
            <Editor
              height="400px"
              defaultLanguage="html"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
            />
            <motion.div className="flex gap-4 mt-4" variants={itemVariants}>
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={runCode}
                disabled={isTimeUp}
              >
                Run Code
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={evaluateCode}
                disabled={isTimeUp}
              >
                Submit
              </motion.button>
              {currentChallenge < challenges.length - 1 && (
                <motion.button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={nextChallenge}
                >
                  Next Challenge
                </motion.button>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 md:p-12 flex flex-col"
            variants={itemVariants}
          >
            <motion.div className="flex justify-between items-center mb-4" variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-gray-900">{challenges[currentChallenge].title}</h2>
              <span className="text-lg text-gray-600">Time Left: {formatTime(timeLeft)}</span>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-lg h-[400px] overflow-auto" variants={itemVariants}>
              <iframe
                ref={iframeRef}
                title="Output"
                className="w-full h-[300px]"
                sandbox="allow-same-origin"
              />
              <pre className="text-sm text-gray-800 p-4">{output || "Run your code to see the output."}</pre>
            </motion.div>
            {isTimeUp && (
              <motion.p className="text-red-600 mt-4" variants={itemVariants}>
                Time's up! Please review HTML concepts and try again.{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" className="underline">
                  Learn More
                </a>
              </motion.p>
            )}
            {score !== null && !isTimeUp && !output.startsWith("Congratulations") && (
              <motion.p className="text-lg font-semibold mt-4" variants={itemVariants}>
                Score: {score}/100
                {score < 70 && (
                  <span className="text-sm text-gray-600"> - Practice more to improve your skills!</span>
                )}
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}