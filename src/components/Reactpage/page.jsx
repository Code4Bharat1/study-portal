import Link from "next/link";

export default function ReactPage() {
    return (
      <main className="min-h-screen bg-[#f3e8ff] flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
          
          {/* Left Section */}
          <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
            <h1 className="text-7xl font-bold text-black mb-4">React</h1>
            <p className="text-xl text-black mb-6">
              A JavaScript library for building user interfaces
            </p>
            <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <Link href="reacthome" >
              <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                Learn React
              </button>
              </Link>
              <Link href = "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige">
              <button className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition">
                Video Tutorial
              </button>
              </Link>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                React Project
              </button>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-black mb-4">React Example:</h2>
            <pre className="bg-white text-sm text-black p-4 rounded-lg overflow-x-auto border-l-4 border-bg-[#f3e8ff]">
  {`import React from 'react';
  
  function App() {
    return (
      <div>
        <h1>Hello React!</h1>
        <p>This is a paragraph.</p>
      </div>
    );
  }
  
  export default App;`}
            </pre>
          </div>
        </div>
      </main>
    );
  }
  