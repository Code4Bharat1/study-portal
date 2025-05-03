import { FaStar } from "react-icons/fa";

export default function LearnPythonCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl p-10 flex flex-col gap-10 md:flex-row">
        
        {/* Left Side - Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="/python-icon.png"
              alt="Python Logo"
              className="w-16 h-16 rounded-full shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Learn Python Programming</h1>
              <p className="text-gray-600 text-sm mt-1">
                Start your Python journey with beginner-friendly lessons and real-world projects.
              </p>
            </div>
          </div>

          {/* Rating & Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <div className="flex items-center text-yellow-500 font-medium">
              <FaStar className="mr-1" /> 4.6
            </div>
            <span>27 Lessons</span>
            <span>Beginner</span>
            <span>224k Learners</span>
          </div>

          {/* Button */}
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
            Resume Learning
          </button>

          {/* Progress */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Progress: 5%</p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-indigo-500 h-full w-[5%] rounded-full"></div>
            </div>
          </div>

          {/* Up Next Cards */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Up Next</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Practice Python", "Problem Solving", "Python Projects"].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition"
                >
                  <p className="font-medium text-indigo-800">{item}</p>
                  <span className="text-indigo-500 text-xs font-semibold mt-1 inline-block">
                    Continue
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Python Code Example */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Python Code Example</h3>

          <p className="text-sm text-gray-600">
            Here’s a beginner-friendly example demonstrating conditionals and string formatting in Python:
          </p>

          <div className="bg-gray-200 text-blue-500 p-6 rounded-xl text-xs font-mono overflow-x-auto shadow-inner leading-relaxed">
            <div className="mb-2 text-blue-500 font-semibold">Python</div>
            <pre>
{`name = "Amaan"
age = 19

print("Hello, Python!")

if age >= 18:
    print(f"{name} is an adult.")
else:
    print(f"{name} is not an adult.")`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
