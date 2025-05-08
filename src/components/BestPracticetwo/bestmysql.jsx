'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {

    const sections = [
        {
          title: "Schema & Table Design",
          items: [
            "Use the InnoDB storage engine for most use cases (supports transactions and foreign keys).",
            "Always define a PRIMARY KEY; prefer an AUTO_INCREMENT integer for simplicity.",
            "Choose appropriate data types (e.g., INT vs BIGINT, VARCHAR vs TEXT).",
            "Avoid using ENUM; prefer a lookup/reference table for flexibility and normalization.",
            "Use UNSIGNED for numeric values that can't be negative."
          ]
        },
        {
          title: "Indexing",
          items: [
            "Create indexes on columns used in WHERE, JOIN, ORDER BY, and GROUP BY.",
            "Use composite indexes for queries that filter on multiple columns in the same order.",
            "Keep index size small—avoid indexing large TEXT or BLOB fields.",
            "Monitor index usage with SHOW INDEXES and remove unused indexes."
          ]
        },
        {
          title: "Query Optimization",
          items: [
            "Use EXPLAIN or EXPLAIN ANALYZE to examine query performance.",
            "Avoid SELECT *—query only needed columns.",
            "Use proper JOINs and ensure join keys are indexed.",
            "Use LIMIT and OFFSET for pagination, but beware of large offsets; consider cursor-based pagination instead.",
            "Avoid OR conditions on indexed columns; use UNION or separate queries if possible."
          ]
        },
        {
          title: "Transactions & Concurrency",
          items: [
            "Use transactions (START TRANSACTION, COMMIT, ROLLBACK) for operations that need to be atomic.",
            "Use row-level locking (InnoDB) to reduce contention.",
            "Avoid long-running transactions to minimize lock time.",
            "Understand and set the appropriate isolation level (READ COMMITTED, REPEATABLE READ, etc.)."
          ]
        },
        {
          title: "Security",
          items: [
            "Never use root for application connections—create users with limited privileges.",
            "Use strong passwords and TLS/SSL for encrypted connections.",
            "Escape or parameterize user inputs to prevent SQL injection (use prepared statements).",
            "Regularly update MySQL to patch vulnerabilities."
          ]
        },
        {
          title: "Configuration & Performance Tuning",
          items: [
            "Configure innodb_buffer_pool_size to ~70-80% of system RAM for InnoDB-heavy workloads.",
            "Tune query_cache_size (only for MySQL 5.x; removed in MySQL 8).",
            "Enable and monitor the slow query log (slow_query_log = 1) to identify inefficient queries.",
            "Set max_connections and innodb_log_file_size based on workload."
          ]
        },
        {
          title: "Data Integrity & Constraints",
          items: [
            "Use NOT NULL, UNIQUE, CHECK, and FOREIGN KEY constraints to enforce integrity.",
            "Define appropriate DEFAULT values to reduce the need for NULLs.",
            "Use ON DELETE CASCADE or ON UPDATE CASCADE carefully with foreign keys."
          ]
        },
        {
          title: "Backup & Recovery",
          items: [
            "Use tools like mysqldump, mysqlpump, or physical backups (e.g., Percona XtraBackup).",
            "Automate regular backups and test restores regularly.",
            "For large databases, use incremental or binary log-based backups."
          ]
        },
        {
          title: "Logging & Monitoring",
          items: [
            "Enable and review logs: error_log, general_log, and slow_query_log.",
            "Use performance schema and information schema to monitor usage and resource stats.",
            "Consider tools like Percona Monitoring and Management (PMM), MySQL Enterprise Monitor, or Zabbix."
          ]
        },
        {
          title: "Development Practices",
          items: [
            "Use migration tools like Flyway or Liquibase to version schema changes.",
            "Use INFORMATION_SCHEMA for introspection and dynamic queries.",
            "Isolate schema logic in stored procedures and views if needed—but keep them performant and maintainable."
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
