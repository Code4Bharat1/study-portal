'use client';

import useReadingTracker from "@/components/useReadingTracker";

export default function PhpIntro() {
  useReadingTracker('php-intro');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Introduction</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">What is PHP?</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages. PHP is a widely-used, free, and efficient alternative to competitors such as Microsoft's ASP.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Key Characteristics</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>PHP files can contain text, HTML, CSS, JavaScript, and PHP code</li>
            <li>PHP code is executed on the server, and the result is returned to the browser as plain HTML</li>
            <li>PHP files have extension ".php"</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">What Can PHP Do?</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Generate dynamic page content</li>
            <li>Create, open, read, write, delete, and close files on the server</li>
            <li>Collect form data</li>
            <li>Send and receive cookies</li>
            <li>Add, delete, modify data in your database</li>
            <li>Control user-access</li>
            <li>Encrypt data</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Basic PHP Example</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<!DOCTYPE html>
<html>
<body>
  <h1>My first PHP page</h1>
  <?php
    echo "Hello World!";
  ?>
</body>
</html>`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Installation
        </button>
      </div>
    </div>
  );
}