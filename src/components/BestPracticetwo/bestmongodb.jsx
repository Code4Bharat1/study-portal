'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {
    const sections = [
        {
          title: "Schema Design",
          items: [
            "Design your schema based on how the data will be queried, not just how it's structured.",
            "Use embedded documents for data that is accessed together (denormalization).",
            "Use references for large or separate data that is updated independently (normalization).",
            "Avoid deeply nested documents; keep nesting shallow for easier querying and updates.",
            "Use schema validation (e.g., via Mongoose or MongoDB's native JSON schema validation)."
          ]
        },
        {
          title: "Indexing",
          items: [
            "Create indexes on fields used frequently in queries, sorting, or filtering.",
            "Use compound indexes when multiple fields are queried together.",
            "Avoid over-indexing; unnecessary indexes slow down writes and use more memory.",
            "Monitor index usage with db.collection.getIndexes() and explain()."
          ]
        },
        {
          title: "Performance",
          items: [
            "Use projection to retrieve only necessary fields (find({}, { field1: 1, field2: 1 })).",
            "Use pagination techniques like limit/skip or cursor-based pagination (for large datasets).",
            "Avoid using $where or JavaScript in queries—they are slow and a security risk.",
            "Use aggregation pipelines efficiently; break them into stages and use $match early."
          ]
        },
        {
          title: "Data Integrity & Validation",
          items: [
            "Use Mongoose or similar ODMs for schema enforcement and validation in application code.",
            "Use MongoDB's built-in schema validation ($jsonSchema) for server-side data protection.",
            "Avoid storing inconsistent or polymorphic data unless necessary."
          ]
        },
        {
          title: "Security",
          items: [
            "Enable authentication and authorization with Role-Based Access Control (RBAC).",
            "Limit access using the principle of least privilege (only required permissions).",
            "Use encrypted connections (TLS/SSL) for all communication.",
            "Do not expose the database to the internet directly.",
            "Regularly update MongoDB to patch security vulnerabilities."
          ]
        },
        {
          title: "Deployment & Operations",
          items: [
            "Use replica sets for high availability and automatic failover.",
            "Use sharding for horizontal scalability with large datasets.",
            "Backup data regularly using mongodump, mongorestore, or cloud-based backups.",
            "Monitor with MongoDB Atlas or tools like mongotop, mongostat, or Prometheus."
          ]
        },
        {
          title: "Transactions",
          items: [
            "Use transactions for multi-document operations in ACID-compliant needs.",
            "Keep transactions short to avoid blocking resources.",
            "Prefer single-document operations where possible, as they are atomic by default."
          ]
        },
        {
          title: "Logging & Auditing",
          items: [
            "Enable MongoDB's audit log for sensitive environments.",
            "Monitor slow queries using the slowOpThresholdMs setting.",
            "Analyze performance with the system.profile collection or Atlas performance advisor."
          ]
        },
        {
          title: "Coding Best Practices",
          items: [
            "Always handle connection errors and retry logic in application code.",
            "Reuse MongoDB client connections instead of creating new ones per request.",
            "Use async/await or Promises for all DB operations to avoid callback hell.",
            "Close connections gracefully during app shutdown."
          ]
        }
      ];
      

  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for MongoDB
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
