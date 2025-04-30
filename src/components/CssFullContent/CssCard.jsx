import Link from 'next/link';

export default function CssPage() {
    return (
      <main className="min-h-screen bg-[#ffe6e0] flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10">
          
          {/* Left Section */}
          <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
            <h1 className="text-7xl font-bold text-black mb-4">CSS</h1>
            <p className="text-xl text-black mb-6">
              Cascading Style Sheets for web styling
            </p>
            <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
              <Link href="/CssHome">
                <button className="bg-[#FF7F50] text-white px-6 py-3 rounded-full hover:bg-[#e66f47] transition">
                  Learn CSS
                </button>
              </Link>
              <button className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition">
                Video Tutorial
              </button>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                CSS Reference
              </button>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-black mb-4">CSS Example:</h2>
            <pre className="bg-white text-sm text-black p-4 rounded-lg overflow-x-auto border-l-4 border-[#FF7F50]">
{`/* Styling a button */
.button {
  background-color: #FF7F50;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #e66f47;
}

.button:active {
  transform: scale(0.98);
}`}
            </pre>
          </div>
        </div>
      </main>
    );
}