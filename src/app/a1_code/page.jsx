"use client";
import React, { useState, useEffect, useRef } from "react";

const CodeEditor = () => {
  const [currentFile, setCurrentFile] = useState("pages/index.js");
  const [openTabs, setOpenTabs] = useState(["pages/index.js"]);
  const [expandedFolders, setExpandedFolders] = useState({
    pages: true,
    components: true,
    styles: true,
  });
  const [fileContents, setFileContents] = useState({
    "package.json": `{
  "name": "nextjs-sandbox",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "eslint": "^8",
    "eslint-config-next": "14.0.0"
  }
}`,
    "next.config.js": `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig`,
    "pages/index.js": `import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js Sandbox</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Next.js!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get started by editing{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">
              pages/index.js
            </code>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">Documentation →</h2>
              <p className="text-gray-600">
                Find in-depth information about Next.js features and API.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibent mb-2">Learn →</h2>
              <p className="text-gray-600">
                Learn about Next.js in an interactive course with quizzes!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}`,
    "pages/_app.js": `import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}`,
    "components/Header.js": `export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Next.js Sandbox</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
}`,
    "styles/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}`,
  });

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Load Monaco Editor
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs",
        },
      });

      window.require(["vs/editor/editor.main"], () => {
        if (editorRef.current && !monacoRef.current) {
          monacoRef.current = window.monaco.editor.create(editorRef.current, {
            value: fileContents[currentFile],
            language: getLanguageFromFile(currentFile),
            theme: "vs-dark",
            fontSize: 14,
            lineHeight: 20,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          });

          monacoRef.current.onDidChangeModelContent(() => {
            const newContent = monacoRef.current.getValue();
            setFileContents((prev) => ({
              ...prev,
              [currentFile]: newContent,
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
        window.monaco.editor.setModelLanguage(
          model,
          getLanguageFromFile(currentFile)
        );
        monacoRef.current.setValue(fileContents[currentFile]);
      }
    }
  }, [currentFile]);

  const getLanguageFromFile = (fileName) => {
    const ext = fileName.split(".").pop();
    switch (ext) {
      case "js":
        return "javascript";
      case "json":
        return "json";
      case "css":
        return "css";
      case "html":
        return "html";
      case "md":
        return "markdown";
      default:
        return "javascript";
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop();
    switch (ext) {
      case "js":
        return "JS";
      case "json":
        return "📦";
      case "css":
        return "🎨";
      case "html":
        return "🌐";
      case "md":
        return "📝";
      default:
        return "📄";
    }
  };

  const getIconColor = (fileName) => {
    const ext = fileName.split(".").pop();
    switch (ext) {
      case "js":
        return "text-orange-400";
      case "json":
        return "text-green-400";
      case "css":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const openFile = (fileName) => {
    setCurrentFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
  };

  const closeTab = (fileName, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);

    if (fileName === currentFile && newTabs.length > 0) {
      setCurrentFile(newTabs[newTabs.length - 1]);
    }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const generatePreview = () => {
    const headerContent = fileContents["components/Header.js"];
    const cssContent = fileContents["styles/globals.css"];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Next.js Sandbox</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${cssContent}</style>
</head>
<body>
    <header class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-xl font-bold text-gray-900">Next.js Sandbox</h1>
                </div>
                <nav class="flex items-center space-x-6">
                    <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Next.js!
            </h1>
            <p class="text-xl text-gray-600 mb-8">
                Get started by editing
                <code class="bg-gray-100 px-2 py-1 rounded">pages/index.js</code>
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <h2 class="text-2xl font-semibold mb-2">Documentation →</h2>
                    <p class="text-gray-600">
                        Find in-depth information about Next.js features and API.
                    </p>
                </div>
                
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <h2 class="text-2xl font-semibold mb-2">Learn →</h2>
                    <p class="text-gray-600">
                        Learn about Next.js in an interactive course with quizzes!
                    </p>
                </div>
                
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <h2 class="text-2xl font-semibold mb-2">Examples →</h2>
                    <p class="text-gray-600">
                        Discover and deploy boilerplate example Next.js projects.
                    </p>
                </div>
                
                <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <h2 class="text-2xl font-semibold mb-2">Deploy →</h2>
                    <p class="text-gray-600">
                        Instantly deploy your Next.js site to a public URL with Vercel.
                    </p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>`;
  };

  const fileTree = [
    { name: "package.json", type: "file", path: "package.json" },
    { name: "next.config.js", type: "file", path: "next.config.js" },
    {
      name: "pages",
      type: "folder",
      children: [
        { name: "index.js", type: "file", path: "pages/index.js" },
        { name: "_app.js", type: "file", path: "pages/_app.js" },
      ],
    },
    {
      name: "components",
      type: "folder",
      children: [
        { name: "Header.js", type: "file", path: "components/Header.js" },
      ],
    },
    {
      name: "styles",
      type: "folder",
      children: [
        { name: "globals.css", type: "file", path: "styles/globals.css" },
      ],
    },
  ];

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-gray-700 flex items-center px-4">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <span className="text-sm font-medium">PROJECT</span>
        </div>

        {/* Project Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center mb-2">
            <span className="text-xs text-gray-400">▼ INFO</span>
          </div>
          <h3 className="text-sm font-medium mb-1">Next.js Sandbox</h3>
          <p className="text-xs text-gray-400 mb-3">
            Try React with Next.js in your Browser
          </p>
          <div className="flex text-xs text-gray-400 space-x-4">
            <span>👁 0 views</span>
            <span>🔀 0 forks</span>
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
                  {item.type === "file" ? (
                    <div
                      className={`flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer ${
                        currentFile === item.path ? "bg-gray-700" : ""
                      }`}
                      onClick={() => openFile(item.path)}
                    >
                      <span
                        className={`mr-2 text-sm ${getIconColor(item.name)}`}
                      >
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
                          {expandedFolders[item.name] ? "📂" : "📁"}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {expandedFolders[item.name] && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((child) => (
                            <div
                              key={child.path}
                              className={`flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer ${
                                currentFile === child.path ? "bg-gray-700" : ""
                              }`}
                              onClick={() => openFile(child.path)}
                            >
                              <span
                                className={`mr-2 text-sm ${getIconColor(
                                  child.name
                                )}`}
                              >
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Preview Panel */}
        <div className="w-1/2 bg-white border-r border-gray-700 flex flex-col">
          <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4">
            <span className="text-sm text-gray-400">Preview</span>
            <div className="ml-auto flex items-center space-x-2">
              <button className="text-xs text-gray-400 hover:text-gray-200">
                ↻
              </button>
              <button className="text-xs text-gray-400 hover:text-gray-200">
                ⧉
              </button>
            </div>
          </div>
          <iframe
            className="flex-1 w-full"
            srcDoc={generatePreview()}
            title="Preview"
          />
        </div>

        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Tab Bar */}
          <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center">
            <div className="flex">
              {openTabs.map((tab) => (
                <div
                  key={tab}
                  className={`flex items-center px-4 py-2 border-r border-gray-700 cursor-pointer ${
                    currentFile === tab
                      ? "bg-gray-900"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  onClick={() => setCurrentFile(tab)}
                >
                  <span className={`mr-2 text-sm ${getIconColor(tab)}`}>
                    {getFileIcon(tab)}
                  </span>
                  <span className="text-sm">{tab.split("/").pop()}</span>
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-200"
                    onClick={(e) => closeTab(tab, e)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative">
            <div ref={editorRef} className="absolute inset-0" />
          </div>

          {/* Terminal */}
          <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
            <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-4">
              <span className="text-sm text-gray-400">Terminal</span>
              <div className="ml-auto">
                <button className="text-xs text-gray-400 hover:text-gray-200">
                  +
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <div className="text-sm font-mono">
                <div className="text-blue-400">$ npm run dev</div>
                <div className="text-green-400">
                  ✓ Ready on http://localhost:3000
                </div>
                <div className="text-gray-400 mt-2">
                  <span className="text-blue-400">~/project</span> $
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
