import Link from 'next/link';

export default function NodePage() {
  return (
    <main className="min-h-screen bg-[#d0f0fd] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">Node.js</h1>
          <p className="text-xl text-black mb-6">
            JavaScript runtime built on Chrome's V8 engine
          </p>
          <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <Link href="/nodehome">
              <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
                Learn Node.js
              </button>
            </Link>
            <Link href="https://www.youtube.com/watch?v=TlB_eWDSMt4">
              <button className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition">
                Video Tutorial
              </button>
            </Link>
            <Link href="/node-projects">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                Node.js Project
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Node.js Example:</h2>
          <pre className="bg-white text-sm text-black p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
{`const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js!');
});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`}
          </pre>
        </div>
      </div>
    </main>
  );
}