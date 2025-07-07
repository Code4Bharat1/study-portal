"use client";
import React, { useState, useEffect, useRef } from 'react';

const CodeCompiler = () => {
  const [currentFile, setCurrentFile] = useState('src/index.js');
  const [openTabs, setOpenTabs] = useState(['src/index.js']);
  const [expandedFolders, setExpandedFolders] = useState({
    src: true,
    utils: true
  });
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [fileContents, setFileContents] = useState({
    'package.json': `{
  "name": "js-compiler",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  }
}`,
    'src/index.js': `// Welcome to the JavaScript Compiler!
// Try editing this code and click Run to see the output

console.log("Hello, World!");

// Example: Simple calculator
function calculate(a, b, operation) {
  switch(operation) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error: Division by zero';
    default: return 'Error: Unknown operation';
  }
}

console.log("Calculator Examples:");
console.log("5 + 3 =", calculate(5, 3, '+'));
console.log("10 - 4 =", calculate(10, 4, '-'));
console.log("6 * 7 =", calculate(6, 7, '*'));
console.log("15 / 3 =", calculate(15, 3, '/'));

// Example: Working with arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubled);

// Example: Async/await simulation
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
}

fetchData().then(data => console.log(data));`,
    'src/math.js': `// Math utility functions
export function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    'utils/helpers.js': `// Helper utility functions
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}`
  });

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const outputRef = useRef(null);

  // Load Monaco Editor
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
    document.head.appendChild(script);

    script.onload = () => {
      window.require.config({ 
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } 
      });
      
      window.require(['vs/editor/editor.main'], () => {
        if (editorRef.current && !monacoRef.current) {
          monacoRef.current = window.monaco.editor.create(editorRef.current, {
            value: fileContents[currentFile],
            language: getLanguageFromFile(currentFile),
            theme: 'vs-dark',
            fontSize: 14,
            lineHeight: 20,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            }
          });

          monacoRef.current.onDidChangeModelContent(() => {
            const newContent = monacoRef.current.getValue();
            setFileContents(prev => ({
              ...prev,
              [currentFile]: newContent
            }));
          });
        }
      });
    };

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, []);

  // Update editor when file changes
  useEffect(() => {
    if (monacoRef.current && fileContents[currentFile]) {
      const model = monacoRef.current.getModel();
      if (model) {
        window.monaco.editor.setModelLanguage(model, getLanguageFromFile(currentFile));
        monacoRef.current.setValue(fileContents[currentFile]);
      }
    }
  }, [currentFile]);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const getLanguageFromFile = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'js': return 'javascript';
      case 'json': return 'json';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'md': return 'markdown';
      default: return 'javascript';
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'js': return '⚡';
      case 'json': return '📦';
      case 'css': return '🎨';
      case 'html': return '🌐';
      case 'md': return '📝';
      default: return '📄';
    }
  };

  const getIconColor = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'js': return 'text-yellow-400';
      case 'json': return 'text-green-400';
      case 'css': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const openFile = (fileName) => {
    setCurrentFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
  };

  const closeTab = (fileName, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
    
    if (fileName === currentFile && newTabs.length > 0) {
      setCurrentFile(newTabs[newTabs.length - 1]);
    }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    setErrors('');

    try {
      // Create a sandboxed execution environment
      const logs = [];
      const errors = [];
      
      // Override console methods to capture output
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info
      };

      const mockConsole = {
        log: (...args) => logs.push(['log', ...args]),
        error: (...args) => {
          logs.push(['error', ...args]);
          errors.push(...args);
        },
        warn: (...args) => logs.push(['warn', ...args]),
        info: (...args) => logs.push(['info', ...args])
      };

      // Get the code to execute
      const codeToRun = fileContents[currentFile];
      
      // Create a function that executes the user's code
      const executeUserCode = new Function('console', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'Promise', codeToRun);
      
      // Custom setTimeout/setInterval for demo purposes (limited time)
      const mockSetTimeout = (fn, delay) => {
        if (delay > 5000) delay = 5000; // Max 5 second delay
        return setTimeout(fn, delay);
      };
      
      const mockSetInterval = (fn, delay) => {
        if (delay < 100) delay = 100; // Min 100ms interval
        return setInterval(fn, delay);
      };

      // Execute the code with mocked environment
      await executeUserCode(mockConsole, mockSetTimeout, mockSetInterval, clearTimeout, clearInterval, Promise);

      // Format output
      const formattedLogs = logs.map(([type, ...args]) => {
        const timestamp = new Date().toLocaleTimeString();
        const argsStr = args.map(arg => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg, null, 2);
          }
          return String(arg);
        }).join(' ');
        
        const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : type === 'info' ? 'ℹ️' : '✅';
        return `[${timestamp}] ${prefix} ${argsStr}`;
      }).join('\n');

      setOutput(formattedLogs || 'Code executed successfully (no output)');
      
      if (errors.length > 0) {
        setErrors(errors.join('\n'));
      }

    } catch (error) {
      setErrors(`Runtime Error: ${error.message}\n${error.stack || ''}`);
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setErrors('');
  };

  const fileTree = [
    { name: 'package.json', type: 'file', path: 'package.json' },
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.js', type: 'file', path: 'src/index.js' },
        { name: 'math.js', type: 'file', path: 'src/math.js' }
      ]
    },
    {
      name: 'utils',
      type: 'folder',
      children: [
        { name: 'helpers.js', type: 'file', path: 'utils/helpers.js' }
      ]
    }
  ];

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-gray-700 flex items-center px-4">
          <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center mr-3">
            <span className="text-black font-bold text-xs">JS</span>
          </div>
          <span className="text-sm font-medium">COMPILER</span>
        </div>

        {/* Project Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center mb-2">
            <span className="text-xs text-gray-400">▼ PROJECT</span>
          </div>
          <h3 className="text-sm font-medium mb-1">JavaScript Compiler</h3>
          <p className="text-xs text-gray-400 mb-3">Real-time JavaScript execution environment</p>
          <div className="flex text-xs text-gray-400 space-x-4">
            <span>⚡ Live execution</span>
            <span>🔒 Sandboxed</span>
          </div>
        </div>

        {/* File Explorer */}
        <div className="flex-1 overflow-auto">
          <div className="p-2">
            <div className="flex items-center mb-2">
              <span className="text-xs text-gray-400">▼ FILES</span>
            </div>
            <div className="space-y-1">
              {fileTree.map((item) => (
                <div key={item.name}>
                  {item.type === 'file' ? (
                    <div
                      className={`flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer ${
                        currentFile === item.path ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => openFile(item.path)}
                    >
                      <span className={`mr-2 text-sm ${getIconColor(item.name)}`}>
                        {getFileIcon(item.name)}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer"
                        onClick={() => toggleFolder(item.name)}
                      >
                        <span className="mr-2">
                          {expandedFolders[item.name] ? '📂' : '📁'}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {expandedFolders[item.name] && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((child) => (
                            <div
                              key={child.path}
                              className={`flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer ${
                                currentFile === child.path ? 'bg-gray-700' : ''
                              }`}
                              onClick={() => openFile(child.path)}
                            >
                              <span className={`mr-2 text-sm ${getIconColor(child.name)}`}>
                                {getFileIcon(child.name)}
                              </span>
                              <span className="text-sm">{child.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Run Controls */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={executeCode}
            disabled={isRunning}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium mb-2 transition-colors"
          >
            {isRunning ? '⏵ Running...' : '▶ Run Code'}
          </button>
          <button
            onClick={clearOutput}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            🗑 Clear Output
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center">
          <div className="flex">
            {openTabs.map((tab) => (
              <div
                key={tab}
                className={`flex items-center px-4 py-2 border-r border-gray-700 cursor-pointer ${
                  currentFile === tab ? 'bg-gray-900' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setCurrentFile(tab)}
              >
                <span className={`mr-2 text-sm ${getIconColor(tab)}`}>
                  {getFileIcon(tab)}
                </span>
                <span className="text-sm">{tab.split('/').pop()}</span>
                {openTabs.length > 1 && (
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-200"
                    onClick={(e) => closeTab(tab, e)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor and Output */}
        <div className="flex-1 flex">
          {/* Editor */}
          <div className="w-1/2 flex flex-col">
            <div ref={editorRef} className="flex-1" />
          </div>

          {/* Output Panel */}
          <div className="w-1/2 bg-gray-900 border-l border-gray-700 flex flex-col">
            <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4">
              <span className="text-sm text-gray-400">Console Output</span>
              <div className="ml-auto flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></span>
                <span className="text-xs text-gray-400">{isRunning ? 'Running' : 'Ready'}</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              {/* Output */}
              <div className="flex-1 overflow-auto">
                <div ref={outputRef} className="p-4 font-mono text-sm space-y-1">
                  {output ? (
                    <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
                  ) : (
                    <div className="text-gray-500 italic">No output yet. Click "Run Code" to execute.</div>
                  )}
                </div>
              </div>

              {/* Errors */}
              {errors && (
                <div className="border-t border-gray-700 bg-red-900/20">
                  <div className="h-8 bg-red-800/30 border-b border-red-700 flex items-center px-4">
                    <span className="text-sm text-red-400">❌ Errors</span>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-red-400">{errors}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;