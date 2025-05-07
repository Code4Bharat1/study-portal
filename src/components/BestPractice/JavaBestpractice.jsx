'use client';
import { CheckCircle } from "lucide-react";

export default function JavaBestpractice() {
  const sections = [
    {
      title: "Code Structure",
      items: [
        "Follow proper naming conventions (CamelCase for classes, camelCase for variables/methods)",
        "Keep classes focused on a single responsibility (SRP)",
        "Group related classes into packages"
      ]
    },
    {
      title: "OOP Principles",
      items: [
        "Encapsulate fields with private access and provide getters/setters",
        "Use inheritance and interfaces appropriately",
        "Favor composition over inheritance"
      ]
    },
    {
      title: "Exception Handling",
      items: [
        "Catch specific exceptions, not generic ones",
        "Avoid swallowing exceptions silently",
        "Use custom exceptions where necessary",
        "Log exceptions meaningfully"
      ]
    },
    {
      title: "Memory Management",
      items: [
        "Avoid memory leaks by releasing resources (e.g., streams, connections)",
        "Use `try-with-resources` for auto-closing",
        "Monitor memory usage with profiling tools"
      ]
    },
    {
      title: "Code Quality",
      items: [
        "Write unit tests using JUnit or TestNG",
        "Use static analysis tools like SonarLint",
        "Avoid code duplication",
        "Keep methods short and focused"
      ]
    },
    {
      title: "Performance",
      items: [
        "Use StringBuilder for string concatenation in loops",
        "Prefer ArrayList over LinkedList for faster random access",
        "Optimize database access (use connection pools, prepared statements)"
      ]
    },
    {
      title: "Concurrency",
      items: [
        "Avoid shared mutable state",
        "Use synchronization or concurrent collections when needed",
        "Prefer `ExecutorService` over manual thread management"
      ]
    },
    {
      title: "Security",
      items: [
        "Validate all user inputs",
        "Hash and salt passwords using secure algorithms",
        "Avoid exposing sensitive information in logs or error messages",
        "Keep dependencies and libraries up to date"
      ]
    }
  ];

  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
        Best Practice For Java
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
