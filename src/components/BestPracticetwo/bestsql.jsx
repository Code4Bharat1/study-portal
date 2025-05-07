'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {
    const sections = [
        {
          title: "Schema Design",
          items: [
            "Normalize your database to eliminate redundancy (up to 3NF is usually sufficient).",
            "Use appropriate data types (e.g., INT vs VARCHAR).",
            "Define primary keys on every table.",
            "Use foreign keys to enforce referential integrity.",
            "Avoid excessive use of NULLs; prefer default values where applicable."
          ]
        },
        {
          title: "Indexing",
          items: [
            "Create indexes on columns used in WHERE, JOIN, ORDER BY, and GROUP BY.",
            "Use composite indexes when filtering by multiple columns together.",
            "Avoid indexing columns with low cardinality (e.g., boolean).",
            "Monitor and remove unused or duplicate indexes."
          ]
        },
        {
          title: "Query Writing",
          items: [
            "Use explicit JOINs (INNER JOIN, LEFT JOIN, etc.) instead of implicit joins.",
            "Avoid SELECT *; specify only the required columns.",
            "Use aliases (AS) to improve readability.",
            "Use parameterized queries to prevent SQL injection.",
            "Be mindful of subqueries—use JOINs or CTEs (WITH) if more efficient."
          ]
        },
        {
          title: "Performance Optimization",
          items: [
            "Use EXPLAIN or EXPLAIN ANALYZE to understand query plans.",
            "Avoid functions on indexed columns in WHERE clauses (e.g., WHERE LOWER(name) = 'john').",
            "Use LIMIT with pagination and avoid loading large data sets unnecessarily.",
            "Avoid correlated subqueries in large datasets; they can be very slow.",
            "Batch large inserts/updates instead of one massive query."
          ]
        },
        {
          title: "Security",
          items: [
            "Always use parameterized queries or prepared statements.",
            "Grant users the minimum necessary privileges.",
            "Avoid storing sensitive data (like passwords) in plain text; use hashing and encryption.",
            "Log and monitor query activity, especially DML/DDL commands in production."
          ]
        },
        {
          title: "Data Integrity",
          items: [
            "Use NOT NULL, UNIQUE, CHECK, and DEFAULT constraints as appropriate.",
            "Use triggers sparingly; ensure they are efficient and well-documented.",
            "Define proper cascading rules on foreign keys (ON DELETE CASCADE, etc.)."
          ]
        },
        {
          title: "Transactions & Concurrency",
          items: [
            "Use transactions (BEGIN, COMMIT, ROLLBACK) for multi-step operations.",
            "Handle errors with proper rollback logic.",
            "Avoid long transactions to reduce locking and contention.",
            "Understand isolation levels (READ COMMITTED, SERIALIZABLE, etc.) and use them appropriately."
          ]
        },
        {
          title: "Maintenance & Documentation",
          items: [
            "Use consistent naming conventions for tables, columns, and constraints.",
            "Comment complex queries or business logic embedded in SQL.",
            "Regularly analyze and vacuum/update statistics for the query planner (PostgreSQL, etc.).",
            "Backup your database regularly and test restores."
          ]
        },
        {
          title: "Stored Procedures & Views",
          items: [
            "Use stored procedures for reusable, complex logic with multiple SQL statements.",
            "Keep views simple and use them for abstraction, not performance gains.",
            "Avoid nesting too many views as it can degrade performance."
          ]
        },
        {
          title: "Testing & Version Control",
          items: [
            "Use migrations (e.g., with tools like Flyway, Liquibase) to version your schema changes.",
            "Write tests for stored procedures, views, and triggers.",
            "Use a development/staging environment to test changes before applying to production."
          ]
        }
      ];
      
  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for SQL
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
