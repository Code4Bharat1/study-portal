'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLHome() { 
  useReadingTracker('mysqlhome')
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">MySQL Home</h1>
      <p className="text-lg text-gray-800 mb-6">
        Welcome to the MySQL tutorial! MySQL is a powerful, open-source relational database management system (RDBMS) used to store, manage, and retrieve data efficiently. Whether you're building a website, an app, or analyzing data, MySQL is a go-to tool for handling structured data. In this tutorial, you'll learn MySQL from the ground up, starting with the basics of databases and progressing to advanced techniques like joins, subqueries, and server administration. No prior knowledge is required—just curiosity and a desire to learn! By the end, you'll be confident in creating databases, writing complex queries, and managing MySQL servers like a pro. Let’s dive into the world of MySQL!
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is MySQL?</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            MySQL is a relational database system that organizes data into tables, where each table contains rows and columns, much like a spreadsheet. It uses Structured Query Language (SQL) to interact with the data, allowing you to create, read, update, and delete information efficiently. MySQL is widely used in web development (e.g., with platforms like WordPress), data analytics, and enterprise applications due to its speed, reliability, and ease of use.
          </p>

          <p>
            **Why Learn MySQL?**
            - **Ubiquity**: MySQL powers many of the world’s largest websites and applications, including Facebook, Twitter, and YouTube.
            - **Versatility**: It works across platforms (Windows, Linux, macOS) and integrates with languages like PHP, Python, and Java.
            - **Career Opportunities**: Database skills are in high demand for roles like database administrator, backend developer, and data analyst.
            - **Scalability**: MySQL can handle small projects to large-scale enterprise systems.
          </p>

          <p>
            **What You'll Learn in This Tutorial**
            This tutorial is structured to take you from beginner to advanced MySQL user. Here’s a sneak peek:
            - ** Basics**: Understand databases, tables, and how to write simple queries.
            - **Core Operations**: Learn to create, insert, update, and delete data.
            - **Advanced Queries**: Master joins, aggregates, and subqueries for complex data retrieval.
            - **Administration**: Manage databases, users, and server settings.
            - **Practical Projects**: Apply your skills to real-world scenarios like building a blog database or an e-commerce system.
          </p>

          <p>
            **Getting Started with MySQL**
            To follow along, you’ll need MySQL installed on your computer or access to an online MySQL environment. You can download MySQL from the official website (mysql.com) or use tools like XAMPP, WAMP, or cloud-based platforms like MySQL Sandbox. Don’t worry if this sounds overwhelming—we’ll guide you through the setup in the “Get Started” section.
          </p>

          <p>
            Let’s start by exploring what a database is. A database is a structured collection of data, like a digital filing cabinet. MySQL organizes this data into tables, where each table stores related information. For example, a “Customers” table might store names, emails, and phone numbers. SQL is the language you use to “talk” to MySQL, asking it to fetch, add, or modify data.
          </p>

          <p>
            Here’s a simple example of a MySQL query to retrieve all data from a table called “users”:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`SELECT * FROM users;`}
            </code>
          </pre>

          <p>
            This query says, “Show me all columns and rows from the users table.” Don’t worry about the syntax yet—we’ll break it down in the upcoming sections.
          </p>

          <p>
            **Your Journey to MySQL Mastery**
            As you progress through this tutorial, you’ll build a strong foundation in MySQL. Each section includes examples, explanations, and hands-on exercises to reinforce your learning. By the end, you’ll be able to design databases, write efficient queries, and even manage MySQL servers. Ready to become a MySQL pro? Let’s move to the next section and explore what MySQL is all about!
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}