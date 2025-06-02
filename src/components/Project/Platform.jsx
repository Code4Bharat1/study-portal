// "use client";
// import { useState, useRef, useMemo, useEffect } from "react";
// // import Sandbox from "@/components/Sandbox";
// import ReactMarkdown from "react-markdown";
// import Sandbox from "@/components/Sandbox";

// export default function ProjectPlatform({
//   setSidebarContent,
//   menuItems,
//   projectType,
//   task,
//   onMenuItemClick,
// }) {
//   const [sandboxLoaded, setSandboxLoaded] = useState(false);
//   const [selectedLevel, setSelectedLevel] = useState("Basic");
//   const [selectedProject, setSelectedProject] = useState(menuItems[0]?.label || "");
//   const [attempts, setAttempts] = useState(0);
//   const [result, setResult] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const instructionRef = useRef(null);
//   const overlayRef = useRef(null);

//   // Define files dynamically based on projectType
//   const getFilesForProjectType = (type) => {
//     switch (type) {
//       case "html-css-js":
//         return {
//           "index.html": "<!DOCTYPE html><html><head><title>Project</title><link rel='stylesheet' href='styles.css'></head><body><script src='script.js'></script></body></html>",
//           "styles.css": "",
//           "script.js": "",
//           "tests.test": `
// const fs = require('fs');
// const path = require('path');
// const testsFile = path.join(__dirname, 'web-c.done');
// fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`,
//           "package.json": `{
//             "name": "project-sandbox",
//             "stackblitz": {
//   "startCommand": "npm run test && source ~/.jshrc"//   ,
// }
//               "test": "node tests.test",
//               "start": "node tests.test && servor",
//               //             },
//             "dependencies": {
//               "cheerio": "^1.0.0",
//               "htmlhint": "^1.1.4",
//               "servor": "^4.0.2",
//               "express": "^4.18.2"
//             }
//           }`,
//         };
//       case "mern":
//         return {
//           "server.js": "const express = require('express');\nconst app = express();\napp.listen(3000, () => console.log('Server running'));",
//           "client/index.html": "<!DOCTYPE html><html><head><title>MERN Project</title></head><body><div id='root'></div><script src='index.js'></script></body></html>",
//           "client/index.js": "import React from 'react';\nimport ReactDOM from 'react-dom';\nReactDOM.render(<h1>Hello, MERN!</h1>, document.getElementById('root'));",
//           "package.json": `{
//             "name": "mern-sandbox",
//             "stackblitz": {
// "startCommand": "npm run test && source ~/.jshrc"// ,
// }
//               "start": "node server.js",
//               "test": "echo 'Tests for MERN project'",
//               //             },
//             "dependencies": {
//               "express": "^4.18.2",
//               "react": "^18.2.0",
//               "react-dom": "^18.2.0",
//               "servor": "^4.0.2"
//             }
//           }`,
//         };
//       case "nextjs":
//         return {
//           "pages/index.js": "export default function Home() { return <div>Welcome to Next.js</div>; }",
//           "package.json": `{
//             "name": "nextjs-sandbox",
//             "stackblitz": {
// "startCommand": "npm run test && source ~/.jshrc"// ,
// }
//               "dev": "next dev",
//               "build": "next build",
//               "start": "next start",
//               "test": "echo 'Tests for Next.js project'"
//             },
//             "dependencies": {
//               "next": "^14.0.0",
//               "react": "^18.2.0",
//               "react-dom": "^18.2.0"
//             }
//           }`,
//         };
//       case "python":
//         return {
//           "main.py": "print('Hello, Python Project!')",
//           "requirements.txt": "",
//           "tests.py": "print('Tests for Python project')",
//         };
//       default:
//         return {};
//     }
//   };

//   const files = getFilesForProjectType(projectType);
//   const filesOpened = projectType === "mern" ? "server.js" : projectType === "nextjs" ? "pages/index.js" : projectType === "python" ? "main.py" : "index.html";

//   useEffect(() => {
//     setStartTime(Date.now());
//     const storedAttempts = localStorage.getItem(`attempts-${selectedProject}`);
//     if (storedAttempts) setAttempts(parseInt(storedAttempts));
//     fetchLeaderboard();
//   }, [selectedProject]);

