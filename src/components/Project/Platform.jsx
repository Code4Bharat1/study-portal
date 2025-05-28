"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Sandbox from "@/components/Sandbox";
import ReactMarkdown from "react-markdown";

export default function ProjectPlatform({
  setSidebarContent,
  menuItems,
  projectType,
  task,
}) {
  const [sandboxLoaded, setSandboxLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const instructionRef = useRef(null);
  const overlayRef = useRef(null);

  const files = {
    "index.html": "<!DOCTYPE html><html><head><title>Project</title><link rel='stylesheet' href='styles.css'></head><body><script src='script.js'></script></body></html>",
    "styles.css": "",
    "script.js": "",
    "tests.test": `
const fs = require('fs');
const path = require('path');
const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`,
    "package.json": `{
      "name": "project-sandbox",
      "scripts": {
        "test": "node tests.test",
        "start": "node tests.test && servor",
        "output": "servor"
      },
      "dependencies": {
        "cheerio": "^1.0.0",
        "htmlhint": "^1.1.4",
        "servor": "^4.0.2",
        "express": "^4.18.2"
      }
    }`,
  };
  const filesOpened = "index.html";

  useEffect(() => {
    setStartTime(Date.now());
    const storedAttempts = localStorage.getItem(`attempts-${menuItems[0]?.label}`);
    if (storedAttempts) setAttempts(parseInt(storedAttempts));
    fetchLeaderboard();
  }, [menuItems]);

  const fetchLeaderboard = async () => {
    const response = await fetch(`/api/leaderboard/${projectType}`);
    const data = await response.json();
    setLeaderboard(data);
  };

  const showInstructions = () => {
    instructionRef.current.classList.remove("hidden");
    overlayRef.current.classList.remove("hidden");
  };

  const hideInstructions = () => {
    instructionRef.current.classList.add("hidden");
    overlayRef.current.classList.add("hidden");
  };

  const handleSandboxLoad = () => {
    setSandboxLoaded(true);
  };

  const handleLevelChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    setSidebarContent(event);
  };

  const handleSubmit = async () => {
    setAttempts(attempts + 1);
    localStorage.setItem(`attempts-${menuItems[0]?.label}`, attempts + 1);

    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;

    const correctness = Math.random() > 0.5 ? 1 : 0;
    const finalPoint =
      correctness * 0.5 +
      (1 - attempts / 10) +
      executionTime * 0.1;

    setResult(finalPoint);

    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: menuItems[0]?.label,
        finalPoint,
        attempts,
        executionTime,
        projectType,
      }),
    });

    fetchLeaderboard();
  };

  const sandboxElement = useMemo(() => {
    if (files && filesOpened) {
      return (
        <Sandbox
          fileToOpen={filesOpened}
          filesObj={files}
          onLoad={handleSandboxLoad}
        />
      );
    }
    return null;
  }, [files, filesOpened]);

  const levelColors = {
    Basic: "bg-blue-500 hover:bg-blue-600 peer-checked:ring-blue-300",
    intermediate: "bg-green-500 hover:bg-green-600 peer-checked:ring-green-300",
    hard: "bg-red-500 hover:bg-red-600 peer-checked:ring-red-300",
  };

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-40 hidden"
      />

      {/* Instructions */}
      <div
        ref={instructionRef}
        className="fixed top-35 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-white shadow-lg rounded-lg z-50 p-6 border hidden"
      >
        <h1 className="text-xl font-bold text-blue-600 mb-4 whitespace-pre-wrap">
          <ReactMarkdown>{task}</ReactMarkdown>
        </h1>
        <h2 className="text-md font-semibold mb-2">
          Welcome! Please follow the instructions below to complete and test your work.
        </h2>

        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4">
          <li>Open the terminal.</li>
          <li>
            Run:
            <pre className="bg-gray-100 p-2 mt-1 rounded text-xs">
              <code>npm run test</code>
            </pre>
          </li>
          <li>You must pass the tests before submitting.</li>
        </ol>

        <blockquote className="border-l-4 border-yellow-400 pl-4 text-yellow-800 text-sm mb-3">
          ⚠️ If a command is already running, press <kbd>Ctrl + C</kbd> to cancel.
        </blockquote>

        <h3 className="font-semibold text-sm mt-3 mb-1">🛠 Having Trouble?</h3>
        <pre className="bg-gray-100 p-2 rounded text-xs mb-3">
          <code>npm run start</code>
        </pre>

        <p className="text-sm mb-1">
          Only edit <code>index.html</code>.
        </p>
        <p className="text-sm mb-4">
          Close this box after reading the instructions.
        </p>

        <button
          onClick={hideInstructions}
          className="mt-2 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Instructions
        </button>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between items-center py-5 pl-3 pr-1 relative z-10">
        <div
          className="flex space-x-3"
          role="radiogroup"
          aria-label="Select Difficulty"
        >
          {["Basic", "intermediate", "hard"].map((level) => {
            const isSelected = selectedLevel === level;
            const baseColor =
              level === "Basic"
                ? "bg-blue-500 hover:bg-blue-600 ring-blue-300"
                : level === "intermediate"
                ? "bg-green-500 hover:bg-green-600 ring-green-300"
                : "bg-red-500 hover:bg-red-600 ring-red-300";

            return (
              <label key={level}>
                <input
                  type="radio"
                  name="level"
                  value={level}
                  className="sr-only peer"
                  onChange={handleLevelChange}
                  checked={isSelected}
                />
                <div
                  className={`
                    flex items-center justify-center px-4 py-2 rounded text-white cursor-pointer transition-all
                    ${baseColor}
                    ${isSelected ? "ring-4 scale-105 shadow-md" : ""}
                  `}
                >
                  <span className="capitalize">{level}</span>
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={showInstructions}
            className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Instructions
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Main Content: Sidebar only shows if sandboxLoaded is true */}
      <div className="flex flex-row relative z-10 pr-2">
        <div className="order-2 grow">
          <div className="h-[400px]">{sandboxElement}</div> {/* Reduced height */}
        </div>

        {sandboxLoaded && (
          <div className="order-1 w-64 break-words">
            <h1 className="text-xl font-bold mb-4">{projectType.toUpperCase()} Project Sandbox</h1>
            <Sidebar menuItems={menuItems} />
          </div>
        )}
      </div>

      {/* Leaderboard */}
      {sandboxLoaded && (
        <div className="mt-8 px-2">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Rank</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Attempts</th>
                <th className="border p-2">Time (s)</th>
                <th className="border p-2">Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={index === 0 ? "bg-green-100" : ""}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{entry.user}</td>
                  <td className="border p-2">{entry.score.toFixed(2)}</td>
                  <td className="border p-2">{entry.attempts}</td>
                  <td className="border p-2">{entry.executionTime}</td>
                  <td className="border p-2">{entry.upvotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result !== null && (
        <div className="mt-4 px-2">
          Result: {result.toFixed(2)} (Attempts: {attempts})
        </div>
      )}
    </div>
  );
}