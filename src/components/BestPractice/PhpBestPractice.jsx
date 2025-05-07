'use client';
import { CheckCircle } from "lucide-react";

export default function PhpBestPractice() {
  const sections = [
    {
      title: "Code Organization",
      items: [
        "Follow PSR standards (e.g., PSR-1, PSR-4)",
        "Use namespaces and autoloading (Composer-based)",
        "Separate logic, views, and configuration"
      ]
    },
    {
      title: "Security",
      items: [
        "Always validate and sanitize user inputs",
        "Use prepared statements to prevent SQL injection",
        "Hash passwords securely using `password_hash()`",
        "Disable `display_errors` in production",
        "Use HTTPS and secure cookies"
      ]
    },
    {
      title: "Performance Optimization",
      items: [
        "Use OPcache to cache compiled bytecode",
        "Avoid using `include`/`require` in loops",
        "Use output buffering when appropriate",
        "Profile code using tools like Xdebug or Blackfire"
      ]
    },
    {
      title: "Error Handling",
      items: [
        "Use try-catch blocks for exception handling",
        "Set custom error and exception handlers",
        "Log errors instead of displaying them to users"
      ]
    },
    {
      title: "Database Interaction",
      items: [
        "Use PDO or ORM (like Eloquent) for DB access",
        "Avoid raw SQL queries when possible",
        "Use transactions where applicable",
        "Handle connection errors gracefully"
      ]
    },
    {
      title: "Testing",
      items: [
        "Write unit tests using PHPUnit",
        "Test core business logic separately",
        "Use mocks/stubs to isolate components"
      ]
    },
    {
      title: "Dependency Management",
      items: [
        "Use Composer for managing libraries",
        "Avoid committing `vendor` directory to version control",
        "Specify exact versions for stability"
      ]
    },
    {
      title: "Documentation & Comments",
      items: [
        "Document functions and classes using PHPDoc",
        "Keep code self-explanatory and clean",
        "Write meaningful commit messages and changelogs"
      ]
    }
  ];

  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
        Best Practice For Php
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
