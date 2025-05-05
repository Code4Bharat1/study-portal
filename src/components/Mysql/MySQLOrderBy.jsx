'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLOrderBy() { 
  useReadingTracker('mysqlorderby')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">ORDER BY in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `ORDER BY` clause sorts the results of a query, making it easier to read or analyze data. You can sort by one or more columns in ascending or descending order. In this section, you’ll learn how to use `ORDER BY` effectively. By the end, you’ll be able to sort data to meet any requirement.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using the ORDER BY Clause</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `ORDER BY` clause is used in a `SELECT` statement to sort rows based on one or more columns.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT column1, column2 FROM table_name ORDER BY column1 [ASC|DESC], column2 [ASC|DESC];`}
            </code>
          </pre>

          <p>
            - `ASC`: Ascending order (default, e.g., A-Z, 1-10).
            - `DESC`: Descending order (e.g., Z-A, 10-1).
          </p>

          <p>
            **Example Queries**
            Assume we have an “employees” table with `id`, `name`, `salary`, and `hire_date`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Sort by one column
SELECT * FROM employees ORDER BY salary DESC;

-- Sort by multiple columns
SELECT * FROM employees ORDER BY department ASC, salary DESC;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query sorts employees by salary, highest to lowest.
            - The second query sorts by department (A-Z), then by salary within each department (highest to lowest).
          </p>

          <p>
            **Best Practices**
            - Sort only by columns that are relevant to avoid unnecessary processing.
            - Use `ASC` or `DESC` explicitly for clarity.
            - Combine with `WHERE` to sort filtered results.
          </p>

          <p>
            **Practice Exercise**
            Create a “products” table with `id`, `name`, `price`, and `category`. Insert five products, then write queries to:
            1. Sort products by price in ascending order.
            2. Sort products by category (A-Z) and then by price (highest to lowest).
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}