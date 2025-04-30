'use client';

export default function PhpPdo() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Data Objects (PDO)</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Database Abstraction Layer</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            PDO provides a data-access abstraction layer, which means you can use the same functions to work with different databases.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Basic PDO Connection</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  try {
    $conn = new PDO("mysql:host=localhost;dbname=myDB", "username", "password");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id' => $user_id]);
    
    $result = $stmt->fetchAll();
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">PDO Advantages</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Database agnostic (works with MySQL, PostgreSQL, SQLite, etc.)</li>
            <li>Prepared statements by default</li>
            <li>Object-oriented interface</li>
            <li>Better error handling</li>
          </ul>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Security Practices
        </button>
      </div>
    </div>
  );
}