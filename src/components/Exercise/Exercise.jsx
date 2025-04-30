// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';

// const features = [
//   { id: '01', title: 'Mongodb', description: 'Fit your coursework around your existing commitments and obligations.', color: 'from-orange-100 to-orange-300' },
//   { id: '02', title: 'Express', description: 'Learn from industry experts with real-world experience.', color: 'from-purple-100 to-purple-300' },
//   { id: '03', title: 'React', description: 'Explore a wide range of development courses.', color: 'from-pink-100 to-pink-300' },
//   { id: '04', title: 'Node js', description: 'Stay updated with latest backend practices.', color: 'from-green-100 to-green-300' },
//   { id: '05', title: 'Nextjs', description: 'Build modern apps with SSR support.', color: 'from-blue-100 to-blue-300' },
//   { id: '06', title: 'Java', description: 'Master core programming concepts with Java.', color: 'from-yellow-100 to-yellow-300' },
// ];

// const Exercise = () => {
//   const router = useRouter();

//   const handleCardClick = (title) => {
//     const cleanedTitle = title.toLowerCase().replace(/\s+/g, '');
//     router.push(`/question${cleanedTitle}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
//         {features.map((feature) => (
//           <div
//             key={feature.id}
//             onClick={() => handleCardClick(feature.title)}
//             className={`bg-gradient-to-br ${feature.color} p-6 rounded-3xl shadow-lg cursor-pointer transition-transform hover:scale-105`}
//           >
//             <span className="text-xs uppercase font-semibold text-gray-700">Label</span>
//             <h3 className="text-xl font-bold mt-2 text-gray-800">{feature.title}</h3>
//             <p className="text-gray-700 text-sm mt-1">{feature.description}</p>
//             <button className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
//               Learn more →
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Exercise;

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const features = [
  { id: '01', title: 'Mongodb', description: 'Fit your coursework around your existing commitments and obligations.', color: 'white' },
  { id: '02', title: 'Express', description: 'Learn from industry experts with real-world experience.', color: 'white' },
  { id: '03', title: 'React', description: 'Explore a wide range of development courses.', color: 'white' },
  { id: '04', title: 'Node ', description: 'Stay updated with latest backend practices.', color: 'white' },
  { id: '05', title: 'Nextjs', description: 'Build modern apps with SSR support.', color: 'white' },
  { id: '06', title: 'Java', description: 'Master core programming concepts with Java.', color: 'white' },
];

const Exercise = () => {
  const router = useRouter();

  const handleCardClick = (title) => {
    const cleanedTitle = title.toLowerCase().replace(/\s+/g, '');
    router.push(`/question${cleanedTitle}`);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6" 
      style={{ backgroundImage: "url('/exercise4.png')" }}
    >
      {/* Outer container with white background and rounded corners */}
      <div className="  p-10 rounded-3xl shadow-2xl w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleCardClick(feature.title)}
              className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl shadow-md cursor-pointer  transition-transform hover:scale-105 backdrop-blur-md bg-white/10`}

            >
              <span className="text-xs uppercase font-semibold text-gray-700">Label</span>
              <h3 className="text-xl font-bold mt-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-700 text-sm mt-1">{feature.description}</p>
              <button className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercise;




