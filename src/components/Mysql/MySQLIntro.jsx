'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLIntro() { 
  useReadingTracker('mysqlintro')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">MySQL Introduction</h1>
      <p className="text-lg text-gray-800 mb-6">
        MySQL is one of the most popular relational database management systems (RDBMS) in the world. It’s used to store and manage data in an organized way, making it easy to retrieve and manipulate information. In this section, you’ll learn what MySQL is, how it works, and why it’s a critical tool for developers and businesses. By the end, you’ll understand the basics of databases and be ready to start writing your first MySQL queries.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Understanding MySQL and Databases</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            A **database** is like a digital organizer that stores data in a structured format. MySQL is a tool that helps you create and manage these databases. It’s called a **relational** database because it organizes data into tables that can be linked together using common fields (like IDs). For example, in an online store, you might have a “Products” table and an “Orders” table linked by a product ID.
          </p>

          <p>
            **Key Concepts in MySQL**
            - **Tables**: These are like spreadsheets, with rows (records) and columns (fields). Each table stores related data, like customer details or product information.
            - **SQL**: Structured Query Language is the language used to interact with MySQL. You write SQL queries to perform tasks like retrieving or updating data.
            - **Database**: A container that holds multiple tables. For example, a “store” database might include tables for customers, orders, and products.
            - **Primary Key**: A unique identifier for each row in a table, like a customer ID.
            - **Foreign Key**: A field in one table that links to the primary key in another table, enabling relationships between tables.
          </p>

          <p>
            **How MySQL Works**
            MySQL operates as a server that runs in the background. You connect to it using a client (like the MySQL command-line tool, phpMyAdmin, or a programming language). You send SQL queries to the server, and it processes them to store or retrieve data. For example:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`CREATE DATABASE my_store;
USE my_store;
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);`}
            </code>
          </pre>

          <p>
            This code creates a database called “my_store” and a “customers” table with three columns: `id`, `name`, and `email`. Don’t worry about the syntax yet—we’ll cover it in detail later.
          </p>

          <p>
            **Why Choose MySQL?**
            - **Open Source**: Free to use and modify, with a large community for support.
            - **Performance**: Optimized for fast data retrieval and storage, even with large datasets.
            - **Compatibility**: Works with many programming languages and platforms.
            - **Security**: Offers features like user authentication and data encryption.
          </p>

          <p>
            **Real-World Applications**
            MySQL is used in:
            - **Web Development**: Storing user data for websites (e.g., WordPress blogs).
            - **E-Commerce**: Managing product catalogs and orders (e.g., Shopify).
            - **Data Analytics**: Storing and querying large datasets for insights.
            - **Enterprise Systems**: Handling employee records, financial data, and more.
          </p>

          <p>
            **Your First Step**
            To get started, you’ll need a MySQL environment. You can install MySQL locally or use an online tool like dbfiddle.uk or rextester.com. In the next section, “Get Started,” we’ll walk you through setting up MySQL and running your first query. For now, understand that MySQL is your tool for organizing and accessing data efficiently.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}