//   const fetchLeaderboard = async () => {
//     const response = await fetch(`/api/leaderboard/${projectType}`);
//     const data = await response.json();
//     setLeaderboard(data);
//   };

//   const showInstructions = () => {
//     instructionRef.current.classList.remove("hidden");
//     overlayRef.current.classList.remove("hidden");
//   };

//   const hideInstructions = () => {
//     instructionRef.current.classList.add("hidden");
//     overlayRef.current.classList.add("hidden");
//   };

//   const handleSandboxLoad = () => {
//     setSandboxLoaded(true);
//   };

//   const handleLevelChange = (event) => {
//     const level = event.target.value;
//     setSelectedLevel(level);
//     setSidebarContent(event);
//     setSelectedProject(menuItems[0]?.label || "");
//     onMenuItemClick(menuItems[0]?.task || "");
//   };

//   const handleProjectChange = (event) => {
//     const projectLabel = event.target.value;
//     setSelectedProject(projectLabel);
//     const selectedItem = menuItems.find(item => item.label === projectLabel);
//     if (selectedItem) {
//       onMenuItemClick(selectedItem.task);
//     }
//   };

//   const handleSubmit = async () => {
//     setAttempts(attempts + 1);
//     localStorage.setItem(`attempts-${selectedProject}`, attempts + 1);

//     const endTime = Date.now();
//     const executionTime = (endTime - startTime) / 1000;

//     const correctness = Math.random() > 0.5 ? 1 : 0;
//     const finalPoint =
//       correctness * 0.5 +
//       (1 - attempts / 10) +
//       executionTime * 0.1;

//     setResult(finalPoint);

//     await fetch("/api/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         project: selectedProject,
//         finalPoint,
//         attempts,
//         executionTime,
//         projectType,
//       }),
//     });

//     fetchLeaderboard();
//   };

//   const sandboxElement = useMemo(() => {
//     if (files && filesOpened) {
//       return (
//         <Sandbox
//           fileToOpen={filesOpened}
//           filesObj={files}
//           onLoad={handleSandboxLoad}
//         />
//       );
//     }
//     return null;
//   }, [files, filesOpened]);

//   const levelColors = {
//     Basic: "bg-blue-500 hover:bg-blue-600 peer-checked:ring-blue-300",
//     intermediate: "bg-green-500 hover:bg-green-600 peer-checked:ring-green-300",
//     hard: "bg-red-500 hover:bg-red-600 peer-checked:ring-red-300",
//   };

//   return (
//     <div className="relative">
//       {/* Overlay */}
//       <div
//         ref={overlayRef}
//         className="fixed inset-0 bg-opacity-70 backdrop-blur-sm hidden"
//       />

//       {/* Instructions */}
//       <div
//         ref={instructionRef}
//         className="fixed top-35 left-1/2 transform -translate-x-1/2 w-auto max-w-2xl bg-white shadow-lg rounded-lg  p-6 border hidden"
//       >
//         <h1 className="text-xl font-bold text-blue-600 mb-4 whitespace-pre-wrap">
//           <ReactMarkdown>{task}</ReactMarkdown>
//         </h1>
//         <h2 className="text-md font-semibold mb-2">
//           Welcome! Please follow the instructions below to complete and test your work.
//         </h2>

//         <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4">
//           <li>Open the terminal.</li>
//           <li>
//             Run:
//             <pre className="bg-gray-100 p-2 mt-1 rounded text-xs">
//               <code>{projectType === "python" ? "python tests.py" : "npm run test"}</code>
//             </pre>
//           </li>
//           <li>You must pass the tests before submitting.</li>
//         </ol>

//         <blockquote className="border-l-4 border-yellow-400 pl-4 text-yellow-800 text-sm mb-3">
//           ⚠️ If a command is already running, press <kbd>Ctrl + C</kbd> to cancel.
//         </blockquote>

//         <h3 className="font-semibold text-sm mt-3 mb-1">🛠 Having Trouble?</h3>
//         <pre className="bg-gray-100 p-2 rounded text-xs mb-3">
//           <code>{projectType === "python" ? "python main.py" : "npm run start"}</code>
//         </pre>

