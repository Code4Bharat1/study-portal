'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLJoins() { 
  useReadingTracker('mysqljoins')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Joins in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        Joins combine data from multiple tables based on related columns, enabling you to query complex relationships. For example, you can link customers to their orders. In this section, you’ll learn about different types of joins (`INNER`, `LEFT`, `RIGHT`, `FULL`) and how to use them. By the end, you’ll be able to write queries that combine data across tables.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Understanding Joins</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Joins link tables using keys, typically a primary key in one table and a foreign key in another.
          </p>

          <p>
            **Types of Joins**
            - `INNER JOIN`: Returns only matching rows from both tables.
            - `LEFT JOIN`: Returns all rows from the left table, with matching rows from the right (non-matches get NULL).
            - `RIGHT JOIN`: Returns all rows from the right table, with matching rows from the left.
            - `FULL JOIN`: Returns all rows from both tables, with NULLs for non-matches (not supported in MySQL, but can be simulated).
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT columns
FROM table1
[INNER|LEFT|RIGHT] JOIN table2
ON table1.column = table2.column;`}
            </code>
          </pre>

          <p>
            **Example Queries**
            Assume we have “customers” (`id`, `name`) and “orders” (`order_id`, `customer_id`, `total`):
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`-- INNER JOIN
SELECT customers.name, orders.order_id
FROM customers
INNER JOIN orders
ON customers.id = orders.customer_id;

-- LEFT JOIN
SELECT customers.name, orders.order_id
FROM customers
LEFT JOIN orders
ON customers.id = orders.customer_id;`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - The `INNER JOIN` returns only customers with orders.
            - The `LEFT JOIN` returns all customers, with `NULL` for those without orders.
          </p>

          <p>
            **Best Practices**
            - Use clear table and column names or aliases (e.g., `customers.id AS customer_id`).
            - Ensure indexes exist on join columns for performance.
            - Test joins with small datasets to verify results.
          </p>

          <p>
            **Practice Exercise**
            Create “products” (`id`, `name`) and “sales” (`sale_id`, `product_id`, `amount`) tables. Insert data, then write:
            1. An `INNER JOIN` to show products with sales.
            2. A `LEFT JOIN` to show all products, including those without sales.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}