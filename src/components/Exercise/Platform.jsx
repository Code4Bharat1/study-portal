"use client";
import { useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Sandbox from "@/components/Sandbox";

export default function QuestionPlatform({ setSidebarContent, menuItems, files, filesOpened, task }) {
    const instructionRef = useRef();
    const overlayRef = useRef();


    const showInstructions = () => {
        instructionRef.current.classList.remove("hidden");
        overlayRef.current.classList.remove("hidden");
    };

    const hideInstructions = () => {
        instructionRef.current.classList.add("hidden");
        overlayRef.current.classList.add("hidden");
    };

    return (
        <div className="relative">
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-40 hidden"
            />

            {/* Instructions Box */}
            <div
                ref={instructionRef}
                className="fixed top-35 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-white shadow-lg rounded-lg z-50 p-6 border hidden"
            >
                <h1 className="text-xl font-bold text-blue-600 mb-4 whitespace-pre-wrap">
                    {task}
                </h1>

                <h2 className="text-md font-semibold mb-2">Welcome! Please follow the instructions below to complete and test your work.</h2>

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

                <p className="text-sm mb-1">Only edit <code>index.html</code>.</p>
                <p className="text-sm mb-4">Close this box after reading the instructions.</p>

                <button
                    onClick={hideInstructions}
                    className="mt-2 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close Instructions
                </button>
            </div>

            {/* Top Bar */}
            <div className="flex justify-between items-center pt-5 p-5 relative z-10">
                <div className="flex space-x-4">
                    {["Basic", "intermediate", "hard"].map((level) => (
                        <label key={level}>
                            <input
                                type="radio"
                                name="level"
                                value={level}
                                className="peer sr-only"
                                defaultChecked={level === "Basic"}
                                onChange={setSidebarContent}
                            />
                            <div className={`peer-checked:ring-2 flex items-center px-4 py-2 rounded text-white cursor-pointer ${
                                level === "Basic"
                                    ? "bg-blue-500 hover:bg-blue-600 peer-checked:ring-blue-300"
                                    : level === "intermediate"
                                    ? "bg-green-500 hover:bg-green-600 peer-checked:ring-green-300"
                                    : "bg-red-500 hover:bg-red-600 peer-checked:ring-red-300"
                            }`}>
                                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={showInstructions}
                        className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        Instructions
                    </button>

                    <button
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        onClick={() => location.reload()} // crude reset
                    >
                        Reset
                    </button>

                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <div className="flex flex-row grow-1 relative z-10">
                <Sidebar menuItems={menuItems} />
                <Sandbox fileToOpen={filesOpened} filesObj={files} />
            </div>
        </div>
    );
}
