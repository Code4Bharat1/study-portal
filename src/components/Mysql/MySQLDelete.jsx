'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLDelete() { 
  useReadingTracker('mysqldelete')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">DELETE – Removing Data in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `DELETE` statement removes rows from a table, such as deleting old records or cancelled orders. Like `UPDATE`, it requires caution to avoid deleting unintended data. In this section, you’ll learn how to use `DELETE`, apply `WHERE` conditions, and understand the difference between `DELETE` and `TRUNCATE`. By the end, you’ll be able to remove data safely.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using the DELETE Statement</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `DELETE FROM` statement removes rows based on a condition specified in the `WHERE` clause.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`DELETE FROM table_name WHERE condition;`}
            </code>
          </pre>

          <p>
            **Example: Deleting Data**
            Assume we have a “tasks” table with columns `id`, `title`, and `status`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Delete specific rows
DELETE FROM tasks WHERE status = 'completed';

-- Delete a single row
DELETE FROM tasks WHERE id = 5;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query removes all completed tasks.
            - The second query removes the task with `id = 5`.
          </p>

          <p>
            **DELETE vs. TRUNCATE**
            - `DELETE`: Removes specific rows based on a condition. Can be rolled back in transactions.
            - `TRUNCATE`: Removes all rows and resets auto-increment counters. Faster but cannot be undone.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`TRUNCATE TABLE tasks;`}
            </code>
          </pre>

          <p>
            **Safe Deletes**
            Without a `WHERE` clause, `DELETE` removes all rows:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- DANGEROUS: Deletes all rows
DELETE FROM tasks;`}
            </code>
          </pre>

          <p>
            Use safe update mode to prevent accidental deletes:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SET SQL_SAFE_UPDATES = 1;`}
            </code>
          </pre>

          <p>
            **Best Practices**
            - Always use a `WHERE` clause unless you intend to delete all rows.
            - Back up data before running `DELETE`.
            - Test conditions with a `SELECT` query first to see which rows will be affected.
          </p>

          <p>
            **Practice Exercise**
            Create a “users” table with `id`, `name`, and `status`. Insert five users, then:
            1. Delete all users with status “inactive”.
            2. Delete a user by ID.
            3. Verify the remaining data with `SELECT`.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}