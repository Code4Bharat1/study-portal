'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLLimitOffset() { 
  useReadingTracker('mysqllimitoffset')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">LIMIT & OFFSET in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `LIMIT` and `OFFSET` clauses control the number of rows returned by a query and where to start, respectively. They’re essential for pagination and working with large datasets. In this section, you’ll learn how to use `LIMIT` and `OFFSET` to manage query results. By the end, you’ll be able to implement pagination in your applications.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using LIMIT and OFFSET</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `LIMIT` clause restricts the number of rows returned, while `OFFSET` skips a specified number of rows before starting.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT column1, column2 FROM table_name LIMIT number [OFFSET number];`}
            </code>
          </pre>

          <p>
            **Example Queries**
            Assume we have a “posts” table with `id`, `title`, and `created_at`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Get the first 5 posts
SELECT * FROM posts LIMIT 5;

-- Get 5 posts, skipping the first 10
SELECT * FROM posts LIMIT 5 OFFSET 10;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query returns the first 5 posts.
            - The second query skips the first 10 posts and returns the next 5 (rows 11-15).
          </p>

          <p>
            **Use Case: Pagination**
            For a blog showing 10 posts per page:
            - Page 1: `LIMIT 10 OFFSET 0`
            - Page 2: `LIMIT 10 OFFSET 10`
            - Page 3: `LIMIT 10 OFFSET 20`
          </p>

          <p>
            **Best Practices**
            - Combine with `ORDER BY` to ensure consistent results (e.g., `ORDER BY created_at DESC`).
            - Use small `LIMIT` values for better performance.
            - Be cautious with large `OFFSET` values, as they can slow down queries.
          </p>

          <p>
            **Practice Exercise**
            Create a “products” table with `id`, `name`, and `price`. Insert 20 products, then write queries to:
            1. Retrieve the first 3 products.
            2. Retrieve products 6-10 (use `LIMIT` and `OFFSET`).
            3. Simulate page 2 of a product list showing 5 products per page.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}