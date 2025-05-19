"use client";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { SiReact } from "react-icons/si";

const challenges = [
  {
    level: "Basic",
    title: "Create a Counter Component",
    description: "Build a React component that displays a count and increments it when a button is clicked.",
    initialCode: `function Counter() {
  // Your code here
  return (
    <div>
      <p>Count: 0</p>
      <button>Increment</button>
    </div>
  );
}`,
    testCases: [
      {
        description: "Renders a counter display",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector("div");
          return container && container.textContent.includes("Count:");
        },
        points: 20,
      },
      {
        description: "Has an increment button",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector("button");
          return button && button.textContent === "Increment";
        },
        points: 20,
      },
      {
        description: "Increments count on click",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector("div");
          const button = iframe.contentDocument.querySelector("button");
          if (!container || !button) return false;
          const initialCount = parseInt(container.textContent.match(/\d+/)[0], 10);
          button.dispatchEvent(new Event("click"));
          setTimeout(() => {}, 100); // Allow state update
          const newCount = parseInt(container.textContent.match(/\d+/)[0], 10);
          return newCount === initialCount + 1;
        },
        points: 30,
      },
    ],
    timeLimit: 300, // 5 minutes
  },
  {
    level: "Intermediate",
    title: "Build a Toggle Component",
    description: "Create a component that toggles between 'On' and 'Off' states when a button is clicked.",
    initialCode: `function Toggle() {
  // Your code here
  return (
    <div>
      <p>State: Off</p>
      <button>Toggle</button>
    </div>
  );
}`,
    testCases: [
      {
        description: "Displays initial state 'Off'",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector("div");
          return container && container.textContent.includes("State: Off");
        },
        points: 20,
      },
      {
        description: "Has a toggle button",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector("button");
          return button && button.textContent === "Toggle";
        },
        points: 20,
      },
      {
        description: "Toggles state on click",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector("div");
          const button = iframe.contentDocument.querySelector("button");
          if (!container || !button) return false;
          const initialState = container.textContent.includes("State: Off");
          button.dispatchEvent(new Event("click"));
          setTimeout(() => {}, 100); // Allow state update
          const newState = container.textContent.includes("State: On");
          return initialState && newState;
        },
        points: 30,
      },
    ],
    timeLimit: 600, // 10 minutes
  },
  {
    level: "Hard",
    title: "Create a Todo List",
    description: "Build a todo list component where users can add items using an input and button.",
    initialCode: `function TodoList() {
  // Your code here
  return (
    <div>
      <input type="text" placeholder="Add a todo" />
      <button>Add Todo</button>
      <ul></ul>
    </div>
  );
}`,
    testCases: [
      {
        description: "Renders an input field",
        check: (iframe) => {
          const input = iframe.contentDocument.querySelector("input");
          return input && input.getAttribute("placeholder") === "Add a todo";
        },
        points: 15,
      },
      {
        description: "Has an add button",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector("button");
          return button && button.textContent === "Add Todo";
        },
        points: 15,
      },
      {
        description: "Adds a todo item on button click",
        check: (iframe) => {
          const input = iframe.contentDocument.querySelector("input");
          const button = iframe.contentDocument.querySelector("button");
          const ul = iframe.contentDocument.querySelector("ul");
          if (!input || !button || !ul) return false;
          input.value = "Test Todo";
          input.dispatchEvent(new Event("input", { bubbles: true }));
          button.dispatchEvent(new Event("click"));
          setTimeout(() => {}, 100); // Allow state update
          const li = ul.querySelector("li");
          return li && li.textContent === "Test Todo";
        },
        points: 20,
      },
      {
        description: "Displays the todo list",
        check: (iframe) => {
          const ul = iframe.contentDocument.querySelector("ul");
          return ul && ul.children.length > 0;
        },
        points: 20,
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

export default function ReactSandboxPage() {
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
      const saved = localStorage.getItem("completedChallengesReact");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      localStorage.setItem("completedChallengesReact", JSON.stringify(completedChallenges));
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
          setOutput("Time's up! Please review React concepts and try again. Learn more: https://react.dev/learn");
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
      // Validate and render React code in iframe
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.5/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<${challenges[currentChallenge].title.replace(/\s/g, "")}/>);
          </script>
        </body>
        </html>
      `;
      setOutput("Rendered successfully");
      if (iframeRef.current) {
        iframeRef.current.srcdoc = html;
      }
    } catch (error) {
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [...prev, { run: runCount + 1, error: error.message || "Invalid React syntax" }]);
      setOutput(`Error: ${error.message || "Invalid React syntax"}`);
    }
  };

  const evaluateCode = () => {
    const challenge = challenges[currentChallenge];
    let baseScore = 0;
    const results = challenge.testCases.map((test) => {
      const passed = test.check(iframeRef.current);
      if (passed) {
        baseScore += test.points;
      }
      return { passed };
    });

    const timeLimit = challenge.timeLimit;
    const timeUsed = timeLimit - timeLeft;
    const timePercentage = (timeUsed / timeLimit) * 100;
    const timeDeduction = (timePercentage / 100) * 10;
    const timeScore = Math.max(0, 10 - timeDeduction);

    const errorDeduction = Math.min(errorCount * 2, 10);
    const errorScore = 10 - errorDeduction;

    let efficiencyBonus = 0;
    if (runCount + 1 <= 2) {
      efficiencyBonus = 10;
    } else if (runCount + 1 <= 5) {
      efficiencyBonus = 5;
    }

    const totalScore = Math.round(baseScore + timeScore + errorScore + efficiencyBonus);
    setScore(totalScore);

    if (results.every((res) => res.passed)) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!completedChallenges.includes(challenge.level.toLowerCase())) {
        setCompletedChallenges((prev) => [...prev, challenge.level.toLowerCase()]);
      }
      let feedback = `Congratulations, you passed all tests!\n`;
      feedback += `Base Score: ${baseScore}/70\n`;
      feedback += `Time Used: ${Math.round(timePercentage)}% of the limit, earning ${Math.round(timeScore)}/10 time points\n`;
      feedback += `Errors Encountered: ${errorCount}, deducting ${errorDeduction} points (Error Score: ${errorScore}/10)\n`;
      if (errorCount > 0) {
        feedback += `Error Details:\n`;
        errorHistory.forEach((err) => {
          feedback += `- Run ${err.run}: ${err.error}\n`;
        });
      }
      feedback += `Efficiency: Completed in ${runCount + 1} runs, earning a ${efficiencyBonus}-point bonus\n`;
      feedback += `Total Score: ${totalScore}/100\n`;

      if (timeScore < 5) {
        feedback += "Tip: Try to complete the challenge faster to improve your time score.\n";
      }
      if (errorCount > 0) {
        feedback += "Tip: Reduce errors by validating your React syntax before running.\n";
      }
      if (efficiencyBonus < 5) {
        feedback += "Tip: Plan your code to minimize runs and maximize your efficiency bonus.\n";
      }
      if (totalScore === 100) {
        feedback += "Perfect score! Excellent work!";
      } else if (totalScore >= 80) {
        feedback += "Great job! You're close to a perfect score.";
      } else {
        feedback += "Good effort! Review the tips to improve your score.";
      }
      setOutput(feedback);
    } else {
      let feedback = `Score Breakdown:\n`;
      feedback += `Base Score: ${baseScore}/70\n`;
      feedback += `Not all test cases passed. Focus on passing all tests to earn additional points for time, errors, and efficiency.\n`;
      if (baseScore < 50) {
        feedback += "Tip: Review the test case requirements and ensure your React component matches the expected behavior.";
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
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-[#e0e9ff] to-[#d0deff] flex items-center justify-center p-4 relative overflow-hidden">
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
        <SiReact
          key={i}
          className={`absolute text-pink-600 text-5xl z-10 rotate-12 ${Object.entries(pos)
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
              React Sandbox
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
                      ? "bg-indigo-500 text-white"
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
              defaultLanguage="javascript"
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
            className="flex-1 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 md:p-12 flex flex-col"
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
                sandbox="allow-same-origin allow-scripts"
              />
              <pre className="text-sm text-gray-800 p-4">{output || "Run your code to see the output."}</pre>
            </motion.div>
            {isTimeUp && (
              <motion.p className="text-red-600 mt-4" variants={itemVariants}>
                Time's up! Please review React concepts and try again.{" "}
                <a href="https://react.dev/learn" className="underline">
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