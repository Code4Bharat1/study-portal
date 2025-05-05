'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLSelect() { 
  useReadingTracker('mysqlselect')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">SELECT – Retrieving Data in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `SELECT` statement is the most common way to retrieve data from a MySQL database. It allows you to fetch specific columns, filter rows, and even remove duplicates. In this section, you’ll learn how to write `SELECT` queries, use aliases, and apply basic filtering. By the end, you’ll be able to query data like a pro.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using the SELECT Statement</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `SELECT` statement retrieves data from one or more tables. You can choose specific columns or all columns and filter the results as needed.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT column1, column2, ... FROM table_name;`}
            </code>
          </pre>

          <p>
            - Use `*` to select all columns: `SELECT * FROM table_name;`
            - Use `DISTINCT` to remove duplicate rows: `SELECT DISTINCT column_name FROM table_name;`
            - Use `AS` to rename columns in the output (aliasing).
          </p>

          <p>
            **Example Queries**
            Assume we have a “customers” table with columns `id`, `name`, `email`, and `city`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Select specific columns
SELECT name, email FROM customers;

-- Select all columns
SELECT * FROM customers;

-- Use aliasing
SELECT name AS customer_name, email AS contact_email FROM customers;

-- Remove duplicates
SELECT DISTINCT city FROM customers;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query retrieves only the `name` and `email` columns.
            - The second query retrieves all columns.
            - The third query renames `name` to `customer_name` and `email` to `contact_email` in the output.
            - The fourth query lists unique cities.
          </p>

          <p>
            **Filtering with WHERE**
            You’ll learn more about `WHERE` later, but here’s a sneak peek:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT * FROM customers WHERE city = 'New York';`}
            </code>
          </pre>

          <p>
            This retrieves only customers from New York.
          </p>

          <p>
            **Best Practices**
            - Select only the columns you need to improve performance.
            - Use aliases to make output more readable.
            - Use `DISTINCT` sparingly, as it can be resource-intensive.
          </p>

          <p>
            **Practice Exercise**
            Create a “products” table with `id`, `name`, `price`, and `category`. Insert five products, then write queries to:
            1. Select only `name` and `price`.
            2. List unique categories.
            3. Select all products with an alias for `name` as `product_name`.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}