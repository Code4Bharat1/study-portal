'use client';
import { useRouter } from 'next/navigation';

export default function FirstJava() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/javaHome'); // Update path as needed
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=grEKMHGYyns', '_blank'); // Java tutorial
  };

  return (
    <main className="min-h-screen bg-[#f5e6c8] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
        
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-[#1b1b1b] mb-4">Java</h1>
          <p className="text-xl text-[#1b1b1b] mb-6">
            A high-level, class-based, object-oriented programming language widely used for building robust applications.
          </p>
          <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-[#4a3f35] text-white px-6 py-3 rounded-full hover:bg-[#3a2e25] transition"
            >
              Learn Java
            </button>
            <button
              onClick={handleVideoClick}
              className="bg-yellow-300 text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              Java Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Java Example:</h2>
          <pre className="bg-white text-sm text-[#37474f] p-4 rounded-lg overflow-x-auto border-l-4 border-green-600">
{`// Java Program Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Welcome to Java!");
    }
}`}
          </pre>
            {/* Variables and Data Types */}
            <h3 className="text-xl font-semibold text-black mt-6">2. Variables and Data Types</h3>
          <pre className="bg-white text-sm text-[#37474f] p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
{`public class VariablesExample {
    public static void main(String[] args) {
        int age = 25;
        double price = 19.99;
        String name = "John";
        boolean isJavaFun = true;

        System.out.println(name + " is " + age + " years old.");
    }
}`}
          </pre>
        </div>
      </div>
    </main>
  );
}
