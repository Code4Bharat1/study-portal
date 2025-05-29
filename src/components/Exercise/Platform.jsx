"use client";
import { useState, useRef, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Sandbox from "@/components/Sandbox";
// import Sandbox from "../sandbox";
//import Sandbox from "@/components/Sandbox";
//import Sandbox from "@/components/Sandbox"; // Adjust the import path as necessary

export default function QuestionPlatform({
  setSidebarContent,
  menuItems,
  files,
  filesOpened,
  task,
}) {
  const [sandboxLoaded, setSandboxLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const instructionRef = useRef(null);
  const overlayRef = useRef(null);

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
          {task}
        </h1>
        <h2 className="text-md font-semibold mb-2">
          Welcome! Please follow the instructions below to complete and test
          your work.
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
          ⚠️ If a command is already running, press <kbd>Ctrl + C</kbd> to
          cancel.
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

          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Submit
          </button>
        </div>
      </div>

      {/* Main Content: Sidebar only shows if sandboxLoaded is true */}
      <div className="flex flex-row relative z-10 pr-2">
        <div className="order-2 grow">{sandboxElement}</div>

        {sandboxLoaded && (
          <div className="order-1 w-64 break-words">
            <Sidebar menuItems={menuItems} />
          </div>
        )}
      </div>
    </div>
  );
}