//         <p className="text-sm mb-1">
//           Only edit <code>{filesOpened}</code>.
//         </p>
//         <p className="text-sm mb-4">
//           Close this box after reading the instructions.
//         </p>

//         <button
//           onClick={hideInstructions}
//           className="mt-2 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Close Instructions
//         </button>
//       </div>

//       {/* Top Bar */}
//       <div className="flex justify-between items-center py-5 pl-3 pr-1 relative z-10">
//         <div className="flex space-x-3 items-center">
//           {/* Difficulty Selector */}
//           <div
//             className="flex space-x-3"
//             role="radiogroup"
//             aria-label="Select Difficulty"
//           >
//             {["Basic", "intermediate", "hard"].map((level) => {
//               const isSelected = selectedLevel === level;
//               const baseColor =
//                 level === "Basic"
//                   ? "bg-blue-500 hover:bg-blue-600 ring-blue-300"
//                   : level === "intermediate"
//                   ? "bg-green-500 hover:bg-green-600 ring-green-300"
//                   : "bg-red-500 hover:bg-red-600 ring-red-300";

//               return (
//                 <label key={level}>
//                   <input
//                     type="radio"
//                     name="level"
//                     value={level}
//                     className="sr-only peer"
//                     onChange={handleLevelChange}
//                     checked={isSelected}
//                   />
//                   <div
//                     className={`
//                       flex items-center justify-center px-4 py-2 rounded text-white cursor-pointer transition-all
//                       ${baseColor}
//                       ${isSelected ? "ring-4 scale-105 shadow-md" : ""}
//                     `}
//                   >
//                     <span className="capitalize">{level}</span>
//                   </div>
//                 </label>
//               );
//             })}
//           </div>

//           {/* Project Selector Dropdown */}
//           <select
//             value={selectedProject}
//             onChange={handleProjectChange}
//             className="px-2 py-2 rounded text-black bg-gray-200 hover:bg-gray-300"
//           >
//             {menuItems.map((item) => (
//               <option key={item.label} value={item.label}>
//                 {item.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={showInstructions}
//             className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//           >
//             Instructions
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Main Content: No Sidebar */}
//       <div className="relative z-10 pr-2">
//         <div className="w-full">
//           <h1 className="text-xl font-bold mb-4 pl-3">{projectType.toUpperCase()} Project Sandbox</h1>
//           <div className="h-[400px]">{sandboxElement}</div> {/* Reduced height */}
//         </div>
//       </div>

//       {/* Leaderboard */}
//       {sandboxLoaded && (
//         <div className="mt-8 px-2">
//           <h2 className="text-xl font-bold">Leaderboard</h2>
//           <table className="w-full mt-4 border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Rank</th>
//                 <th className="border p-2">User</th>
//                 <th className="border p-2">Score</th>
//                 <th className="border p-2">Attempts</th>
//                 <th className="border p-2">Time (s)</th>
//                 <th className="border p-2">Upvotes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboard.map((entry, index) => (
//                 <tr key={index} className={index === 0 ? "bg-green-100" : ""}>
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2">{entry.user}</td>
//                   <td className="border p-2">{entry.score.toFixed(2)}</td>
//                   <td className="border p-2">{entry.attempts}</td>
//                   <td className="border p-2">{entry.executionTime}</td>
//                   <td className="border p-2">{entry.upvotes}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {result !== null && (
//         <div className="mt-4 px-2">
//           Result: {result.toFixed(2)} (Attempts: {attempts})
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sandbox from "@/components/Sandbox";

