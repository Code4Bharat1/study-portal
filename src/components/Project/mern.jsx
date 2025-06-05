"use client"
import { FaFileAlt, FaHeading, FaListUl, FaWindowMaximize, FaShieldAlt, FaCode } from "react-icons/fa";
import { useState } from "react";
import sdk from "@stackblitz/sdk"
import QuestionPlatform from "@/components/TestPlatform";


const handleOnChange = async (level) => {
    try {
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        const vm = await sdk.connect(container);
        console.log("Connected VM:", vm);

        const response = await fetch(`/projects/mern/${level}/tests.js`);
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

const eslintConfig = `import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React/JSX rules
      'react/jsx-uses-react': 'off', // Not needed with React 17+ (automatic runtime)
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General code quality rules
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];`

const packageJson = `{
  "name": "MERN Project",
  "version": "1.0.0",
  "description": "A full-stack CRUD application with TingoDB.",
  "stackblitz": {
    "startCommand": "node tests.test && source ~/.jshrc",
    "installDependencies": false
  },
  "dependencies": {
    "express": "^5.1.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tingodb": "^0.6.1"
  },
  "devDependencies": {
    "@babel/core": "^7.27.4",
    "@babel/parser": "^7.27.5",
    "@babel/preset-env": "^7.27.2",
    "@babel/preset-react": "^7.27.1",
    "@babel/register": "^7.27.1",
    "@babel/traverse": "^7.27.4",
    "@testing-library/react": "^16.3.0",
    "eslint": "^9.28.0",
    "jsdom": "^26.1.0",
    "supertest": "^7.1.1"
  },
  "babel": {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic"
        }
      ]
    ]
  }
}`  

const intermediateMenu =  [
  {
    label: "1. User Authentication System",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a user authentication system with Express, MongoDB, and React. Implement login, signup, and logout functionality with JWT authentication.`,
    onClick: ()=>handleOnChange('intermediate/1')
  },
  {
    label: "2. Real-Time Chat App",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create a real-time chat application using Express, MongoDB, React, and Socket.IO. Allow users to send and receive messages in real-time.`,
    onClick: ()=>handleOnChange('intermediate/2')
  },
  {
    label: "3. E-Commerce Product Listing",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Develop an e-commerce product listing page with Express and MongoDB to store products. Use React to display products with filtering and sorting.`,
    onClick: ()=>handleOnChange('intermediate/3')
  },
];

const basicMenu =  [
  {
    label: "1. Simple CRUD App",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a simple CRUD app with Express and MongoDB to manage a list of users. Use React for the frontend to display the list.`,
    onClick: ()=>handleOnChange('basic/1')
  },
  {
    label: "2. Blog Backend",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Build a blog backend with Express and MongoDB to store posts. Create a React frontend to fetch and display posts.`,
    onClick: ()=>handleOnChange('basic/2')
  },
  {
    label: "3. To-Do API",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Create a to-do API with Express and MongoDB. Build a React frontend to add and delete tasks.`,
    onClick: ()=>handleOnChange('basic/3')
  },
];

const hardMenu =  [
  {
    label: "1. Full-Stack Blog Platform",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    task: `**Task:** Create a full-stack blog platform with Express, MongoDB, and React. Implement user authentication, post creation, comments, and a rich text editor.`,
    onClick: ()=>handleOnChange('hard/1')

  },
  {
    label: "2. Social Media Dashboard",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a social media dashboard with Express, MongoDB, and React. Include features like user profiles, posts, likes, and notifications.`,
    onClick: ()=>handleOnChange('hard/2')

  },
  {
    label: "3. Task Management System",
    icon: <FaCode className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a task management system with Express, MongoDB, and React. Implement user authentication, task creation, assignment, and status tracking.`,
    onClick: ()=>handleOnChange('hard/3')

  },
];
const sandboxFiles = {
    'backend/index.js': '',
    'backend/Readme.md': 'Install dependencies with `npm install` inside this folder and run the server with `node index.js`.',
    'Readme.md': 'This is a MERN project. The backend is in the `backend` folder. You would have to Use `npm create vite@latest` to create a new React app, when prompted for project name, use `frontend`.',
    'package.json': packageJson,
    'eslint.config.js': eslintConfig
}

const sandboxFilesOpened = "server.js"

export default function MernProjectPlatform() {
    const [menu, setMenu] = useState(basicMenu);
    const [task, setTask] = useState(menu[0].task)

    const setSidebarContent = (event) => {
        const value = (event.target.value).toLowerCase();
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
            task={task}
            title={"MERN"}
            hideExplorer={false}
        />
    );
}
