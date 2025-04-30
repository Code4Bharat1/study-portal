'use client';

export default function PhpSyntax() {
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Basic Syntax</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">PHP Fundamentals</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <h3 className="text-xl font-semibold text-[#DDA0DD]">PHP Tags</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // PHP code goes here
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Variables</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  $name = "John";
  $age = 25;
  $price = 9.99;
  $is_active = true;
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Conditional Statements</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  if ($age > 18) {
    echo "Adult";
  } elseif ($age > 12) {
    echo "Teen";
  } else {
    echo "Child";
  }
?>`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Loops</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // For loop
  for ($i = 0; $i < 5; $i++) {
    echo $i;
  }
  
  // While loop
  $j = 0;
  while ($j < 5) {
    echo $j;
    $j++;
  }
?>`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Database Integration
        </button>
      </div>
    </div>
  );
}