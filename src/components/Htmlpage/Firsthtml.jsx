'use client';
import { useRouter } from 'next/navigation';

export default function Firsthtml() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/htmlHome'); // Adjust if needed
  };

  const handleVideoClick = () => {
    // Open only the HTML video in a new tab
    window.open('https://www.youtube.com/watch?v=pQN-pn6p3u0', '_blank'); // HTML video
  };

  return (
    <main className="min-h-screen bg-[#82b6b7] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">HTML</h1>
          <p className="text-xl text-black mb-6">
            A standard markup language for documents designed to be displayed in a web browser.
          </p>
          <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-[#2f4d4e] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Learn HTML
            </button>
            <button 
              onClick={handleVideoClick} 
              className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              HTML Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">HTML Example:</h2>
          <pre className="bg-white text-sm text-[#47595a] p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
{`<!-- HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is an example paragraph.</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <div class="container">
        <h2>HTML Basics</h2>
        <p>HTML stands for HyperText Markup Language.</p>
    </div>
</body>
</html>`}
          </pre>
        </div>
      </div>
    </main>
  );
}






