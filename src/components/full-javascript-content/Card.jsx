'use client';
import { useRouter } from 'next/navigation';

export default function FirstJavascript() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/javascript/home'); // adjust path if needed>
  };

  const handleVideoClick = () => {
    // Open JavaScript video in new tab
    window.open('https://www.youtube.com/watch?v=sscX432bMZo', '_blank'); // freeCodeCamp JS tutorial
  };

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-lg shadow-lg p-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">JavaScript</h1>
          <p className="text-xl text-black mb-6">
            JavaScript is the programming language of the Web.
          </p>
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition whitespace-nowrap"
            >
              Learn JavaScript
            </button>
            <button
              onClick={handleVideoClick}
              className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition whitespace-nowrap"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition whitespace-nowrap">
              JavaScript Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">JavaScript Example:</h2>
          <pre className="bg-white text-sm text-blue-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
{`<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

  <script>
    alert( 'Hello, world!' );
  </script>

  <p>...After the script.</p>

</body>

</html>`}
          </pre>
        </div>
      </div>
    </main>
  );
}
    