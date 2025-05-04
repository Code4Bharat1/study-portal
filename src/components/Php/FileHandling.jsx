'use client';

import useReadingTracker from "@/components/useReadingTracker";

export default function PhpFileHandling() {
  useReadingTracker('php-file-handling');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">File Handling</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Working with Files</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            PHP provides functions for creating, reading, uploading, and editing files.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Basic File Operations</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // Write to file
  $file = fopen("test.txt", "w");
  fwrite($file, "Hello World!");
  fclose($file);
  
  // Read file
  echo file_get_contents("test.txt");
  
  // File upload
  $target_dir = "uploads/";
  $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
  move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Security Considerations</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Validate file types and extensions</li>
            <li>Limit upload file size</li>
            <li>Store uploads outside web root when possible</li>
            <li>Rename uploaded files to prevent directory traversal</li>
          </ul>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Error Handling
        </button>
      </div>
    </div>
  );
}