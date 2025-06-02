"use client"

import {
  FaCodeBranch,
  FaFolderOpen,
  FaBug,
  FaShieldAlt,
  FaDatabase,
  FaUserShield,
  FaLock,
  FaSync,
  FaUserEdit,
  FaEnvelopeOpenText,
  FaProjectDiagram,
  FaServer,
  FaNetworkWired,
  FaBolt,
  FaSyncAlt,
  FaShieldVirus,
  FaRocket,
  FaCloudUploadAlt,
  FaRoute,
  FaPlusCircle,
  FaList,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTools,
  FaKey,
} from "react-icons/fa";


import { useState } from "react";

import sdk from "@stackblitz/sdk"

import QuestionPlatform from "@/components/Exercise/Platform";

const handleOnChange = async (level) => {
    try {
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        const vm = await sdk.connect(container);
        console.log("Connected VM:", vm);

        const response = await fetch(`/exercise/express/${level}/tests.js`);
        if (!response.ok) throw new Error("Failed to fetch test file");

        const testContent = await response.text();

        await vm.applyFsDiff({
            destroy: ['tests.test'],
            create: {
                'tests.test': testContent,
            },
        });

        const snapshot = await vm.getFsSnapshot();
        console.log("FS Snapshot:", snapshot);

    } catch (error) {
        console.error("Error during StackBlitz VM setup:", error);
    }

};

const basicMenu = [
  {
    label: "1. Setup Server",
    icon: <FaNetworkWired className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. GET Homepage",
    icon: <FaRoute className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. POST Data",
    icon: <FaPlusCircle className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. List Items",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. GET by ID",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. Update by ID",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. Delete by ID",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. Logger Middleware",
    icon: <FaTools className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Parse JSON",
    icon: <FaKey className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. 404 Handler",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10/"),
  },
];

const intermediateMenu = [
  {
    label: "1. Use Router",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. Custom Logger",
    icon: <FaFolderOpen className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Error Handler",
    icon: <FaBug className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Input Validation",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. MongoDB Setup",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. JWT Auth",
    icon: <FaUserShield className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Hash Passwords",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Patch User",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. Use `req.user`",
    icon: <FaUserEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. Send Email",
    icon: <FaEnvelopeOpenText className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

const hardMenu = [
  {
    label: "1. Rate Limiting",
    icon: <FaShieldVirus className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/1"),
  },
  {
    label: "2. API Versioning",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/2"),
  },
  {
    label: "3. Clustering",
    icon: <FaBolt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/3"),
  },
  {
    label: "4. OAuth2 Auth",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/4"),
  },
  {
    label: "5. Redis Caching",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/5"),
  },
  {
    label: "6. WebSockets",
    icon: <FaNetworkWired className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/6"),
  },
  {
    label: "7. AWS S3 Upload",
    icon: <FaCloudUploadAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/7"),
  },
  {
    label: "8. GraphQL Server",
    icon: <FaServer className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/8"),
  },
  {
    label: "9. Sentry Tracking",
    icon: <FaSyncAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/9"),
  },
  {
    label: "10. Helmet Security",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/10"),
  },
];


const sandboxFiles = {
    'index.js': '', 'eslint.config.mjs': `import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
`,'tests.test': `
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
    'package.json': `{
  "name": "code4bharat-trybox",
  "stackblitz": {
    "startCommand": "npm run test && source ~/.jshrc"
  }, "scripts": {
    "test": "node tests.test && source ~/.jshrc",
    "start": "node tests.test"},
  "dependencies": {
    "eslint": "^9.27.0",
    "globals": "^16.1.0",
    "esprima": "^4.0.1",
    "supertest": "^7.1.1",
    "express": "^5.1.0"
  }
}`}
const sandboxFilesOpened = "index.js"

export default function NodeJsExercisePlatform() {
    const [menu, setMenu] = useState(basicMenu);
    const [task, setTask] = useState(menu[0].task)

    const setSidebarContent = (event) => {
        const value = event.target.value.toLowerCase();
        switch (value) {
            case 'basic':
                setMenu(basicMenu);
                break;
            case 'intermediate':
                setMenu(intermediateMenu);
                break;
            case 'hard':
                setMenu(hardMenu);
                break;
        }
    };


    return (
        <QuestionPlatform
            menuItems={menu}
            files={sandboxFiles}
            filesOpened={sandboxFilesOpened}
            setSidebarContent={setSidebarContent}
        />
    );
}

