"use client";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { SiCss3 } from "react-icons/si";

const challenges = [
  {
    level: "Basic",
    title: "Style a Button",
    description: "Style a button with a specific background color, padding, and border radius.",
    initialCode: `/* Style the button */
.button {
  /* Your CSS here */
}`,
    html: `
      <div style="padding: 20px;">
        <button class="button">Click Me</button>
      </div>
    `,
    testCases: [
      {
        description: "Has background-color #FF7F50",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector(".button");
          return button && window.getComputedStyle(button).backgroundColor === "rgb(255, 127, 80)";
        },
        points: 30,
      },
      {
        description: "Has padding 12px 24px",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector(".button");
          return button && window.getComputedStyle(button).padding === "12px 24px";
        },
        points: 30,
      },
      {
        description: "Has border-radius 8px",
        check: (iframe) => {
          const button = iframe.contentDocument.querySelector(".button");
          return button && window.getComputedStyle(button).borderRadius === "8px";
        },
        points: 40,
      },
    ],
    timeLimit: 300, // 5 minutes
  },
  {
    level: "Intermediate",
    title: "Create a Flexbox Layout",
    description: "Use flexbox to create a centered, horizontal layout with three boxes.",
    initialCode: `/* Style the container and boxes */
.container {
  /* Your CSS here */
}
.box {
  /* Your CSS here */
}`,
    html: `
      <div class="container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
      </div>
    `,
    testCases: [
      {
        description: "Container has display: flex",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector(".container");
          return container && window.getComputedStyle(container).display === "flex";
        },
        points: 25,
      },
      {
        description: "Container has justify-content: center",
        check: (iframe) => {
          const container = iframe.contentDocument.querySelector(".container");
          return container && window.getComputedStyle(container).justifyContent === "center";
        },
        points: 25,
      },
      {
        description: "Boxes have width: 100px",
        check: (iframe) => {
          const boxes = iframe.contentDocument.querySelectorAll(".box");
          return Array.from(boxes).every((box) => window.getComputedStyle(box).width === "100px");
        },
        points: 25,
      },
      {
        description: "Boxes have margin: 10px",
        check: (iframe) => {
          const boxes = iframe.contentDocument.querySelectorAll(".box");
          return Array.from(boxes).every((box) => window.getComputedStyle(box).margin === "10px");
        },
        points: 25,
      },
    ],
    timeLimit: 600, // 10 minutes
  },
  {
    level: "Hard",
    title: "Animate a Card",
    description: "Create a card with a hover animation that scales and changes background color.",
    initialCode: `/* Style the card */
.card {
  /* Your CSS here */
}
.card:hover {
  /* Your CSS here */
}`,
    html: `
      <div style="padding: 20px;">
        <div class="card">Hover Me</div>
      </div>
    `,
    testCases: [
      {
        description: "Card has width: 200px and height: 100px",
        check: (iframe) => {
          const card = iframe.contentDocument.querySelector(".card");
          const style = window.getComputedStyle(card);
          return style.width === "200px" && style.height === "100px";
        },
        points: 20,
      },
      {
        description: "Card has transition property",
        check: (iframe) => {
          const card = iframe.contentDocument.querySelector(".card");
          return card && window.getComputedStyle(card).transition.includes("transform") && window.getComputedStyle(card).transition.includes("background-color");
        },
        points: 20,
      },
      {
        description: "Card scales to 1.1 on hover",
        check: (iframe) => {
          const card = iframe.contentDocument.querySelector(".card");
          card.dispatchEvent(new Event("mouseover"));
          const style = window.getComputedStyle(card);
          return style.transform.includes("scale(1.1)");
        },
        points: 30,
      },
      {
        description: "Card changes background-color on hover",
        check: (iframe) => {
          const card = iframe.contentDocument.querySelector(".card");
          const initialBg = window.getComputedStyle(card).backgroundColor;
          card.dispatchEvent(new Event("mouseover"));
          const hoverBg = window.getComputedStyle(card).backgroundColor;
          return initialBg !== hoverBg;
        },
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

export default function CssSandboxPage() {
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
      const saved = localStorage.getItem("completedChallengesCss");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && completedChallenges.length > 0) {
      localStorage.setItem("completedChallengesCss", JSON.stringify(completedChallenges));
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
          setOutput("Time's up! Please review CSS concepts and try again. Learn more: https://developer.mozilla.org/en-US/docs/Web/CSS");
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
      // Validate CSS by applying it to a temporary element
      const tempDiv = document.createElement("div");
      const style = document.createElement("style");
      style.textContent = code;
      document.head.appendChild(style);
      tempDiv.style.cssText = code;
      document.head.removeChild(style);

      // Render HTML with CSS in iframe
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>${code}</style>
        </head>
        <body>${challenges[currentChallenge].html}</body>
        </html>
      `;
      setOutput("Rendered successfully");
      if (iframeRef.current) {
        iframeRef.current.srcdoc = html;
      }
    } catch (error) {
      setErrorCount((prev) => prev + 1);
      setErrorHistory((prev) => [...prev, { run: runCount + 1, error: error.message || "Invalid CSS syntax" }]);
      setOutput(`Error: ${error.message || "Invalid CSS syntax"}`);
    }
  };

  const evaluateCode = () => {
    const challenge = challenges[currentChallenge];
    let totalScore = 0;
    const results = challenge.testCases.map((test) => {
      const passed = test.check(iframeRef.current);
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
          ? "You had several errors. Practice debugging CSS syntax to improve."
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
    <main className="min-h-screen bg-gradient-to-br from-[#ffe6e0] via-[#ffdcd3] to-[#ffd2c6] flex items-center justify-center p-4 relative overflow-hidden">
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
        <SiCss3
          key={i}
          className={`absolute text-red-400 text-5xl z-10 rotate-12 ${Object.entries(pos)
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
              CSS Sandbox
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
              defaultLanguage="css"
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
            className="flex-1 bg-gradient-to-br from-[#fff0ed] to-[#ffe6e0] p-8 md:p-12 flex flex-col"
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
                Time's up! Please review CSS concepts and try again.{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" className="underline">
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