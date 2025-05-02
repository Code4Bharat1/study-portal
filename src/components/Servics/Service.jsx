// "use client";

// import React, { useState } from 'react';

// const steps = [
//   { id: '01', title: 'Researching Market Trends and Audience Preferences', description: 'Understanding the target market and identifying key trends is essential for designing a product that resonates with the audience.' },
//   { id: '02', title: 'Designing Wireframes and Initial Mockups', description: 'Creating basic wireframes and mockups helps visualize the design structure and get feedback early in the process.' },
//   { id: '03', title: 'Prototyping and Gathering User Feedback', description: 'Prototyping allows for real-world testing of the design and gathering actionable feedback from users.' },
//   { id: '04', title: 'Implementing Design Changes and Finalizing Layout', description: 'Final adjustments are made to the layout based on feedback and testing, ensuring the design is user-friendly and functional.' },
//   { id: '05', title: 'Testing for Usability and Accessibility', description: 'Ensuring the design is accessible to all users and easy to navigate through rigorous testing is a critical step.' },
//   { id: '06', title: 'Launch and Post-Launch Monitoring', description: 'After launching the product, it’s essential to monitor performance and gather data for continuous improvement.' },
// ];

// const Service = () => {
//   const [hoveredStep, setHoveredStep] = useState(null);
//   const [activeStep, setActiveStep] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
//       <div className="relative w-[600px] h-[600px]">

//         {/* Center Circle */}
//         <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg z-10">
//           <div className="text-center">
//             <p className="text-sm text-gray-500">The Process of</p>
//             <h2 className="text-xl font-semibold text-gray-800">Creative Design</h2>
//           </div>
//         </div>

//         {/* Circular Standing Cards */}
//         {steps.map((step, index) => {
//           const angle = (360 / steps.length) * index;
//           const radius = 250;

//           const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
//           const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

//           return (
//             <div
//               key={step.id}
//               className={`absolute w-48 p-4 bg-white rounded-xl shadow-lg border border-blue-200 transition-all duration-300 hover:scale-110 hover:bg-blue-100 cursor-pointer ${
//                 hoveredStep === step.id ? 'scale-110 bg-blue-100' : ''
//               }`}
//               style={{
//                 top: `calc(50% + ${y}px)`,
//                 left: `calc(50% + ${x}px)`,
//                 transform: 'translate(-50%, -50%) rotate(0deg)',
//               }}
//               onMouseEnter={() => setHoveredStep(step.id)}
//               onMouseLeave={() => setHoveredStep(null)}
//               onClick={() => setActiveStep(step.id)}
//             >
//               <span className="block font-semibold text-blue-700 mb-1">Step {step.id}</span>
//               <p className="text-sm text-gray-600 font-medium">{step.title}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Service;



"use client";

import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Importing the arrow icon

const steps = [
  { id: '01', title: 'Introduction to Programming', description: 'Learn the basics of programming languages, such as variables, data types, and basic syntax. Get started with an easy language like Python or JavaScript.' },
  { id: '02', title: 'Control Flow and Loops', description: 'Understand how to control the flow of your program using conditional statements and loops to make decisions and repeat tasks.' },
  { id: '03', title: 'Functions and Methods', description: 'Explore how functions work in coding, helping you write modular, reusable code. Learn about parameters, return values, and scope.' },
  { id: '04', title: 'Object-Oriented Programming (OOP)', description: 'Delve into object-oriented programming concepts such as classes, objects, inheritance, and encapsulation to structure your code better.' },
  { id: '05', title: 'Data Structures and Algorithms', description: 'Learn essential data structures like arrays, lists, and hashmaps, and dive into algorithms that help solve problems efficiently.' },
  { id: '06', title: 'Building Projects and Practice', description: 'Start building projects like websites or apps to apply what you’ve learned, and practice coding through challenges to improve your skills.' },
];

const Service = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-[700px] h-[700px] mx-auto">

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg z-10">
          <div className="text-center px-4">
            <p className="text-sm text-gray-500">The Process of</p>
            <h2 className="text-xl font-semibold text-gray-800">Creative Design</h2>
          </div>
        </div>

        {/* Circular Cards */}
        {steps.map((step, index) => {
          const angle = (360 / steps.length) * index;
          const radius = 280;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
          const isActive = activeStep === step.id;

          return (
            <div
              key={step.id}
              className="absolute transition-all duration-500 ease-in-out cursor-pointer"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 50 : 20,
              }}
              onClick={() => setActiveStep(isActive ? null : step.id)}
            >
              <div
                className={`relative w-56 h-40 p-5 bg-white rounded-xl border border-blue-200 
                  transition-all duration-500 ease-in-out shadow-xl transform ${isActive ? 'scale-105 shadow-2xl' : 'scale-100'}`}
              >
                <span className="block font-semibold text-blue-700 mb-1">Step {step.id}</span>
                <p className="text-sm text-gray-700 font-medium">{step.title}</p>

                {/* Arrow in the Card */}
                <FaArrowRight 
                  className={`absolute bottom-4 right-4 text-blue-500 cursor-pointer transition-all duration-300 ease-in-out 
                    ${isActive ? 'scale-110' : ''}`} 
                />
                {/* Description to the right or left */}
                <div
                  className={`absolute top-1/2 ${step.id === '05' || step.id === '06' ? 'right-full mr-4' : 'left-full ml-4'}
                    -translate-y-1/2 w-64 bg-blue-50 p-4 rounded-lg border border-blue-200 z-50
                    transition-all duration-500 ease-in-out transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                  <p className="text-sm text-gray-700">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
