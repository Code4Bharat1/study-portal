'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLGetStarted() {
  useReadingTracker('mysqlgetstarted');

  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Get Started with MySQL</h1>
      <p className="text-lg text-gray-800 mb-6">
        Ready to jump into MySQL? In this section, you’ll learn how to set up MySQL on your computer, connect to a MySQL server, and run your first SQL query. This guide is designed for absolute beginners, so we’ll take it step by step. By the end, you’ll have MySQL up and running and be ready to create your first database.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Setting Up MySQL</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            To start using MySQL, you need two things: the MySQL server (to store and manage data) and a client (to send queries to the server). Here’s how to set it up:
          </p>

          <p>
            <strong>Step 1: Install MySQL</strong>
            <br />
            - <strong>Windows/Mac/Linux</strong>: Download the MySQL Community Server from mysql.com. Follow the installer’s instructions to set it up. Choose the “Developer Default” setup for beginners.
            <br />
            - <strong>Alternative</strong>: Use a tool like XAMPP (includes MySQL, PHP, and Apache) or Docker for a pre-configured environment.
            <br />
            - <strong>Online Option</strong>: If you don’t want to install anything, use an online MySQL sandbox like dbfiddle.uk or sqlfiddle.com.
          </p>

          <p>
            <strong>Step 2: Verify Installation</strong>
            <br />
            Once installed, open a terminal (Command Prompt on Windows) and type:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">mysql --version</code>
          </pre>

          <p>
            If MySQL is installed, you’ll see the version number (e.g., “mysql Ver 8.0.30”). If not, double-check the installation steps.
          </p>

          <p>
            <strong>Step 3: Connect to MySQL</strong>
            <br />
            Use the MySQL command-line client to connect to the server. In your terminal, type:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">mysql -u root -p</code>
          </pre>

          <p>
            - <code>-u root</code>: Specifies the username (default is “root”).
            <br />
            - <code>-p</code>: Prompts for the password you set during installation.
            <br />
            After entering the password, you’ll see the MySQL prompt: <code className="text-cyan-400">mysql&gt;</code>.
          </p>

          <p>
            <strong>Step 4: Run Your First Query</strong>
            <br />
            Let’s create a database and a table. At the MySQL prompt, type:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-cyan-400">
{`CREATE DATABASE my_first_db;
USE my_first_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
SELECT * FROM users;`}
            </code>
          </pre>

          <p>
            <strong>What’s Happening Here?</strong>
            <br />
            - <code>CREATE DATABASE my_first_db;</code>: Creates a new database.
            <br />
            - <code>USE my_first_db;</code>: Selects the database to work with.
            <br />
            - <code>CREATE TABLE users ...</code>: Creates a table with three columns: <code>id</code> (auto-incrementing unique ID), <code>name</code> (text up to 50 characters), and <code>email</code> (text up to 100 characters).
            <br />
            - <code>INSERT INTO users ...</code>: Adds a row of data.
            <br />
            - <code>SELECT * FROM users;</code>: Retrieves all data from the table, displaying “John Doe” and his email.
          </p>

          <p>
            <strong>Step 5: Explore Further</strong>
            <br />
            Congratulations! You’ve just created and queried your first MySQL database. To exit the MySQL prompt, type <code>EXIT;</code>. In the next sections, you’ll learn about SQL syntax, data types, and how to manipulate data. For now, practice running the above queries and try adding more rows to the <code>users</code> table.
          </p>

          <p>
            <strong>Tips for Beginners</strong>
            <br />
            - Use a GUI tool like MySQL Workbench or phpMyAdmin for a visual interface.
            <br />
            - Save your queries in a <code>.sql</code> file to reuse them later.
            <br />
            - Don’t worry about mistakes—MySQL is forgiving, and you can drop databases or tables to start over.
          </p>
        </div>

        <button className="mt-8 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-700">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}
