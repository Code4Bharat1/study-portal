'use client';

export default function PhpErrorHandling() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Error Handling</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Managing Errors and Exceptions</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Proper error handling makes your application more robust and secure.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Basic Error Handling</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // Simple error handling
  if (!file_exists("file.txt")) {
    die("File not found");
  } else {
    $file = fopen("file.txt", "r");
  }
  
  // Custom error handler
  function customError($errno, $errstr) {
    echo "<b>Error:</b> [$errno] $errstr";
  }
  set_error_handler("customError");
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Exceptions</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  try {
    if ($value > 1) {
      throw new Exception("Value must be 1 or below");
    }
  } catch (Exception $e) {
    echo 'Message: ' . $e->getMessage();
  }
?>`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Configuration
        </button>
      </div>
    </div>
  );
}