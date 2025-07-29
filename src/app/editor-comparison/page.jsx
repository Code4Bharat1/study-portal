'use client';

import { useState } from 'react';
import TestPlatform from '@/components/TestPlatform';
import MonacoTestPlatform from '@/components/MonacoTestPlatform';

// Sample exercise data
const sampleExercise = {
  title: "JavaScript",
  task: {
    title: "Basic JavaScript Exercise",
    description: "Write a JavaScript program that declares a variable and logs it to the console.",
    requirements: [
      "Declare at least one variable",
      "Use console.log to output something", 
      "Make sure your code has valid syntax"
    ],
    hints: [
      "Use 'let', 'const', or 'var' to declare variables",
      "console.log() is used to print output",
      "Don't forget semicolons!"
    ]
  },
  files: {
    'script.js': '// Write your JavaScript code here\n// Example: let message = "Hello World";\n// console.log(message);',
    'tests.js': `const { ESLint } = require('eslint');
const esprima = require('esprima');
console.clear();
console.clear();
const fs = require('fs');
const path = require('path');

// File paths
const attemptsFile = path.join(__dirname, 'attempts.tests');
const resultFile = path.join(__dirname, 'results.tests');

// Read JavaScript
const js = fs.readFileSync('script.js', 'utf8');

// Helper: Read Attempts (default to 1)
function readAttempts() {
  if (fs.existsSync(attemptsFile)) {
    const data = fs.readFileSync(attemptsFile, 'utf8');
    try {
      const parsed = JSON.parse(data);
      return parsed.count >= 1 ? parsed.count : 1;
    } catch (err) {
      console.error('Error parsing attempts.tests. Resetting counter.');
      return 1;
    }
  }
  return 1;
}

// Helper: Write Attempt Count
function writeAttempts(count) {
  try {
    fs.writeFileSync(attemptsFile, JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error(\`Failed to write to \${attemptsFile}: \${err.message}\`);
  }
}

// Syntax Verification using ESLint
async function syntaxVerify() {
  const eslint = new ESLint();
  const results = await eslint.lintText(js);
  if (results[0].errorCount === 0) {
    console.log('✔ JavaScript syntax is valid.');
    return true;
  } else {
    console.log('❌ JavaScript syntax is not valid:');
    results[0].messages.forEach(msg => console.log(\`- [\${msg.ruleId}] \${msg.message} (line \${msg.line})\`));
    return false;
  }
}

// Code Verification
function codeVerify() {
  let allPassed = true;
  let ast;
  try {
    ast = esprima.parseScript(js, { tolerant: true });
  } catch (err) {
    console.log(\`✘ Failed to parse JavaScript: \${err.message}\`);
    return false;
  }

  let consoleLogs = 0;
  function traverse(node) {
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'console' && node.callee.property.name === 'log') {
      consoleLogs++;
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }
  traverse(ast);

  if (consoleLogs === 0) {
    console.log('✘ No console.log statements found');
    allPassed = false;
  } else {
    console.log(\`✔ Found \${consoleLogs} console.log statement(s)\`);
  }

  const variableDeclarations = ast.body.filter(node => node.type === 'VariableDeclaration');
  if (variableDeclarations.length === 0) {
    console.log('✘ No variable declarations found');
    allPassed = false;
  } else {
    console.log(\`✔ Found \${variableDeclarations.length} variable declaration(s)\`);
  }

  if (allPassed) {
    console.log('\\n🎉 Success! Code verification passed.');
  } else {
    console.log('\\n❗ Code verification failed. Please review your JavaScript.');
  }
  return allPassed;
}

// Main execution
(async () => {
  const startTime = process.hrtime();
const syntaxPassed = await syntaxVerify();
if (!syntaxPassed) {
  console.log('\\n❌ Syntax errors prevent further checks.');
  ;
}

  const structurePassed = codeVerify();
  const allPassed = syntaxPassed && structurePassed;

  const [sec, nanosec] = process.hrtime(startTime);
  const executionTime = +(sec + nanosec / 1e9).toFixed(3);
  const linesOfCode = js.split('\\n').filter(line => line.trim()).length;

  let attempts = readAttempts();
  if (allPassed) {
    const resultData = { attempts, linesOfCode, executionTime, syntaxCheckPassed: syntaxPassed, structureCheckPassed: structurePassed, timestamp: new Date().toISOString() };
    try {
      fs.writeFileSync(resultFile, JSON.stringify(resultData, null, 2));
      console.log(\`\\n✅ All tests passed. Results saved to \${resultFile}.\`);
    } catch (err) {
      console.error(\`Failed to write to \${resultFile}: \${err.message}\`);
    }
    process.exit(0);
  } else {
    attempts += 1;
    writeAttempts(attempts);
    console.log(\`\\n❌ One or more tests failed. Attempt #\${attempts} recorded.\`);
    ;
  }
})();`
  },
  menuItems: [
    {
      label: "Exercise 1",
      onClick: () => console.log("Exercise 1 selected")
    }
  ]
};

export default function EditorComparisonPage() {
  const [activeEditor, setActiveEditor] = useState('monaco');
  const [sidebarContent, setSidebarContent] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Editor Comparison</h1>
        <p className="text-center text-gray-600 mb-8">
          Compare StackBlitz vs Monaco Editor implementations side by side
        </p>
        
        {/* Editor Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveEditor('monaco')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeEditor === 'monaco'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monaco Editor
            </button>
            <button
              onClick={() => setActiveEditor('stackblitz')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeEditor === 'stackblitz'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              StackBlitz
            </button>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Monaco Editor</th>
                  <th className="text-center py-2">StackBlitz</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Loading Speed</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Fast</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-yellow-600">~ Moderate</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Offline Support</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Yes</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-red-600">✗ No</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">External Dependencies</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ None</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-red-600">✗ StackBlitz API</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Code Execution</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">��� Browser-based</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ WebContainer</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Test Compatibility</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ 100%</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Native</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Customization</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Full Control</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-yellow-600">~ Limited</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Cost</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Free</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-yellow-600">~ API Limits</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Privacy</td>
                  <td className="text-center py-2">
                    <span className="text-green-600">✓ Local Only</span>
                  </td>
                  <td className="text-center py-2">
                    <span className="text-yellow-600">~ External Service</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Editor */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b">
            <h3 className="text-lg font-semibold">
              {activeEditor === 'monaco' ? 'Monaco Editor' : 'StackBlitz'} Implementation
            </h3>
          </div>
          
          {activeEditor === 'monaco' ? (
            <MonacoTestPlatform
              setSidebarContent={setSidebarContent}
              menuItems={sampleExercise.menuItems}
              files={sampleExercise.files}
              filesOpened="script.js"
              task={sampleExercise.task}
              title={sampleExercise.title}
              hideExplorer={true}
            />
          ) : (
            <TestPlatform
              setSidebarContent={setSidebarContent}
              menuItems={sampleExercise.menuItems}
              files={sampleExercise.files}
              filesOpened="script.js"
              task={sampleExercise.task}
              title={sampleExercise.title}
              hideExplorer={true}
            />
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">How to Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Switch between Monaco Editor and StackBlitz using the tabs above</li>
            <li>Write some JavaScript code (e.g., <code className="bg-gray-200 px-1 rounded">let x = 5; console.log(x);</code>)</li>
            <li>Click "Submit" to run the tests</li>
            <li>Compare the behavior, speed, and user experience</li>
            <li>Notice that Monaco Editor loads faster and works offline</li>
          </ol>
        </div>
      </div>
    </div>
  );
}