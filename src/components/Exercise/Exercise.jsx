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

import React from "react";
import { useRouter } from "next/navigation";
import {
  Database,
  Server,
  Atom,
  Code,
  Cpu,
  Layers,
  FileText,
  Terminal,
  GitBranch,
  Monitor,
  Layout,
} from "lucide-react";

// Feature data
const features = [
  {
    id: "01",
    title: "Mongodb",
    description: "Fit your coursework around your existing commitments and obligations.",
    icon: Database,
  },
  {
    id: "02",
    title: "Express",
    description: "Learn from industry experts with real-world experience.",
    icon: Server,
  },
  {
    id: "03",
    title: "React",
    description: "Explore a wide range of development courses.",
    icon: Atom,
  },
  {
    id: "04",
    title: "Node js",
    description: "Stay updated with latest backend practices.",
    icon: Code,
  },
  {
    id: "05",
    title: "Python",
    description: "Master continuous integration and deployment pipelines.",
    icon: Cpu,
    
  },
  {
    id: "06",
    title: "Java",
    description: "Design intuitive and user-friendly interfaces.",
    icon: Layers,
  },
  {
    id: "07",
    title: "Sql",
    description: "Learn how to write unit and integration tests.",
    icon: FileText,
    
  },
  {
    id: "08",
    title: "C++",
    description: "Master Git and collaborative workflows.",
    icon: GitBranch,
    
  },
];

// Random background icons generation
const randomIcons = Array.from({ length: 60 }, () => {
  let top, left;
  do {
    top = Math.floor(Math.random() * 100);
    left = Math.floor(Math.random() * 100);
  } while (top > 30 && top < 70 && left > 25 && left < 75);

  const Icon = [
    Database,
    Server,
    Atom,
    Code,
    Cpu,
    Layers,
    FileText,
    Terminal,
    GitBranch,
    Monitor,
    Layout,
  ][Math.floor(Math.random() * 11)];

  const size = Math.floor(Math.random() * 40) + 20;
  const opacity = Math.random() * 0.5 + 0.3;
  const rotate = Math.floor(Math.random() * 360);
  return { Icon, top, left, size, opacity, rotate };
});

const Exercise = () => {
  const router = useRouter();

  const handleCardClick = (title, comingSoon) => {
    if (comingSoon) return;
    const cleanedTitle = title.toLowerCase().replace(/\s+/g, "");
    router.push(`/question${cleanedTitle}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-white">
      {/* Background Icons */}
      {randomIcons.map(({ Icon, top, left, size, opacity, rotate }, index) => (
        <div
          key={index}
          className="absolute z-0 text-gray-300"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotate}deg)`,
            opacity: opacity,
            fontSize: `${size}px`,
          }}
        >
          <Icon size={size} />
        </div>
      ))}

      {/* Cards */}
      <div className="relative z-10 flex flex-row flex-wrap gap-6 justify-center">
        {features.map((feature) => {
          const { id, title, description, icon: Icon, comingSoon } = feature;
          return (
            <div
              key={id}
              onClick={() => handleCardClick(title, comingSoon)}
              className="relative w-64 h-72 bg-white bg-opacity-80 p-6 rounded-xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] border border-gray-200 shadow-lg"
            >
              {/* COMING SOON Ribbon */}
              {comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="transform -rotate-45 bg-gradient-to-r from-gray-800 via-black to-gray-700 text-white text-sm font-semibold px-6 py-1 shadow-md opacity-90">
                    COMING SOON
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col items-center justify-center text-center h-full z-10 relative pt-2">
                <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-2 mt-[-8px]">
                  <Icon className="text-indigo-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-700 text-sm mt-2 px-2">{description}</p>
                {!comingSoon && (
                  <button className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
                    Learn more →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exercise;
