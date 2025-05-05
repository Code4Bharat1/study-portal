'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLGroupBy() { 
  useReadingTracker('mysqlgroupby')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">GROUP BY & Aggregates in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        The `GROUP BY` clause groups rows with the same values in specified columns, often used with aggregate functions like `COUNT`, `SUM`, or `AVG`. It’s perfect for summarizing data, like finding total sales per product. In this section, you’ll learn how to use `GROUP BY` and aggregates, plus filter groups with `HAVING`. By the end, you’ll be able to summarize data effectively.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using GROUP BY and Aggregates</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `GROUP BY` clause groups rows, and aggregate functions compute a single value for each group.
          </p>

          <p>
            **Common Aggregate Functions**
            - `COUNT()`: Counts rows in a group.
            - `SUM()`: Sums values in a group.
            - `AVG()`: Calculates the average.
            - `MIN()`/`MAX()`: Finds the minimum/maximum value.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT column, AGGREGATE_FUNCTION(column)
FROM table_name
GROUP BY column;`}
            </code>
          </pre>

          <p>
            **Example Queries**
            Assume we have an “orders” table with `order_id`, `customer_id`, `total`, and `order_date`:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- Count orders per customer
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;

-- Total sales per month
SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total) AS total_sales
FROM orders
GROUP BY month;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The first query counts how many orders each customer has.
            - The second query sums the total sales for each month.
          </p>

          <p>
            **Filtering Groups with HAVING**
            The `HAVING` clause filters groups (like `WHERE` for rows):
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING order_count > 5;`}
            </code>
          </pre>

          <p>
            This shows only customers with more than 5 orders.
          </p>

          <p>
            **Best Practices**
            - Use `GROUP BY` only with aggregate functions or columns listed in the `GROUP BY` clause.
            - Use `HAVING` for group-level filtering, not `WHERE`.
            - Ensure indexes on grouped columns for performance.
          </p>

          <p>
            **Practice Exercise**
            Create an “sales” table with `sale_id`, `product_id`, `amount`, and `sale_date`. Insert data, then write queries to:
            1. Count sales per product.
            2. Find total sales per month with more than 10 sales.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}