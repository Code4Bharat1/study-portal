'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLCreate() { 
  useReadingTracker('mysqlcreate')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Create Tables in MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        Creating tables is a fundamental step in building a MySQL database. Tables store your data in an organized way, with columns defining the type of data and rows holding the actual records. In this section, you’ll learn how to use the `CREATE TABLE` statement, define columns with appropriate data types, and apply constraints like primary keys. By the end, you’ll be able to design tables for real-world applications.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Creating Tables</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The `CREATE TABLE` statement defines a new table, specifying its name, columns, data types, and constraints. Constraints ensure data integrity, like requiring unique values or preventing null entries.
          </p>

          <p>
            **Basic Syntax**
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`CREATE TABLE table_name (
  column1 datatype [constraints],
  column2 datatype [constraints],
  ...
);`}
            </code>
          </pre>

          <p>
            **Common Constraints**
            - `PRIMARY KEY`: Ensures each row has a unique identifier.
            - `AUTO_INCREMENT`: Automatically generates sequential numbers for a column (usually the primary key).
            - `NOT NULL`: Prevents null values in a column.
            - `UNIQUE`: Ensures all values in a column are unique.
            - `DEFAULT`: Sets a default value if none is provided.
          </p>

          <p>
            **Example: Creating a Products Table**
            Let’s create a table to store product information:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);`}
            </code>
          </pre>

          <p>
            **What’s Happening Here?**
            - `id`: Auto-incrementing unique ID for each product.
            - `name`: Product name, cannot be null.
            - `price`: Price with two decimal places, cannot be null.
            - `stock`: Number of items in stock, defaults to 0.
          </p>

          <p>
            **Verifying the Table**
            After creating the table, check its structure:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`DESCRIBE products;`}
            </code>
          </pre>

          <p>
            This displays the table’s columns, data types, and constraints.
          </p>

          <p>
            **Best Practices**
            - Use descriptive column names (e.g., `product_name` instead of `pn`).
            - Always define a primary key for each table.
            - Use `NOT NULL` for required fields to enforce data integrity.
            - Choose appropriate data types to optimize storage.
          </p>

          <p>
            **Practice Exercise**
            Create a table called “orders” with columns for `order_id` (auto-incrementing primary key), `customer_name` (text, not null), `order_date` (date), and `total` (decimal). Verify the table structure using `DESCRIBE`.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}