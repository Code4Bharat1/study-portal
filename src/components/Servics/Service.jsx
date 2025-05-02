"use client";

import React, { useState } from 'react';

const steps = [
  { id: '01', title: 'Researching Market Trends and Audience Preferences', description: 'Understanding the target market and identifying key trends is essential for designing a product that resonates with the audience.' },
  { id: '02', title: 'Designing Wireframes and Initial Mockups', description: 'Creating basic wireframes and mockups helps visualize the design structure and get feedback early in the process.' },
  { id: '03', title: 'Prototyping and Gathering User Feedback', description: 'Prototyping allows for real-world testing of the design and gathering actionable feedback from users.' },
  { id: '04', title: 'Implementing Design Changes and Finalizing Layout', description: 'Final adjustments are made to the layout based on feedback and testing, ensuring the design is user-friendly and functional.' },
  { id: '05', title: 'Testing for Usability and Accessibility', description: 'Ensuring the design is accessible to all users and easy to navigate through rigorous testing is a critical step.' },
  { id: '06', title: 'Launch and Post-Launch Monitoring', description: 'After launching the product, it’s essential to monitor performance and gather data for continuous improvement.' },
];

const Service = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
      <div className="relative w-[600px] h-[600px]">

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg z-10">
          <div className="text-center">
            <p className="text-sm text-gray-500">The Process of</p>
            <h2 className="text-xl font-semibold text-gray-800">Creative Design</h2>
          </div>
        </div>

        {/* Circular Standing Cards */}
        {steps.map((step, index) => {
          const angle = (360 / steps.length) * index;
          const radius = 250;

          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <div
              key={step.id}
              className={`absolute w-48 p-4 bg-white rounded-xl shadow-lg border border-blue-200 transition-all duration-300 hover:scale-110 hover:bg-blue-100 cursor-pointer ${
                hoveredStep === step.id ? 'scale-110 bg-blue-100' : ''
              }`}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%) rotate(0deg)',
              }}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => setActiveStep(step.id)}
            >
              <span className="block font-semibold text-blue-700 mb-1">Step {step.id}</span>
              <p className="text-sm text-gray-600 font-medium">{step.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
