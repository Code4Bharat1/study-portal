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

        const response = await fetch(`/projects/nextjs/${level}/tests.js`);
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

const intermediateMenu = [
  {
    label: "1. Dynamic Blog with API",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a dynamic blog using Next.js with API routes to fetch blog posts from a mock API. Use SSG and ISR for rendering.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "2. E-Commerce Cart Page",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create an e-commerce cart page in Next.js with client-side state management. Use Tailwind CSS for styling and add API routes for product data.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "3. User Profile with Authentication",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a user profile page in Next.js with authentication using NextAuth.js. Fetch user data from an API and display it securely.`,
    onClick: (e) => handleOnChange("basic/2")},
];

const basicMenu = [
  {
    label: "1. Static Portfolio",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a static portfolio site using Next.js with a home page, about page, and contact page. Use CSS modules for styling.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "2. Blog with Static Generation",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Build a blog using Next.js with static generation. Create pages for blog posts and style them with CSS.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "3. Task Tracker",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Create a task tracker app in Next.js. Use client-side state to add and remove tasks, and style with Tailwind CSS.`,
    onClick: (e) => handleOnChange("basic/2")},
];

const hardMenu = [
  {
    label: "1. Full-Stack Dashboard",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    task: `**Task:** Build a full-stack dashboard in Next.js with API routes, user authentication, and dynamic data fetching. Use Tailwind CSS for styling.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "2. Real-Time Collaboration App",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a real-time collaboration app in Next.js using WebSockets. Implement features like shared document editing and user presence.`,
    onClick: (e) => handleOnChange("basic/2")},
  {
    label: "3. Advanced E-Commerce Platform",
    icon: <FaCode className="inline mr-2 text-xl" />,
    task: `**Task:** Develop an advanced e-commerce platform in Next.js with payment integration (e.g., Stripe), product search, and user reviews.`,
    onClick: (e) => handleOnChange("basic/2")},
];

const sandboxFiles = {
        "pages/index.js": "export default function Home() { return <div>Welcome to Next.js</div>; }",
        "package.json": `{
        "name": "nextjs-sandbox",
        "stackblitz": {
            "startCommand": "node tests.test && source ~/.jshrc",
            "installDependencies": false
        },
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start"
        },
        "dependencies": {
            "next": "^14.0.0",
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
        }
    }`
}

const sandboxFilesOpened = "pages/index.js"

export default function NextJsProjectPlatform() {
    const [menu, setMenu] = useState(basicMenu);
    const [task, setTask] = useState(menu[0].task)

    const setSidebarContent = (event) => {
        const value = event.target.value;
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
            title={"Next.js"}
            hideExplorer={0}
        />
    );
}
