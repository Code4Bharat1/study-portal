// 'use client';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { SiMongodb } from "react-icons/si";


// export default function FirstMongo() {
//   const router = useRouter();

//   const handleLearnClick = () => {
//     router.push('/homemongodbpage');
//   };

//   const handleVideoClick = () => {
//     window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank');
//   };

//   return (
//     <main className="min-h-screen bg-white flex items-center justify-center px-4">

//          {/* Background Icons */}
     
      

//       <div className="flex flex-col md:flex-row max-w-6xl w-full bg-green-100 rounded-lg shadow-lg p-6 gap-10">
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
//               className="bg-[#d8d0a4] text-black px-6 py-3 rounded-full hover:bg-yellow-200 transition"
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
// db.users.deleteOne({ name: "John Doe" })

// // Delete a user
// db.users.deleteOne({ name: "John Doe" })

// // Count users in a city
// db.users.countDocuments({ city: "London" })
// `}
//           </pre>
//         </div>
//       </div>
//     </main>
//   );
// }







'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { SiMongodb } from "react-icons/si";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare
  ,
  FaPython,
  FaJava,
  FaGithub,
 
  FaLinux,
  FaDatabase
 } from 'react-icons/fa';

export default function FirstMongo() {
  const router = useRouter();

  const handleLearnClick = () => {
    router.push('/homemongodbpage');
  };

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=J6mDkcqU_ZE', '_blank');
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">

         {/* Background Icons */}
         <div className="absolute  z-0 pointer-events-none">
        <FaReact className="absolute top-47 right-150 text-blue-500 text-[55px] animate-spin-slow" />
        <FaNodeJs className="absolute top-34 left-143 text-green-400 text-[54px]" />
        <FaHtml5 className="absolute bottom-23 right-153 text-orange-400 text-[54px] rotate-12" />
        <FaCss3Alt className="absolute bottom-60 left-50 text-blue-400 text-[50px] rotate-12" />
        <FaJsSquare className="absolute bottom-23 right-12  text-yellow-400 text-[50px]" />
        <FaPython className="absolute bottom-18 left-100 text-yellow-500 text-[50px]" />
<FaJava className="absolute top-55 right-23 text-red-600 text-[50px]" />
<FaGithub className="absolute top- 22 right-220 text-black text-[50px]" />
<SiMongodb className="absolute top-30 right-60 text-green-600 text-[50px]" />

<FaLinux className="absolute bottom-76 right-150 text-gray-700 text-[50px]" />
<FaDatabase className="absolute bottom-75 right-54 text-purple-300 text-[50px] rotate-23" />
      </div>
      

      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-green-100 rounded-lg shadow-lg p-6 gap-10">
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
              className="bg-[#d8d0a4] text-black px-6 py-3 rounded-full hover:bg-yellow-200 transition"
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
          <h2 className="text-2xl font-semibold text-black mb-4">MongoDB Example:</h2>
          <pre className="bg-white text-sm text-green-800 p-4 rounded-lg overflow-x-auto border-l-4 border-green-500">
{`db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 25
})
db.users.find({})
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 26 } }
)
db.users.deleteOne({ name: "John Doe" })

// Delete a user
db.users.deleteOne({ name: "John Doe" })

// Count users in a city
db.users.countDocuments({ city: "London" })
`}
          </pre>
        </div>
      </div>
    </main>
  );
}












