'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Compiler() {
  const [html, setHtml] = useState('<h1>Hello World</h1>');
  const [css, setCss] = useState('h1 { color: blue; }');
  const [js, setJs] = useState('console.log("Hello World");');

  const generateCode = () => {
    return `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      
      {/* Topbar */}
      <div className="px-8 py-4 bg-gray-800 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold text-white">
          Code<span className="text-blue-400">Playground</span>
        </h1>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editors */}
        <div className="w-1/2 p-4 flex flex-col gap-4 overflow-auto">
          
          {/* HTML Editor */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="px-4 py-2 bg-gray-700 font-semibold">HTML</div>
            <Editor
              height="200px"
              theme="vs-dark"
              defaultLanguage="html"
              value={html}
              onChange={(value) => setHtml(value)}
            />
          </div>

          {/* CSS Editor */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="px-4 py-2 bg-gray-700 font-semibold">CSS</div>
            <Editor
              height="200px"
              theme="vs-dark"
              defaultLanguage="css"
              value={css}
              onChange={(value) => setCss(value)}
            />
          </div>

          {/* JS Editor */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="px-4 py-2 bg-gray-700 font-semibold">JavaScript</div>
            <Editor
              height="200px"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={js}
              onChange={(value) => setJs(value)}
            />
          </div>

        </div>

        {/* Output */}
        <div className="w-1/2 p-4 overflow-auto">
          <div className="bg-white rounded-lg h-full overflow-hidden shadow-lg">
            <iframe
              srcDoc={generateCode()}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
