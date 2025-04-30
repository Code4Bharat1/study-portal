'use client';

export default function PhpValidation() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Form Validation</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Secure Input Handling</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Proper form validation is crucial for security and data integrity.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Basic Validation Example</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  $name = $email = $password = "";
  $errors = [];
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate name
    if (empty($_POST["name"])) {
      $errors["name"] = "Name is required";
    } else {
      $name = test_input($_POST["name"]);
    }
    
    // Validate email
    if (empty($_POST["email"])) {
      $errors["email"] = "Email is required";
    } else {
      $email = test_input($_POST["email"]);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Invalid email format";
      }
    }
  }
  
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Validation Best Practices</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Always validate on server-side (client-side can be bypassed)</li>
            <li>Use whitelist approach for allowed values</li>
            <li>Sanitize all user inputs</li>
            <li>Use prepared statements for database queries</li>
          </ul>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Authentication
        </button>
      </div>
    </div>
  );
}