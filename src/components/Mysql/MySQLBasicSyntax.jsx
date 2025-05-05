'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLBasicSyntax() { 
  useReadingTracker('mysqlbasicsyntax')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">MySQL Syntax Overview</h1>
      <p className="text-lg text-gray-800 mb-6">
        Understanding MySQL syntax is the foundation of working with databases. In this section, you’ll learn the basic structure of SQL queries, common commands, and best practices for writing clear and effective queries. By the end, you’ll be able to write simple MySQL queries with confidence.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Core MySQL Syntax</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            SQL (Structured Query Language) is the language used to communicate with MySQL. SQL queries are instructions that tell MySQL what to do, like creating a table or fetching data. Queries are case-insensitive (e.g., `SELECT` is the same as `select`), but it’s common to write keywords in uppercase for readability.
          </p>

          <p>
            **Basic Query Structure**
            A typical SQL query has a verb (the action) and a target (the data to act on). For example:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT column_name FROM table_name;`}
            </code>
          </pre>

          <p>
            - `SELECT`: The action (retrieve data).
            - `column_name`: The specific column(s) to retrieve.
            - `FROM table_name`: The table to query.
            - Semicolon (`;`): Ends the query (required in MySQL).
          </p>

          <p>
            **Common SQL Commands**
            SQL is divided into several categories:
            - **DDL (Data Definition Language)**: Defines database structure (e.g., `CREATE`, `ALTER`, `DROP`).
            - **DML (Data Manipulation Language)**: Manages data within tables (e.g., `INSERT`, `UPDATE`, `DELETE`).
            - **DQL (Data Query Language)**: Retrieves data (e.g., `SELECT`).
            - **DCL (Data Control Language)**: Manages access (e.g., `GRANT`, `REVOKE`).
          </p>

          <p>
            **Example Queries**
            Let’s look at some common queries using a “students” table:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Create a table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);

-- Insert data
INSERT INTO students (name, age) VALUES ('Alice', 20);

-- Retrieve data
SELECT * FROM students;

-- Update data
UPDATE students SET age = 21 WHERE name = 'Alice';

-- Delete data
DELETE FROM students WHERE name = 'Alice';`}
            </code>
          </pre>

          <p>
            **Query Breakdown**
            - `CREATE TABLE`: Defines a new table with columns `id`, `name`, and `age`.
            - `INSERT INTO`: Adds a new row.
            - `SELECT *`: Retrieves all columns (`*` means “all”).
            - `UPDATE`: Changes existing data based on a condition (`WHERE`).
            - `DELETE`: Removes rows based on a condition.
          </p>

          <p>
            **Best Practices**
            - Use clear, descriptive names for tables and columns (e.g., `customer_name` instead of `cn`).
            - Always end queries with a semicolon.
            - Use comments (`--` or `/* */`) to explain complex queries.
            - Test queries on a small dataset before running on large tables.
          </p>

          <p>
            **Practice Exercise**
            Create a table called “books” with columns for `id`, `title`, and `price`. Insert two books, then write a query to retrieve all books. Try it in your MySQL environment!
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}