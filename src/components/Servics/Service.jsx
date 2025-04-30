// "use client";

// import React from 'react';

// const steps = [
//   { id: '01', title: 'Defining clean Objectives for Service Design' },
//   { id: '02', title: 'Understanding the users using data or User Personas' },
//   { id: '03', title: 'Go through the current design ecosystem' },
//   { id: '04', title: 'Identifying issues & optimizations in current design ecosystem' },
//   { id: '05', title: 'Ideation or coming up with innovative solutions' },
//   { id: '06', title: 'Testing and Iterating the changes' },
// ];

// const Service = () => {
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
//       <div className="relative w-[600px] h-[600px]">
//         {/* Center Circle */}
//         <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-md">
//           <div className="text-center">
//             <p className="text-sm text-gray-500">Working Process of</p>
//             <h2 className="text-xl font-bold text-gray-800">Service Design</h2>
//           </div>
//         </div>

//         {/* Circular Steps */}
//         {steps.map((step, index) => {
//           const angle = (360 / steps.length) * index;
//           const radius = 250;

//           const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
//           const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

//           return (
//             <div
//               key={step.id}
//               className="absolute w-48 text-center"
//               style={{
//                 top: `calc(50% + ${y}px)`,
//                 left: `calc(50% + ${x}px)`,
//                 transform: 'translate(-50%, -50%)',
//               }}
//             >
//               <span className="block font-semibold text-green-700 mb-1">Step {step.id}</span>
//               <p className="text-sm text-gray-600">{step.title}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Service;

"use client";

import React from 'react';
import { Wrench, Users, Lightbulb } from 'lucide-react';

const steps = [
  { id: '01', title: 'Defining clean Objectives for Service Design' },
  { id: '02', title: 'Understanding the users using data or User Personas' },
  { id: '03', title: 'Go through the current design ecosystem' },
  { id: '04', title: 'Identifying issues & optimizations in current design ecosystem' },
  { id: '05', title: 'Ideation or coming up with innovative solutions' },
  { id: '06', title: 'Testing and Iterating the changes' },
];

const services = [
  { icon: <Wrench size={40} className="text-green-600" />, title: "Service Setup", description: "We help structure your services from scratch." },
  { icon: <Users size={40} className="text-green-600" />, title: "User Research", description: "Understand your audience with our in-depth research." },
  { icon: <Lightbulb size={40} className="text-green-600" />, title: "Creative Solutions", description: "Innovative ideas to improve your service experience." },
];

const Service = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 flex flex-col items-center justify-start space-y-12">
      
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Circular Steps Section */}
      <div className="relative w-[600px] h-[600px]">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-md">
          <div className="text-center">
            <p className="text-sm text-gray-500">Working Process of</p>
            <h2 className="text-xl font-bold text-gray-800">Service Design</h2>
          </div>
        </div>

        {/* Circular Steps */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin-once">
          {steps.map((step, index) => {
            const angle = (360 / steps.length) * index;
            const radius = 250;
            const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
            return (
              <div
                key={step.id}
                className="absolute w-48 text-center opacity-0 animate-fadeIn"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="block font-semibold text-green-700 mb-1">Step {step.id}</span>
                <p className="text-sm text-gray-600">{step.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {services.map((service, idx) => (
          <div key={`bottom-${idx}`} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Service;

