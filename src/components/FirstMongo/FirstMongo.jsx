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



// 'use client';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

// export default function FirstMongo() {
//   const router = useRouter();

//   const handleLearnClick = () => {
//     router.push('/homemongodbpage');
//   };

//   const handleVideoClick = () => {
//     window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank');
//   };

//   return (
//     <main className="relative min-h-screen bg-white flex items-center justify-center px-4 overflow-hidden">
//       {/* Decorative Background Blurred Circles */}
//       <div className="absolute w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-40 top-10 left-10"></div>
//       <div className="absolute w-60 h-60 bg-teal-300 rounded-full blur-2xl opacity-30 bottom-10 right-10"></div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//         className="flex flex-col md:flex-row max-w-7xl w-full bg-white/30 rounded-3xl shadow-2xl p-10 gap-12 backdrop-blur-xl border border-white/20"
//       >
//         {/* Left Section */}
//         <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left space-y-6 bg-white/40 rounded-2xl p-8 shadow-inner">
//           <h1 className="text-6xl md:text-7xl font-extrabold text-emerald-700">MongoDB</h1>
//           <p className="text-2xl text-emerald-800">The most popular NoSQL database</p>
//           <div className="flex flex-col gap-4 w-full md:flex-row md:gap-6 md:w-auto">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={handleLearnClick}
//               className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition shadow-md"
//             >
//               📚 Learn MongoDB
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={handleVideoClick}
//               className="bg-yellow-400 text-black px-8 py-4 rounded-full hover:bg-yellow-500 transition shadow-md"
//             >
//               🎥 Video Tutorial
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition shadow-md"
//             >
//               🚀 MongoDB Project
//             </motion.button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <motion.div 
//           whileHover={{ scale: 1.02 }}
//           className="flex-1 bg-white/40 rounded-2xl shadow-inner p-8 space-y-6 backdrop-blur-lg"
//         >
//           <h2 className="text-3xl font-semibold text-emerald-700">MongoDB Example:</h2>
//           <pre className="bg-green-100/80 text-sm text-green-900 p-6 rounded-lg overflow-x-auto border-l-4 border-emerald-600 font-mono">
// {`// Insert document
// db.users.insertOne({
//   name: "John Doe",
//   email: "john@example.com",
//   age: 25
// })

// // Find all users
// db.users.find({})

// // Update a user
// db.users.updateOne(
//   { name: "John Doe" },
//   { $set: { age: 26 } }
// )

// // Delete a user
// db.users.deleteOne({ name: "John Doe" })`}
//           </pre>
//         </motion.div>
//       </motion.div>
//     </main>
//   );
// }
