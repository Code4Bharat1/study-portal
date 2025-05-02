'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function PhpAuthentication() {
  useReadingTracker('php-authentication');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Authentication</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">User Login Systems</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Implementing secure authentication is essential for protecting user accounts.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Password Hashing</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // Registration
  $password = "user_password";
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);
  
  // Login verification
  if (password_verify($input_password, $hashed_password)) {
    // Password correct
  } else {
    // Password incorrect
  }
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Session Management</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  session_start();
  
  // Store user data in session
  $_SESSION["user_id"] = $user_id;
  $_SESSION["username"] = $username;
  
  // Check if user is logged in
  if (isset($_SESSION["user_id"])) {
    // User is authenticated
  }
  
  // Logout
  session_destroy();
?>`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn File Handling
        </button>
      </div>
    </div>
  );
}