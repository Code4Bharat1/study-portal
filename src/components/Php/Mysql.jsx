'use client';

import useReadingTracker from "@/components/useReadingTracker";

export default function PhpMysql() {
  useReadingTracker('php-mysql');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">MySQL Integration</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">PHP with MySQL</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            PHP works seamlessly with MySQL databases. The most common approach is using MySQLi or PDO extensions.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">MySQLi Example</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  $conn = new mysqli("localhost", "username", "password", "dbname");
  
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  $sql = "SELECT id, name FROM users";
  $result = $conn->query($sql);
  
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
  }
  
  $conn->close();
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Database Operations</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Create, read, update, and delete records (CRUD)</li>
            <li>Parameterized queries to prevent SQL injection</li>
            <li>Transaction management</li>
            <li>Stored procedures</li>
          </ul>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn PDO
        </button>
      </div>
    </div>
  );
}