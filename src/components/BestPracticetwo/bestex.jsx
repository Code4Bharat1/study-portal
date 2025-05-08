'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {
    const sections = [
        {
          title: "Project Structure & Organization",
          items: [
            "Organize files using MVC pattern (Models, Views, Controllers)",
            "Use separate routers for different routes/modules",
            "Keep configuration (e.g. DB URI, port) in environment variables using .env and dotenv"
          ]
        },
        {
          title: "Security Best Practices",
          items: [
            "Use Helmet to set secure HTTP headers: `app.use(helmet());`",
            "Sanitize input to prevent injection attacks (express-validator, xss-clean, etc.)",
            "Enable rate limiting to prevent brute force attacks (express-rate-limit)",
            "Always validate user input using a library like Joi or express-validator"
          ]
        },
        {
          title: "Authentication & Authorization",
          items: [
            "Use JWT or OAuth2 for authentication",
            "Protect routes with middleware that checks user roles/permissions",
            "Never store passwords in plain text – always hash with bcrypt"
          ]
        },
        {
          title: "Middleware Usage",
          items: [
            "Use custom middleware for logging, auth checks, error handling",
            "Apply middleware only to the routes that need it",
            "Always call next() unless response is sent"
          ]
        },
        {
          title: "Error Handling",
          items: [
            "Use centralized error-handling middleware: `app.use((err, req, res, next) => { ... });`",
            "Return meaningful error messages and status codes",
            "Avoid exposing internal stack traces in production"
          ]
        },
        {
          title: "Routing & Performance",
          items: [
            "Keep routes slim; move logic to controllers/services",
            "Use async/await with try/catch for async route handlers",
            "Avoid blocking operations in routes"
          ]
        },
        {
          title: "Logging & Monitoring",
          items: [
            "Use morgan for HTTP request logging in dev",
            "Use winston or pino for app-wide logging",
            "Monitor with tools like PM2, New Relic, or Datadog"
          ]
        },
        {
          title: "Clean Code Practices",
          items: [
            "Use ESLint and Prettier to enforce code quality",
            "Avoid deeply nested callbacks; use async/await or Promises",
            "Use constants and config files for magic numbers/strings"
          ]
        },
        {
          title: "Deployment",
          items: [
            "Use a process manager like PM2 for production",
            "Enable compression (compression middleware) for response size reduction",
            "Serve static files with appropriate cache-control headers"
          ]
        },
        {
          title: "Advanced Project Structure",
          items: [
            "Use a layered architecture: split logic into routes → controllers → services → repositories",
            "Create a config/ folder for database, environment, and 3rd-party services",
            "Store shared logic/utilities in a utils/ or helpers/ folder"
          ]
        },
        {
          title: "Request Validation & Schema Enforcement",
          items: [
            "Use Joi, zod, or express-validator to define and validate input schemas",
            "Validate query params, body, and URL params before entering controller logic",
            "Return 400 (Bad Request) errors for invalid input early"
          ]
        },
        {
          title: "Environment & Configuration",
          items: [
            "Load different .env files per environment (e.g. .env.dev, .env.prod)",
            "Use config package or dotenv for config management",
            "Never hardcode secrets or API keys in the codebase"
          ]
        },
        {
          title: "Asynchronous Programming",
          items: [
            "Wrap all async route handlers with error-catching middleware",
            "Avoid using await inside loops – use Promise.all where possible for performance"
          ]
        },
        {
          title: "Error Monitoring & Debugging",
          items: [
            "Use services like Sentry, Rollbar, or LogRocket for real-time error monitoring",
            "Catch unhandled promise rejections and uncaught exceptions"
          ]
        },
        {
          title: "Testing & CI",
          items: [
            "Use Jest, Mocha, or Supertest for testing routes and middleware",
            "Write unit, integration, and end-to-end tests",
            "Integrate with GitHub Actions, GitLab CI, or CircleCI for automated testing on push"
          ]
        },
        {
          title: "Session & Cookie Security",
          items: [
            "Use express-session or JWT depending on stateless/stateful auth model",
            "Secure cookies with: `cookie: { httpOnly: true, secure: true, sameSite: 'strict' }`"
          ]
        },
        {
          title: "Third-Party Integration",
          items: [
            "Encapsulate 3rd-party SDKs (e.g. Stripe, Twilio) behind service wrappers",
            "Abstract these services to allow mocking/stubbing in tests"
          ]
        },
        {
          title: "API Design",
          items: [
            "Use RESTful routing (GET, POST, PUT, DELETE) correctly",
            "Use consistent response format (e.g. { success, data, message })",
            "Handle pagination, filtering, and sorting in query params",
            "Provide meaningful HTTP status codes"
          ]
        },
        {
          title: "CORS & Static Files",
          items: [
            "Use cors middleware with explicit origin whitelisting",
            "Serve static files from a public folder securely: `app.use(express.static(path.join(__dirname, 'public')));`"
          ]
        },
        {
          title: "Dev Tools",
          items: [
            "Use nodemon during development for auto-reloading",
            "Use debug module for controlled console logging in different environments"
          ]
        },
        {
          title: "Performance Optimization",
          items: [
            "Use cluster mode with PM2 to utilize multiple CPU cores",
            "Use Redis for caching expensive DB queries or sessions",
            "Minimize middleware and only apply where needed"
          ]
        },
        {
          title: "Graceful Shutdown",
          items: [
            "Handle SIGTERM/SIGINT to close DB connections and stop server cleanly"
          ]
        }
      ];
      
  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for Express
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
