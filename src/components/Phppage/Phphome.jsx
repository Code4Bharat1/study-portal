'use client';

export default function PhpHome() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Home</h1>
      <p className="text-lg text-gray-800 mb-6">
        Welcome to the PHP tutorial! PHP is a widely-used open source scripting language especially suited for web development. In this comprehensive tutorial, you'll learn everything from PHP basics to advanced concepts like database integration and security. PHP runs on the server side and can be embedded into HTML, making it perfect for creating dynamic web pages. Let's begin our journey into server-side scripting with PHP!
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Getting Started with PHP</h2>

        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            PHP (Hypertext Preprocessor) is a server-side scripting language designed for web development but also used as a general-purpose programming language. PHP code is executed on the server, and the result is returned to the browser as plain HTML. PHP can perform any task that other CGI programs can do, such as collect form data, generate dynamic page content, or send and receive cookies.
          </p>

          <p>
            Here's a simple example of a PHP script:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  echo "Hello, World!";
?>`}
            </code>
          </pre>

          <p>
            This basic script outputs "Hello, World!" to the browser. Let's examine the components:
          </p>

          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li><strong>PHP Tags:</strong> All PHP code must be enclosed within <code>&lt;?php ?&gt;</code> tags</li>
            <li><strong>echo statement:</strong> Outputs one or more strings to the browser</li>
            <li><strong>Semicolon:</strong> Each PHP statement must end with a semicolon</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD] mt-6">PHP Features</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Simple and easy to learn syntax</li>
            <li>Excellent documentation and large community</li>
            <li>Built-in support for working with databases like MySQL</li>
            <li>Cross-platform compatibility (runs on Windows, Linux, macOS)</li>
            <li>Free and open source with regular updates</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD] mt-6">Basic Syntax Rules</h3>
          <p>
            PHP syntax is similar to C and Perl, with some unique features:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // Single line comment
  # Another single line comment
  /*
    Multi-line
    comment
  */
  
  $variable = "value"; // Variables start with $
  $number = 42;
  $array = array("apple", "banana", "cherry");
?>`}
            </code>
          </pre>

          <p>
            PHP is a loosely typed language, meaning you don't need to declare variable types. The type is determined automatically when a value is assigned.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD] mt-6">Why Choose PHP?</h3>
          <p>
            PHP powers millions of websites and web applications, including Facebook, WordPress, and Wikipedia. Its popularity stems from:
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Easy integration with HTML and databases</li>
            <li>Fast performance for web applications</li>
            <li>Huge collection of frameworks and libraries</li>
            <li>Excellent support for content management systems</li>
            <li>Strong object-oriented programming support</li>
          </ul>

          <p>
            As we progress through this tutorial, you'll learn how to work with forms, connect to databases, handle files, secure your applications, and much more. PHP continues to evolve with regular updates that improve performance and add new features.
          </p>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Next Concept
        </button>
      </div>
    </div>
  );
}