export default function ProjectPlatform({
  setSidebarContent,
  menuItems,
  projectType,
  task,
  onMenuItemClick,
}) {
  const [sandboxLoaded, setSandboxLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [selectedProject, setSelectedProject] = useState(menuItems[0]?.label || "");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const instructionRef = useRef(null);
  const overlayRef = useRef(null);

  const getFilesForProjectType = (type) => {
    switch (type) {
      case "html-css-js":
        return {
          "index.html": "<!DOCTYPE html><html><head><title>Project</title><link rel='stylesheet' href='styles.css'></head><body><script src='script.js'></script></body></html>",
          "styles.css": "",
          "script.js": "",
          "tests.test": `
const fs = require('fs');
const path = require('path');
const os = require('os');

// 1. Resolve base path
const basePath = path.dirname(__dirname); // current script's folder

const jshrcPath = path.join(os.homedir(), '.jshrc');
const shellPath = path.join(basePath, '.shell.js');

const customShell = \`
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const vm = require('vm');
const { spawn, exec, spawnSync } = require('child_process');



exec('kill 1');

// Shell prompt setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});
// Directories allowed for execution
const baseDir = \\\`\${__dirname}\\\`;
const allowedDirs = [baseDir];

function isPathAllowed(resolvedPath) {
  return allowedDirs.some(
    (dir) => resolvedPath === dir || resolvedPath.startsWith(dir + path.sep)
  );
}

async function resolveCommandPath(cmd) {
  if (cmd.startsWith('/') || cmd.startsWith('./') || cmd.startsWith('../')) {
    return path.resolve(process.cwd(), cmd);
  }
  const result = spawnSync('which', [cmd], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  return result.stdout.trim();
}

// All blocked commands that could alter filesystem or pose risk
const blockedCommands = new Set([
  'bg',
  'bind',
  'break',
  'builtin', 
  'ls',
  'command',
  'compgen',
  'complete',
  'continue',
  'declare',
  'dirs',
  'disown',
  'echo',
  'enable',
  'eval',
  'exec',
  'exit',
  'export',
  'fc',
  'fg',
  'getopts',
  'hash',
  'help',
  'history',
  'jobs',
  'kill',
  'let',
  'local',
  'logout',
  'popd',
  'printf',
  'pushd',
  'read',
  'readonly',
  'return',
  'set',
  'shift',
  'shopt',
  'source',
  'suspend',
  'test',
  'times',
  'trap',
  'type',
  'typeset',
  'ulimit',
  'umask',
  'unalias',
  'unset',
  'wait',
  'ln',
  'mkdir',
  'rm',
  'rmdir',
  'mv',
  'cp',
  'chmod',
  'chown',
  'chgrp',
  'touch',
  'truncate',
  'bash',
  'sh',
  'zsh',
  'jsh',
  'code',
  'python',
  'python3',
  'pnpm',
  'curl',
  'wget',
  'xdg',
  'cat',
  'head',
  'tail',
  'sort',
  'jq',
  'xxd',
  'env',
  'export',
  'unset',
  'xdg-open',
]);

function updatePrompt() {
  rl.setPrompt(\\\`\\\${process.cwd()} $ \\\`);
  rl.prompt();
}

updatePrompt();

rl.on('SIGINT', () => {
  updatePrompt();});

rl.on('line', async (line) => {
  const input = line.trim();

  if (input.includes('>') || input.includes('<')) {
    console.log(\\\`shell: \\\${input} not found\\\`);
    updatePrompt();
    return;
  }

  const parts = input.split(/\\\\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  // Block command if on the forbidden list
  if (blockedCommands.has(cmd)) {
    console.log(\\\`shell: \\\${cmd} not found\\\`);
    updatePrompt();
    return;
  }

  // Block path-based execution like ./file or /usr/bin/node
  if (
    cmd.startsWith('/') ||
    cmd.startsWith('./') ||
    cmd.startsWith('../') ||
    cmd.includes('/')
  ) {
    console.error('❌ Executing files via path is not allowed.');
    updatePrompt();
    return;
  }
  // Handle custom 'test' command
  // Handle custom 'test' command
  if (cmd === 'run-tests') {
    const testFile = path.resolve(process.cwd(), 'tests.test');

    if (!fs.existsSync(testFile)) {
      console.error('❌ tests.test not found in current directory.');
      updatePrompt();
      return;
    }

    const testProcess = spawn('node', [testFile], {
      stdio: 'inherit',
      env: { ...process.env },
    });

    testProcess.on('close', (code) => {
      console.log(\\\`\\nTest process exited with code: \\\${code}\\\`);
      updatePrompt();
    });

    return;
  }

  if (cmd === 'npx') {
    if (args[0] === 'node') {
      console.error("Error: 'npx node' is disabled. Use node instead.");
      updatePrompt();
      return;
    }

    const npxProcess = spawn('npx', args, { stdio: 'inherit' });
    npxProcess.on('close', (code) => {
      console.log('Process exited with code: ' + code);
      updatePrompt();
    });
    return;
  }

  if (cmd === 'node') {
    const targetFile = args[0];
    if (!targetFile) {
      console.error('Usage: node <script.js>');
      updatePrompt();
      return;
    }

    const blockedFiles = new Set([
      path.resolve(process.cwd(), 'tests.test'),
      path.resolve(process.cwd(), 'attempts.test'),
      path.resolve(process.cwd(), 'result.test'),
    ]);

    function isInsideCwd(filePath) {
      const resolved = path.resolve(process.cwd(), filePath);
      return resolved.startsWith(process.cwd() + path.sep);
    }

    function isBlocked(filePath) {
      const resolved = path.resolve(process.cwd(), filePath);
      return blockedFiles.has(resolved);
    }

    const fsMock = {
      ...fs,
      readFileSync(file, ...args) {
        const resolved = path.resolve(file);
        if (!isInsideCwd(resolved))
          throw new Error('Denied outside CWD: ' + file);
        if (isBlocked(resolved)) throw new Error('Read denied: ' + file);
        return fs.readFileSync(resolved, ...args);
      },
      writeFileSync(file, ...args) {
        const resolved = path.resolve(file);
        if (!isInsideCwd(resolved))
          throw new Error('Denied outside CWD: ' + file);
        if (isBlocked(resolved)) throw new Error('Write denied: ' + file);
        return fs.writeFileSync(resolved, ...args);
      },
      unlinkSync() {
        throw new Error('unlinkSync is blocked');
      },
      unlink() {
        const cb = arguments[arguments.length - 1];
        process.nextTick(() => cb(new Error('unlink is blocked')));
      },
    };

    const allowedBuiltins = [
      'path',
      'url',
      'http',
      'https',
      'buffer',
      'events',
      'stream',
      'util',
      'assert',
      'querystring',
      'zlib',
      'timers',
      'net',
      'dns',
    ];

    function safeRequire(mod) {
      if (mod === 'fs') return fsMock;
      if (allowedBuiltins.includes(mod)) return require(mod);
      throw new Error('Module ' + mod + ' is not allowed');
    }

    let resolvedPath;
    if (targetFile === '.' || targetFile === './') {
      resolvedPath = path.join(process.cwd(), 'index.js');
    } else if (targetFile === '..' || targetFile === '../') {
      resolvedPath = path.join(path.resolve(process.cwd(), '..'), 'index.js');
    } else {
      resolvedPath = path.resolve(process.cwd(), targetFile);
    }

    if (!fs.existsSync(resolvedPath)) {
      console.error('File not found:', resolvedPath);
      updatePrompt();
      return;
    }

    const code = fs.readFileSync(resolvedPath, 'utf-8');
    const sandbox = {
      console,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      require: safeRequire,
      Buffer,
      process: { env: {} },
    };

    const context = vm.createContext(sandbox);
    try {
      vm.runInContext(code, context, {
        filename: resolvedPath,
        timeout: 5000,
      });
    } catch (err) {
      console.error('Sandbox error:', err.message);
    }

    updatePrompt();
    return;
  }

  if (cmd === 'cd') {
  if (args.length == 0){
        console.log(process.cwd());
        updatePrompt();
        return;
      }
      const targetDir = args[0];
    try {
      if (targetDir.includes('~')) {
        console.error('❌ Error: "~" is not allowed.');
        updatePrompt();
        return;
      }

      const resolved = targetDir.startsWith('/')
        ? path.resolve(baseDir, '.' + targetDir)
        : path.resolve(process.cwd(), targetDir);

      if (
        !allowedDirs.some(
          (dir) => resolved === dir || resolved.startsWith(dir + path.sep)
        )
      ) {
        console.error('❌ Access Restricted.');
        updatePrompt();
        return;
      }

      if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
        console.error('❌ Error: Not a valid directory.');
        updatePrompt();
        return;
      }

      process.chdir(resolved);
    } catch (err) {
      console.error(\\\`cd: \\\${err.message}\\\`);
    }

    updatePrompt();
    return;
  }

  if (cmd === 'npm') {
    const env = { ...process.env, npm_config_ignore_scripts: 'true' };
    const npmProcess = spawn('npm', args, { stdio: 'inherit', env });

    npmProcess.on('error', (err) => {
      console.error('❌ Failed to start npm: ' + err.message);
    });
    npmProcess.on('close', (code) => {
      console.log('Process exited with code: ' + code);
      updatePrompt();
    });
  }
  const cmdPath = await resolveCommandPath(cmd);

  if (!cmdPath) {
    console.error('shell: Command not found: ' + cmd);
    updatePrompt();
    return;
  }
  // Default execution fallback
  const child = spawn(cmdPath, args, { stdio: 'inherit' });

  child.on('error', (err) => {
    console.error('❌ Failed to start process: ' + err.message);
  });

  child.on('close', (code) => {
    console.log('Process exited with code: ' + code);
    updatePrompt();
  });
});
\`;

fs.writeFileSync(shellPath, customShell);

fs.writeFileSync(jshrcPath, \`node ~/projects/.shell.js\`);

const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);
`
,
          "package.json": `{
            "name": "project-sandbox",
            "stackblitz": {
              "startCommand": "npm run test && source ~/.jshrc"
            }, 
            "scripts": {
              "test": "node tests.test",
              "start": "node tests.test && servor",
                          },
            "dependencies": {
              "cheerio": "^1.0.0",
              "htmlhint": "^1.1.4",
              "servor": "^4.0.2",
              "express": "^4.18.2"
            }
          }`,
        };
      case "mern":
        return {
          "server.js": "const express = require('express');\nconst app = express();\napp.listen(3000, () => console.log('Server running'));",
          "client/index.html": "<!DOCTYPE html><html><head><title>MERN Project</title></head><body><div id='root'></div><script src='index.js'></script></body></html>",
          "client/index.js": "import React from 'react';\nimport ReactDOM from 'react-dom';\nReactDOM.render(<h1>Hello, MERN!</h1>, document.getElementById('root'));",
          "package.json": `{
            "name": "mern-sandbox",
            "stackblitz": {
    "startCommand": "npm run test && source ~/.jshrc"
  }, "scripts": {
              "start": "node server.js",
              "test": "echo 'Tests for MERN project'",
                          },
            "dependencies": {
              "express": "^4.18.2",
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "servor": "^4.0.2"
            }
          }`,
        };
      case "nextjs":
        return {
          "pages/index.js": "export default function Home() { return <div>Welcome to Next.js</div>; }",
          "package.json": `{
            "name": "nextjs-sandbox",
            "stackblitz": {
    "startCommand": "npm run test && source ~/.jshrc"
  }, "scripts": {
              "dev": "next dev",
              "build": "next build",
              "start": "next start",
              "test": "echo 'Tests for Next.js project'"
            },
            "dependencies": {
              "next": "^14.0.0",
              "react": "^18.2.0",
              "react-dom": "^18.2.0"
            }
          }`,
        };
      case "python":
        return {
          "main.py": "print('Hello, Python Project!')",
          "requirements.txt": "",
          "tests.py": "print('Tests for Python project')",
        };
      default:
        return {};
    }
  };

  const files = getFilesForProjectType(projectType);
  const filesOpened =
    projectType === "mern"
      ? "server.js"
      : projectType === "nextjs"
        ? "pages/index.js"
        : projectType === "python"
          ? "main.py"
          : "index.html";

  useEffect(() => {
    setStartTime(Date.now());
    const storedAttempts = localStorage.getItem(`attempts-${selectedProject}`);
    if (storedAttempts) setAttempts(parseInt(storedAttempts));
  }, [selectedProject]);

  const showInstructions = () => {
    instructionRef.current.classList.remove("hidden");
    overlayRef.current.classList.remove("hidden");
  };

  const hideInstructions = () => {
    instructionRef.current.classList.add("hidden");
    overlayRef.current.classList.add("hidden");
  };

  const handleSandboxLoad = () => {
    setSandboxLoaded(true);
  };

  const handleLevelChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    setSidebarContent(event);
    setSelectedProject(menuItems[0]?.label || "");
    onMenuItemClick(menuItems[0]?.task || "");
  };

  const handleProjectChange = (event) => {
    const projectLabel = event.target.value;
    setSelectedProject(projectLabel);
    const selectedItem = menuItems.find((item) => item.label === projectLabel);
    if (selectedItem) {
      onMenuItemClick(selectedItem.task);
    }
  };

  const handleSubmit = async () => {
    setAttempts(attempts + 1);
    localStorage.setItem(`attempts-${selectedProject}`, attempts + 1);

    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;

    const correctness = Math.random() > 0.5 ? 1 : 0;
    const finalPoint =
      correctness * 0.5 + (1 - attempts / 10) + executionTime * 0.1;

    setResult(finalPoint);

    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: selectedProject,
        finalPoint,
        attempts,
        executionTime,
        projectType,
      }),
    });
  };

  const sandboxElement = useMemo(() => {
    if (files && filesOpened) {
      return (
        <Sandbox
          fileToOpen={filesOpened}
          filesObj={files}
          onLoad={handleSandboxLoad}
        />
      );
    }
    return null;
  }, [files, filesOpened]);

  return (
    <div className="relative">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-opacity-70 backdrop-blur-sm hidden"
      />

      {/* Instructions */}
      <div
        ref={instructionRef}
        className="fixed top-35 left-1/2 transform -translate-x-1/2 w-auto max-w-2xl bg-white shadow-lg rounded-lg p-6 border hidden"
      >
        <h1 className="text-xl font-bold text-blue-600 mb-4 whitespace-pre-wrap">
          <ReactMarkdown>{task}</ReactMarkdown>
        </h1>
        <h2 className="text-md font-semibold mb-2">
          Welcome! Please follow the instructions below to complete and test your work.
        </h2>

        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4">
          <li>Open the terminal.</li>
          <li>
            Run:
            <pre className="bg-gray-100 p-2 mt-1 rounded text-xs">
              <code>{projectType === "python" ? "python tests.py" : "npm run test"}</code>
            </pre>
          </li>
          <li>You must pass the tests before submitting.</li>
        </ol>

        <blockquote className="border-l-4 border-yellow-400 pl-4 text-yellow-800 text-sm mb-3">
          ⚠️ If a command is already running, press <kbd>Ctrl + C</kbd> to cancel.
        </blockquote>

        <h3 className="font-semibold text-sm mt-3 mb-1">🛠 Having Trouble?</h3>
        <pre className="bg-gray-100 p-2 rounded text-xs mb-3">
          <code>{projectType === "python" ? "python main.py" : "npm run start"}</code>
        </pre>

        <p className="text-sm mb-1">
          Only edit <code>{filesOpened}</code>.
        </p>
        <p className="text-sm mb-4">
          Close this box after reading the instructions.
        </p>

        <button
          onClick={hideInstructions}
          className="mt-2 px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Instructions
        </button>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between items-center py-5 pl-3 pr-1 relative z-10">
        <div className="flex space-x-3 items-center">
          {/* Difficulty Selector */}
          <div className="flex space-x-3" role="radiogroup" aria-label="Select Difficulty">
            {["Basic", "intermediate", "hard"].map((level) => {
              const isSelected = selectedLevel === level;
              const baseColor =
                level === "Basic"
                  ? "bg-blue-500 hover:bg-blue-600 ring-blue-300"
                  : level === "intermediate"
                    ? "bg-green-500 hover:bg-green-600 ring-green-300"
                    : "bg-red-500 hover:bg-red-600 ring-red-300";

              return (
                <label key={level}>
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    className="sr-only peer"
                    onChange={handleLevelChange}
                    checked={isSelected}
                  />
                  <div
                    className={`
                      flex items-center justify-center px-4 py-2 rounded text-white cursor-pointer transition-all
                      ${baseColor}
                      ${isSelected ? "ring-4 scale-105 shadow-md" : ""}
                    `}
                  >
                    <span className="capitalize">{level}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Project Selector Dropdown */}
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="px-2 py-2 rounded text-black bg-gray-200 hover:bg-gray-300"
          >
            {menuItems.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={showInstructions}
            className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Instructions
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pr-2">
        <div className="w-full">
          <h1 className="text-xl font-bold mb-4 pl-3">{projectType.toUpperCase()} Project Sandbox</h1>
          <div className="h-[400px]">{sandboxElement}</div>
        </div>
      </div>

      {result !== null && (
        <div className="mt-4 px-2">
          Result: {result.toFixed(2)} (Attempts: {attempts})
        </div>
      )}
    </div>
  );
}
