'use client';
import { CheckCircle } from "lucide-react";

export default function PythonBestPractice() {
  const sections = [
    {
      title: "Code Structure",
      items: [
        "Use meaningful names for variables, functions, and classes",
        "Keep functions small and focused",
        "Organize code using modules and packages"
      ]
    },
    {
      title: "Readability & Style",
      items: [
        "Follow PEP 8 styling guidelines",
        "Use consistent indentation (preferably 4 spaces)",
        "Avoid deep nesting for better readability"
      ]
    },
    {
      title: "Error Handling",
      items: [
        "Use try/except blocks to handle exceptions",
        "Catch specific exceptions rather than using a bare except",
        "Log errors for debugging and monitoring"
      ]
    },
    {
      title: "Performance",
      items: [
        "Use list comprehensions instead of loops where appropriate",
        "Avoid unnecessary computations in loops",
        "Use generators for large datasets"
      ]
    },
    {
      title: "Testing",
      items: [
        "Write unit tests using `unittest` or `pytest`",
        "Use mocks to test code in isolation",
        "Automate tests with CI tools"
      ]
    },
    {
      title: "Security",
      items: [
        "Sanitize user inputs to prevent injection attacks",
        "Keep dependencies updated",
        "Avoid hardcoding sensitive credentials"
      ]
    },
    {
      title: "Environment Management",
      items: [
        "Use virtual environments (`venv` or `virtualenv`)",
        "Manage dependencies with `requirements.txt` or `Pipfile`",
        "Isolate project environments to avoid version conflicts"
      ]
    },
    {
      title: "Documentation",
      items: [
        "Use docstrings for functions and classes",
        "Write README files for projects",
        "Comment on complex logic to help future developers"
      ]
    }
  ];

  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
        Python Best Practice
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
