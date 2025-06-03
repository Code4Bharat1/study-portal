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

const intermediateMenu =  [
  {
    label: "1. User Authentication System",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a user authentication system with Express, MongoDB, and React. Implement login, signup, and logout functionality with JWT authentication.`,
    onClick: ()=>handleOnChange('basic/1')
  },
  {
    label: "2. Real-Time Chat App",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create a real-time chat application using Express, MongoDB, React, and Socket.IO. Allow users to send and receive messages in real-time.`,
    onClick: ()=>handleOnChange('basic/2')
  },
  {
    label: "3. E-Commerce Product Listing",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Develop an e-commerce product listing page with Express and MongoDB to store products. Use React to display products with filtering and sorting.`,
    onClick: ()=>handleOnChange('basic/3')
  },
];

const basicMenu =  [
  {
    label: "1. Simple CRUD App",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a simple CRUD app with Express and MongoDB to manage a list of users. Use React for the frontend to display the list.`,
  },
  {
    label: "2. Blog Backend",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Build a blog backend with Express and MongoDB to store posts. Create a React frontend to fetch and display posts.`,
  },
  {
    label: "3. To-Do API",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Create a to-do API with Express and MongoDB. Build a React frontend to add and delete tasks.`,
  },
];

const hardMenu =  [
  {
    label: "1. Full-Stack Blog Platform",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    task: `**Task:** Create a full-stack blog platform with Express, MongoDB, and React. Implement user authentication, post creation, comments, and a rich text editor.`,
  },
  {
    label: "2. Social Media Dashboard",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a social media dashboard with Express, MongoDB, and React. Include features like user profiles, posts, likes, and notifications.`,
  },
  {
    label: "3. Task Management System",
    icon: <FaCode className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a task management system with Express, MongoDB, and React. Implement user authentication, task creation, assignment, and status tracking.`,
  },
];
const sandboxFiles = {
    "server.js": "const express = require('express');\nconst app = express();\napp.listen(3000, () => console.log('Server running'));",
    "client/index.html": "<!DOCTYPE html><html><head><title>MERN Project</title></head><body><div id='root'></div><script src='index.js'></script></body></html>",
        "client/index.js": "import React from 'react';\nimport ReactDOM from 'react-dom';\nReactDOM.render(<h1>Hello, MERN!</h1>, document.getElementById('root'));",
        "package.json": `{
        "name": "mern-sandbox",
        "stackblitz": {
            "startCommand": "node tests.test && source ~/.jshrc",
            "installDependencies": false
        },
        "dependencies": {
            "express": "^4.18.2",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "servor": "^4.0.2",
            "tingodb": "^0.6.1"
        }
    }`
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
