'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLInsert() { 
  useReadingTracker('mysqlinsert')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">INSERT – Adding Data in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `INSERT` statement adds new rows of data to a table. It’s how you populate your database with information, like adding new customers or products. In this section, you’ll learn how to use `INSERT` to add single and multiple rows, handle default values, and avoid common errors. By the end, you’ll be able to add data to your tables efficiently.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using the INSERT Statement</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `INSERT INTO` statement specifies the table and the values to add. You can insert data into all columns or specific ones.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);`}
            </code>
          </pre>

          <p>
            **Example: Inserting Data**
            Assume we have a “students” table with columns `id` (auto-incrementing), `name`, `age`, and `grade`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Insert a single row
INSERT INTO students (name, age, grade) VALUES ('Alice', 20, 'A');

-- Insert multiple rows
INSERT INTO students (name, age, grade) VALUES 
  ('Bob', 21, 'B'),
  ('Charlie', 19, 'A+');`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query adds one student, omitting `id` because it auto-increments.
            - The second query adds two students in one statement.
            - Column names must match the order of values.
          </p>

          <p>
            **Inserting into All Columns**
            If you provide values for all columns in order, you can omit the column names:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`INSERT INTO students VALUES (NULL, 'David', 22, 'B');`}
            </code>
          </pre>

          <p>
            Here, `NULL` is used for `id` because it’s auto-incremented.
          </p>

          <p>
            **Best Practices**
            - Always specify column names for clarity and to avoid errors if the table structure changes.
            - Use single quotes for string and date values (e.g., `'Alice'`, `'2025-05-05'`).
            - Ensure values match the column’s data type and constraints.
          </p>

          <p>
            **Practice Exercise**
            Create a “books” table with `id` (auto-incrementing), `title`, `author`, and `price`. Insert three books, including one with a single-row insert and two with a multi-row insert. Query the table to verify the data.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}