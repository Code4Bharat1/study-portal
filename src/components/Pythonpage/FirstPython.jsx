'use client';
import { useRouter } from 'next/navigation';

export default function FirstPython() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/pythonHome'); // adjust path if needed
  };

  const handleVideoClick = () => {
    // Open Python video in new tab
    window.open('https://www.youtube.com/watch?v=_uQrJ0TkZlc', '_blank'); // Python video by freeCodeCamp
  };

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">Python</h1>
          <p className="text-xl text-black mb-6">
            A powerful, easy-to-learn programming language
          </p>
          <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Learn Python
            </button>
            <button
              onClick={handleVideoClick}
              className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Python Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Python Example:</h2>
          <pre className="bg-white text-sm text-blue-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
{`# Define a function
def greet(name):
    return f"Hello, {name}!"

# Use the function
print(greet("John"))

# List operations
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits)

# Dictionary
user = {"name": "John", "age": 25}
user["age"] = 26
print(user)`}
          </pre>
        </div>
      </div>
    </main>
  );
}
