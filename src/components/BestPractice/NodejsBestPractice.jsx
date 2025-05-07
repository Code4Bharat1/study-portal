'use client';
import { CheckCircle } from "lucide-react";

export default function NodeJsBestPractice() {
  const sections = [
    {
      title: "Code Structure",
      items: [
        "Organize code into modules with clear separation of concerns",
        "Use MVC (Model-View-Controller) pattern where applicable",
        "Avoid deeply nested callbacks (prefer async/await over callback hell)"
      ]
    },
    {
      title: "Error Handling",
      items: [
        "Use try-catch blocks to handle errors in async code",
        "Centralize error handling with middleware (e.g., Express error handler)",
        "Return proper HTTP status codes and messages for errors"
      ]
    },
    {
      title: "Performance Optimization",
      items: [
        "Use clustering to make full use of multi-core systems",
        "Leverage caching (e.g., Redis) to store frequently accessed data",
        "Minimize synchronous code execution in the event loop"
      ]
    },
    {
      title: "Security Best Practices",
      items: [
        "Use environment variables to store sensitive information",
        "Implement HTTPS, secure cookies, and JWT for authentication",
        "Regularly update dependencies and run security audits (e.g., `npm audit`)"
      ]
    },
    {
      title: "Logging & Monitoring",
      items: [
        "Implement structured logging (e.g., using Winston or Bunyan)",
        "Use monitoring tools like Prometheus or New Relic for real-time performance tracking",
        "Set up log rotation to avoid disk space issues"
      ]
    },
    {
      title: "API Design",
      items: [
        "Follow RESTful principles for APIs",
        "Use proper status codes and messages for API responses",
        "Version your API endpoints to ensure backward compatibility"
      ]
    },
    {
      title: "Database Interaction",
      items: [
        "Use an ORM (e.g., Sequelize) or query builder (e.g., Knex.js) for DB interaction",
        "Avoid SQL injection by using parameterized queries or ORM methods",
        "Ensure proper database connection pooling"
      ]
    },
    {
      title: "Testing",
      items: [
        "Write unit and integration tests (Jest, Mocha)",
        "Test asynchronous code with mock/stub and promises",
        "Use a test coverage tool (e.g., Istanbul) to ensure full test coverage"
      ]
    }
  ];

  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
        Best practice for NodeJs
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
