// 'use client';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';

// export default function FirstMongo() {
//   const router = useRouter();

//   const handleLearnClick = () => {
//     router.push('/homemongodbpage');
//   };

//   const handleVideoClick = () => {
//     window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank');
//   };

//   return (
//     <main className="min-h-screen bg-green-100 flex items-center justify-center px-4">
//       <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white/0 rounded-lg shadow-lg p-6 gap-10 ">
//         {/* Left Section */}
//         <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
//           <h1 className="text-7xl font-bold text-black mb-4">MongoDB</h1>
//           <p className="text-xl text-black mb-6">
//             The most popular NoSQL database
//           </p>
//           <div className="flex flex-col gap-4 w-full md:flex-row md:gap-3 md:w-auto">
//             <button
//               onClick={handleLearnClick}
//               className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
//             >
//               Learn MongoDB
//             </button>
//             <button 
//               onClick={handleVideoClick} 
//               className="bg-yellow-200 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
//             >
//               Video Tutorial
//             </button>
//             <Link href="/mongodb-projects">
//               <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
//                 MongoDB Project
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-semibold text-black mb-4">MongoDB Example:</h2>
//           <pre className="bg-white text-sm text-green-800 p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
// {`db.users.insertOne({
//   name: "John Doe",
//   email: "john@example.com",
//   age: 25
// })
// db.users.find({})
// db.users.updateOne(
//   { name: "John Doe" },
//   { $set: { age: 26 } }
// )
// db.users.deleteOne({ name: "John Doe" })`}
//           </pre>
//         </div>
//       </div>
//     </main>
//   );
// }


'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { SiMongodb, SiReact, SiPython,SiNextdotjs, SiJavascript } from 'react-icons/si';

export default function FirstMongo() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/homemongodbpage');
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank');
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background icons */}
      <div className="absolute top-10 left-10  z-0 rotate-23">
        <SiMongodb className="text-green-600 text-[80px]" />
      </div>
      <div className="absolute top-1/3 right-10 z-0">
        <SiReact className="text-blue-500 text-[56px]" />
      </div>

      <div className="absolute top-30 right-89 z-44">
      <SiPython className="text-yellow-300 text-[60px]" />
      </div>
      <div className="absolute top-85 left-20  z-44">
      <SiNextdotjs className="text-red-200 text-[50px]" />
      </div>


      <div className="absolute bottom-20 right-230  z-44 rotate-34">
      <SiJavascript className="text-orange-300 text-[55px]" />
      </div>

      <div className="absolute top-45 right-230  z-44">
      <SiNextdotjs className="text-black text-[40px]" />
      </div>

      <div className="absolute top-45 right-230  z-44">
      <SiNextdotjs className="text-black text-[40px]" />
      </div>
    

      {/* Green inner box */}
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full bg-green-100 rounded-lg shadow-lg p-6 gap-10">
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
            <Link href="/mongodb-projects">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                MongoDB Project
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4 relative z-10">MongoDB Example:</h2>
          <pre className="relative z-10 bg-white text-sm text-green-800 p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
{`// Insert document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
})

// Find documents
db.users.find({})
db.users.find({ age: { $gte: 18 } })
// Update document
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 26, role: "superadmin" } }
)
// Delete document
db.users.deleteOne({ name: "John Doe" })

`}
          </pre>
        </div>
      </div>
    </main>
  );
}


