'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {

    const sections = [
        {
          title: "Project Structure",
          items: [
            "Use a modular folder structure (e.g., /components, /pages, /lib, /hooks, /utils, /api, /styles).",
            "Keep components small and reusable; split logic from UI where possible.",
            "Place shared logic in /lib or /services instead of cluttering pages/components."
          ]
        },
        {
          title: "Routing & Pages",
          items: [
            "Use file-based routing under the /pages or App Router (/app directory in Next.js 13+).",
            "Prefer dynamic routes over query strings for SEO and cleaner URLs.",
            "Use shallow routing (router.push with shallow: true) for efficient state updates without full reloads."
          ]
        },
        {
          title: "Data Fetching",
          items: [
            "Use the appropriate data-fetching method:",
            "getStaticProps (SSG) for static content.",
            "getServerSideProps (SSR) for dynamic content on each request.",
            "getInitialProps only if needed (not recommended in newer versions).",
            "fetch in React Server Components (Next.js 13+).",
            "Cache external API or DB calls when using static generation to reduce build times."
          ]
        },
        {
          title: "API Routes",
          items: [
            "Place API logic under /pages/api/ or handle it with middleware in /app/api (Next.js 13+).",
            "Keep each handler focused and modular.",
            "Use rate-limiting, input validation, and proper status codes."
          ]
        },
        {
          title: "Performance Optimization",
          items: [
            "Use Image Optimization via the built-in next/image component.",
            "Enable Automatic Static Optimization by keeping pages pure (no getServerSideProps if not needed).",
            "Use code splitting by dynamic importing components (next/dynamic).",
            "Use lazy loading for off-screen components/images.",
            "Minify and compress images and static assets."
          ]
        },
        {
          title: "SEO & Accessibility",
          items: [
            "Use the next/head component for setting meta tags per page.",
            "Add structured data (JSON-LD) for better SEO visibility.",
            "Ensure all interactive elements are accessible (keyboard-friendly, ARIA attributes).",
            "Use semantic HTML tags (<main>, <nav>, <article>)."
          ]
        },
        {
          title: "Security",
          items: [
            "Validate and sanitize all API inputs.",
            "Set Content Security Policy (CSP) and security headers using next.config.js or middleware.",
            "Avoid exposing secrets to the client; use environment variables with NEXT_PUBLIC_ only when needed.",
            "Disable directory listing on the server."
          ]
        },
        {
          title: "Environment Configuration",
          items: [
            "Use .env.local, .env.development, .env.production files.",
            "Never commit .env.* to version control.",
            "Only expose NEXT_PUBLIC_ variables to the browser."
          ]
        },
        {
          title: "Deployment",
          items: [
            "Use Vercel for optimal deployment (first-class support), or host on platforms like Netlify, Render, or custom Node servers.",
            "Enable ISR (Incremental Static Regeneration) for updating static pages without full rebuilds.",
            "Use next build + next start for production-ready local testing."
          ]
        },
        {
          title: "Tooling & Developer Experience",
          items: [
            "Use TypeScript for type safety and better IDE support.",
            "Add ESLint, Prettier, and Husky for linting and formatting.",
            "Use Jest, Testing Library, or Playwright for testing components and pages.",
            "Monitor performance with tools like Web Vitals, Lighthouse, or Vercel Analytics."
          ]
        },
        {
          title: "Styling",
          items: [
            "Use CSS Modules, Tailwind CSS, or styled-components (avoid plain global CSS).",
            "Organize styles per component or page.",
            "Avoid unnecessary !important usage and minimize global overrides."
          ]
        }
      ];
      
      
      
  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for Next.js
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
