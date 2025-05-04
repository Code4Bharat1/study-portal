'use client';

const SQLWithNodePage = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Using SQL with Node.js</h1>
        <p className="text-lg">
          Node.js can interact with SQL databases such as MySQL and PostgreSQL using third-party modules like <code>mysql2</code> or <code>pg</code>. These modules allow executing SQL queries, managing connections, and handling results.
        </p>

        <h2 className="text-2xl font-semibold">Installing MySQL Module</h2>
        <p>Use npm to install the MySQL client for Node.js:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm install mysql2</code>
        </pre>

        <h2 className="text-2xl font-semibold">Connecting to MySQL Database</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Executing a Query</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`connection.query('SELECT * FROM users', (err, results) => {
  if (err) throw err;
  console.log(results);
});`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Inserting Data</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const user = { name: 'Alice', age: 25 };
connection.query('INSERT INTO users SET ?', user, (err, result) => {
  if (err) throw err;
  console.log('User added with ID:', result.insertId);
});`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">📦 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use <code>mysql2</code> or similar modules to work with SQL in Node.js.</li>
          <li>Establish a connection using connection details.</li>
          <li>Execute SQL queries using <code>query()</code>.</li>
          <li>Always handle errors properly.</li>
          <li>Close the connection when done using <code>connection.end()</code>.</li>
        </ul>
      </div>
    </div>
  );
};

export default SQLWithNodePage;
