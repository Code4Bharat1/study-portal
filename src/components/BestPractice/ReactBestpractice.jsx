'use client';
import { CheckCircle } from "lucide-react";

export default function ReactBestpractice() {
  const sections = [
    {
      title: "Component Design",
      items: [
        "Keep components small and focused (Single Responsibility Principle)",
        "Use functional components and hooks instead of class components",
        "Break complex UI into reusable components"
      ]
    },
    {
      title: "Hooks Usage",
      items: [
        "Use built-in hooks like useState, useEffect, useMemo appropriately",
        "Avoid unnecessary re-renders by using useCallback and useMemo",
        "Follow rules of hooks (only call hooks at the top level)"
      ]
    },
    {
      title: "State Management",
      items: [
        "Lift state up when necessary",
        "Use context for global/shared state (or use libraries like Redux, Zustand)",
        "Keep local component state minimal and manageable"
      ]
    },
    {
      title: "Performance Optimization",
      items: [
        "Use React.memo to prevent unnecessary renders",
        "Lazy load components using React.lazy and Suspense",
        "Paginate or virtualize long lists to improve performance"
      ]
    },
    {
      title: "File & Folder Structure",
      items: [
        "Organize by feature or domain, not type",
        "Use clear and consistent naming conventions",
        "Keep styles, tests, and components close together"
      ]
    },
    {
      title: "Code Quality",
      items: [
        "Use TypeScript or PropTypes for type checking",
        "Write unit and integration tests (Jest, React Testing Library)",
        "Lint your code (ESLint, Prettier)",
        "Avoid deeply nested JSX and inline styles"
      ]
    },
    {
      title: "API & Data Fetching",
      items: [
        "Use SWR/React Query for data fetching & caching",
        "Handle loading and error states gracefully",
        "Avoid excessive API calls in useEffect"
      ]
    },
    {
      title: "Security & Accessibility",
      items: [
        "Avoid direct DOM manipulation (use refs if necessary)",
        "Use semantic HTML and ARIA attributes for accessibility",
        "Escape user input to prevent XSS attacks",
        "Use HTTPS and environment variables for secrets"
      ]
    }
  ];
  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
        Best Practice For React
      </h1>

      {/* Vertical timeline line */}
      <div className="absolute left-1/2 top-24 w-1 bg-blue-400 h-[calc(100%-8rem)] transform -translate-x-1/2" />

      {/* Top indicator dot */}
      <div className="absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-10" />

      {/* Bottom indicator dot */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-10" />

      {/* Timeline sections */}
      <div className="space-y-16">
        {sections.map((section, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={section.title}
              className={`flex flex-col md:flex-row ${isLeft ? "" : "md:flex-row-reverse"} items-start md:items-center`}
            >
              <div className="md:w-1/2 px-6">
                <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4 tracking-tight">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-800 list-disc list-inside">
                    {section.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center w-1/2 relative">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg absolute top-4">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
