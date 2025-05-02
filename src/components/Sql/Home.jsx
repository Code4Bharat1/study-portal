'use client';

const SQLHome = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Welcome to SQL Home</h1>
        <p className="text-lg">What is SQL and why should you learn it?</p>
        <p>
          SQL (Structured Query Language) is a standard programming language used for managing and manipulating relational databases.
          It allows you to insert, query, update, and delete data efficiently. SQL is widely used in data science, backend development, and data analysis.
        </p>

        <h2 className="text-2xl font-semibold">SQL Ecosystem</h2>
        <p>
          The SQL ecosystem includes various relational database management systems (RDBMS) such as MySQL, PostgreSQL, SQLite, Microsoft SQL Server, and Oracle.
          Tools like phpMyAdmin, DBeaver, and pgAdmin provide GUI interfaces to interact with these databases.
          SQL also integrates with programming languages like Python, Java, and PHP for building full-stack applications.
        </p>

        <h2 className="text-2xl font-semibold">Key Features of SQL</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Data Querying</strong>: Retrieve data from one or more tables using SELECT statements.</li>
          <li><strong>Data Manipulation</strong>: Use INSERT, UPDATE, DELETE to modify records.</li>
          <li><strong>Data Definition</strong>: Define structure using CREATE, ALTER, DROP for tables and schemas.</li>
          <li><strong>Data Control</strong>: Manage access with GRANT and REVOKE commands.</li>
          <li><strong>Transaction Control</strong>: Ensure data integrity with COMMIT and ROLLBACK.</li>
          <li><strong>Joins</strong>: Combine data from multiple tables using INNER JOIN, LEFT JOIN, etc.</li>
          <li><strong>Indexes</strong>: Speed up query performance using indexes.</li>
          <li><strong>Constraints</strong>: Enforce rules with PRIMARY KEY, FOREIGN KEY, UNIQUE, etc.</li>
          <li><strong>Aggregate Functions</strong>: Use COUNT, SUM, AVG for calculations on data sets.</li>
          <li><strong>Grouping</strong>: Organize data using GROUP BY and HAVING.</li>
        </ul>

        <h2 className="text-2xl font-semibold">What You Can Build With SQL</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Data-Driven Web Apps</strong>: Backend databases for dynamic websites.</li>
          <li><strong>Admin Dashboards</strong>: Manage data via internal tools.</li>
          <li><strong>Reporting Systems</strong>: Generate business and analytical reports.</li>
          <li><strong>Inventory Management</strong>: Track products and stock levels.</li>
          <li><strong>User Management Systems</strong>: Store and control user access.</li>
          <li><strong>Financial Systems</strong>: Handle transactions and accounting records.</li>
          <li><strong>Data Analytics</strong>: Analyze patterns and insights with complex queries.</li>
        </ul>

        <h2 className="text-2xl font-semibold">First Example: Hello SQL Query</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`-- Create a table
CREATE TABLE Students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);

-- Insert a record
INSERT INTO Students (id, name, age)
VALUES (1, 'Alice', 22);

-- Query the table
SELECT * FROM Students;`}
          </code>
        </pre>
        <p className="italic text-green-500">
          Run this in your database console or GUI like MySQL Workbench, pgAdmin, or SQLite.
        </p>
      </div>
    </div>
  );
};

export default SQLHome;
