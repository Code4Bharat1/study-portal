'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLSubqueries() { 
  useReadingTracker('mysqlsubqueries')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Subqueries in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        Subqueries are queries nested within another query, allowing you to perform complex operations, like finding customers who placed large orders. In this section, you’ll learn how to use subqueries in `SELECT`, `WHERE`, and `FROM` clauses, and understand correlated vs. non-correlated subqueries. By the end, you’ll be able to write advanced queries with subqueries.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Using Subqueries</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            A subquery is a query inside parentheses that returns a result used by the outer query.
          </p>

          <p>
            **Types of Subqueries**
            - **Non-correlated**: Runs independently and returns a result used by the outer query.
            - **Correlated**: Depends on the outer query, running for each row of the outer query.
          </p>

          <p>
            **Example: Non-correlated Subquery**
            Assume we have “customers” (`id`, `name`) and “orders” (`order_id`, `customer_id`, `total`):
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT name
FROM customers
WHERE id IN (
  SELECT customer_id
  FROM orders
  WHERE total > 1000
);`}
            </code>
          </pre>

          <p>
            This finds customers who placed orders over 1000.
          </p>

          <p>
            **Example: Correlated Subquery**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT name
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id AND o.total > 1000
);`}
            </code>
          </pre>

          <p>
            This checks for each customer if they have a high-value order.
          </p>

          <p>
            **Best Practices**
            - Use joins instead of subqueries when possible for better performance.
            - Keep subqueries simple to improve readability.
            - Test subqueries independently to ensure correct results.
          </p>

          <p>
            **Practice Exercise**
            Create “employees” (`id`, `name`, `salary`) and “departments” (`dept_id`, `manager_id`) tables. Write:
            1. A non-correlated subquery to find employees with above-average salaries.
            2. A correlated subquery to find employees who are department managers.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}