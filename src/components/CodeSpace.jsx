            // app/page.js
            'use client';

            import { useState, useRef, useEffect } from 'react';

            export default function CodeSpace() {
            const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, CodeSpace!");');
            const [output, setOutput] = useState('');
            const [isDragging, setIsDragging] = useState(false);
            const [paneWidth, setPaneWidth] = useState(50); // Percentage
            const containerRef = useRef(null);

            const runCode = () => {
                try {
                // Redirect console.log to capture output
                const logs = [];
                const originalLog = console.log;
                console.log = (...args) => {
                    logs.push(args.join(' '));
                };

                // Evaluate code
                eval(code);

                // Restore console.log
                console.log = originalLog;

                setOutput(logs.join('\n') || 'No output');
                } catch (error) {
                setOutput(`Error: ${error.message}`);
                }
            };

            const handleMouseDown = () => {
                setIsDragging(true);
            };

            const handleMouseUp = () => {
                setIsDragging(false);
            };

            const handleMouseMove = (e) => {
                if (isDragging && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
                if (newWidth >= 20 && newWidth <= 80) {
                    setPaneWidth(newWidth);
                }
                }
            };

            useEffect(() => {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);

                return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                };
            }, [isDragging]);

            return (
                <div className="min-h-screen bg-gray-900 text-white flex flex-col">
                <header className="bg-gray-800 p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">CodeSpace</h1>
                    <button
                    onClick={runCode}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                    Run Code
                    </button>
                </header>
                <main className="flex-1 flex" ref={containerRef}>
                    <div
                    className="bg-gray-800 p-4"
                    style={{ width: `${paneWidth}%` }}
                    >
                    <textarea
                        className="w-full h-full bg-gray-700 text-white p-2 rounded font-mono resize-none focus:outline-none"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                    />
                    </div>
                    <div
                    className="w-2 bg-gray-600 cursor-col-resize hover:bg-gray-500"
                    onMouseDown={handleMouseDown}
                    />
                    <div className="flex-1 bg-gray-800 p-4">
                    <h2 className="text-lg font-semibold mb-2">Output</h2>
                    <pre className="bg-gray-700 p-2 rounded h-full overflow-auto">
                        {output || 'Click "Run Code" to see output'}
                    </pre>
                    </div>
                </main>
                </div>
            );
            }