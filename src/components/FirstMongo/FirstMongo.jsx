'use client';
import { useRouter } from 'next/navigation';

export default function FirstMongo() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/homemongodbpage'); // adjust if needed
  };

  const handleVideoClick = () => {
    // Open only the MongoDB video in a new tab
    window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank'); // MongoDB video
  };

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10 ">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <h1 className="text-7xl font-bold text-black mb-4">MongoDB</h1>
          <p className="text-xl text-black mb-6">
            The most popular NoSQL database
          </p>
          <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
            <button
              onClick={handleLearnClick}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Learn MongoDB
            </button>
            <button 
              onClick={handleVideoClick} 
              className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
            >
              Video Tutorial
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
              MongoDB Project
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">MongoDB Example:</h2>
          <pre className="bg-white text-sm text-green-800 p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
{`// Insert document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 25
})

// Find all users
db.users.find({})

// Update a user
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 26 } }
)

// Delete a user
db.users.deleteOne({ name: "John Doe" })`}
          </pre>
        </div>
      </div>
    </main>
  );
}




