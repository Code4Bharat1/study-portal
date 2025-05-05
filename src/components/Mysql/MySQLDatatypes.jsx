'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLDatatypes() { 
  useReadingTracker('mysqldatatypes')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">MySQL Data Types</h1>
      <p className="text-lg text-gray-800 mb-6">
        Data types in MySQL define the kind of data a column can store, such as numbers, text, or dates. Choosing the right data type is crucial for efficient storage and accurate data handling. In this section, you’ll learn about MySQL’s main data types, how to use them, and best practices for selecting them. By the end, you’ll be able to design tables with appropriate data types for any scenario.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Understanding MySQL Data Types</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Every column in a MySQL table must have a data type, which determines what kind of data it can hold and how MySQL stores it. Data types are grouped into three main categories: **numeric**, **string (text)**, and **date/time**.
          </p>

          <p>
            **Numeric Data Types**
            - `INT`: Stores whole numbers (e.g., 42, -10). Commonly used for IDs or counts.
            - `DECIMAL(M,D)`: Stores exact decimal numbers (e.g., 19.99). `M` is total digits, `D` is decimal places.
            - `FLOAT`/`DOUBLE`: Stores approximate floating-point numbers for large or scientific values.
            - Example: `price DECIMAL(5,2)` can store values like 99.99.
          </p>

          <p>
            **String Data Types**
            - `VARCHAR(n)`: Stores variable-length text up to `n` characters (e.g., “Hello”).
            - `CHAR(n)`: Stores fixed-length text of exactly `n` characters.
            - `TEXT`: Stores large amounts of text (up to 65,535 characters).
            - Example: `name VARCHAR(50)` for names like “John Doe”.
          </p>

          <p>
            **Date and Time Data Types**
            - `DATE`: Stores dates (YYYY-MM-DD, e.g., 2025-05-05).
            - `DATETIME`: Stores date and time (YYYY-MM-DD HH:MM:SS).
            - `TIMESTAMP`: Stores date and time, automatically updated for record changes.
            - Example: `created_at DATETIME` for tracking when a record was created.
          </p>

          <p>
            **Example Table with Data Types**
            Let’s create a table for “employees” with various data types:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  salary DECIMAL(10,2),
  hire_date DATE,
  bio TEXT
);`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - `id INT AUTO_INCREMENT PRIMARY KEY`: A unique ID that auto-increments (1, 2, 3, ...).
            - `first_name VARCHAR(50)`: Stores names up to 50 characters.
            - `salary DECIMAL(10,2)`: Stores salaries like 50000.00.
            - `hire_date DATE`: Stores dates like 2023-01-15.
            - `bio TEXT`: Stores long descriptions.
          </p>

          <p>
            **Choosing the Right Data Type**
            - Use `INT` for counts or IDs, not `VARCHAR`.
            - Use `DECIMAL` for money to avoid floating-point errors.
            - Use `VARCHAR` for variable-length text (e.g., names, emails).
            - Use `DATE` or `DATETIME` for time-based data, not strings.
            - Avoid oversized types (e.g., `VARCHAR(255)` when 50 is enough) to save space.
          </p>

          <p>
            **Practice Exercise**
            Create a table called “products” with columns for `id` (auto-incrementing), `name` (text), `price` (decimal), and `release_date` (date). Insert two products and query the table to verify the data.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}