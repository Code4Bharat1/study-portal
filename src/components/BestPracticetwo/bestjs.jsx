'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {
    const sections = [
        {
          title: "JS: Code Quality & Style",
          items: [
            "Use `let` and `const` instead of `var` (prefer `const` for variables that don't change)",
            "Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes)",
            "Use strict mode: `'use strict';` to catch common bugs",
            "Avoid global variables: use modules or closures to contain scope",
            "Group related code logically to improve organization",
            "Use meaningful variable and function names"
          ]
        },
        {
          title: "JS: Maintainability",
          items: [
            "Keep functions small and focused — each should do one thing",
            "Write DRY code (Don't Repeat Yourself) — extract and reuse common logic",
            "Use comments wisely — explain 'why' not 'what' when unclear",
            "Use ESLint or Prettier to enforce style and automatically catch issues",
            "Avoid deep nesting — refactor with early returns or separate functions"
          ]
        },
        {
          title: "JS: Performance",
          items: [
            "Debounce or throttle heavy DOM/event listeners",
            "Prefer async/await over callbacks or `.then()` chains for clarity",
            "Minimize reflows and repaints in the DOM",
            "Cache DOM queries and reused values"
          ]
        },
        {
          title: "JS: Security",
          items: [
            "Never trust user input — always sanitize and validate",
            "Avoid using `eval()` or `Function()` as they can execute malicious code",
            "Deploy with HTTPS and secure HTTP headers",
            "Escape user-generated content to prevent XSS",
            "Use Content Security Policy (CSP) headers"
          ]
        },
        {
          title: "JS: Testing",
          items: [
            "Write unit tests using tools like Jest, Mocha, or Vitest",
            "Test edge cases and ensure robust error handling",
            "Write integration and end-to-end tests if possible",
            "Use mocking and spies to isolate unit logic"
          ]
        },
        {
          title: "JS: Modern Features & Tooling",
          items: [
            "Use ES6+ features like arrow functions, destructuring, and template literals",
            "Modularize code with `import`/`export` to keep it maintainable",
            "Use a bundler/build tool like Webpack, Vite, or Rollup for production readiness",
            "Take advantage of tools like Babel or TypeScript for compatibility and type safety"
          ]
        },
        {
          title: "JS: Error Handling",
          items: [
            "Use `try...catch` blocks to handle unexpected runtime errors",
            "Gracefully handle rejected promises with `.catch()` or `try/catch` in async functions",
            "Log useful error messages for debugging",
            "Fail fast — check for invalid data early"
          ]
        },
        {
          title: "JS: Readability",
          items: [
            "Use consistent indentation (2 or 4 spaces)",
            "Keep lines of code reasonably short (ideally under 80-100 characters)",
            "Separate code blocks with blank lines for clarity",
            "Avoid magic numbers — use named constants instead"
          ]
        },
        {
          title: "JS: Accessibility (for frontend JS)",
          items: [
            "Ensure interactive elements (buttons, links) are keyboard accessible",
            "Use ARIA roles when appropriate to enhance screen reader support",
            "Avoid setting `tabindex` > 0 unless necessary",
            "Use semantic HTML whenever possible"
          ]
        }
      ];
      
  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for JavaScript
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
