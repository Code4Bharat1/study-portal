// @/components/Project/html-css-js-basic.js
"use client"
import { FaFileAlt, FaHeading, FaListUl, FaTable, FaLink, FaImage, FaWindowMaximize, FaShieldAlt, FaCode } from "react-icons/fa";
import { useState } from "react";
import sdk from "@stackblitz/sdk"
import QuestionPlatform from "@/components/TestPlatform";

const handleOnChange = async (level) => {
    try {
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        const vm = await sdk.connect(container);
        console.log("Connected VM:", vm);

        const response = await fetch(`/projects/html-css-js/${level}/tests.js`);
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

const sandboxFiles = {
    "index.html": "<!DOCTYPE html><html><head><title>Project</title><link rel='stylesheet' href='styles.css'></head><body><script src='script.js'></script></body></html>",
    "styles.css": "",
    "script.js": "",
    'eslint.config.mjs': `import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
`,
    "package.json": `{
        "name": "project-sandbox",
        "stackblitz": {
            "startCommand": "node tests.test && source ~/.jshrc",
            "installDependencies": false
        },
        "dependencies": {
            "cheerio": "^1.0.0",
            "htmlhint": "^1.1.4",
            "servor": "^4.0.2",
            "express": "^4.18.2",
            "jsdom": "^26.1.0",
            "eslint": "^9.28.0"
        }
    }`
}

const sandboxFilesOpened = "index.html"


const basicMenu =  [
    {
        label: "1. Personal Portfolio",
        icon: <FaFileAlt className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("basic/1"),
        task: `**Task:** Create a personal portfolio page with a header, a section for your bio, and a footer. Use HTML for structure, CSS for styling (e.g., background color, fonts), and JS to add a "Contact Me" button that shows an alert.`,
    },
    {
        label: "2. Styled Blog Post",
        icon: <FaHeading className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("basic/2"),
        task: `**Task:** Build a blog post page with a title, multiple headings, paragraphs, and an image. Style it using CSS (e.g., center the title, add margins). Use JS to toggle a "dark mode" theme.`,
    },
    {
        label: "3. Interactive To-Do List",
        icon: <FaListUl className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("basic/3"),
        task: `**Task:** Create a to-do list with an unordered list. Style it with CSS (e.g., add borders, hover effects). Use JS to add and remove tasks dynamically.`,
    },
];

const intermediateMenu =  [
    {
        label: "1. Responsive Landing Page",
        icon: <FaLink className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("intermediate/1"),
        task: `**Task:** Build a responsive landing page with a navigation bar, hero section, and contact form. Use CSS Flexbox or Grid for layout and media queries for responsiveness. Add JS to validate the form.`,
    },
    {
        label: "2. Interactive Photo Gallery",
        icon: <FaImage className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("intermediate/2", setAttempts, setResult),
        task: `**Task:** Create a photo gallery with a grid of images. Style it with CSS (e.g., hover effects, transitions). Use JS to open a modal when an image is clicked.`,
    },
    {
        label: "3. Dynamic Data Table",
        icon: <FaTable className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("intermediate/3", setAttempts, setResult),
        task: `**Task:** Build a table to display user data (e.g., name, age, email). Style it with CSS (e.g., alternate row colors). Use JS to sort the table by age.`,
    },
];

const hardMenu =  [
    {
        label: "1. Single Page Application (SPA)",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("hard/1", setAttempts, setResult),
        task: `**Task:** Create an SPA with multiple "pages" (e.g., Home, About, Contact) using HTML. Style it with CSS (e.g., smooth transitions). Use JS to handle routing without reloading the page.`,
    },
    {
        label: "2. Secure Form with Validation",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("hard/2", setAttempts, setResult),
        task: `**Task:** Build a form with advanced validation (e.g., email, password strength). Use CSS for styling (e.g., error states). Use JS to validate and prevent XSS attacks.`,
    },
    {
        label: "3. Custom Dashboard",
        icon: <FaCode className="inline mr-2 text-xl" />,
        onClick: (e) => handleOnChange("hard/3", setAttempts, setResult),
        task: `**Task:** Create a dashboard with a sidebar, charts, and a table. Use CSS Grid for layout. Use JS to fetch mock data (e.g., from a JSON file) and populate the dashboard.`,
    },
];


export default function HtmlCssJsProjectPlatform() {
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
            title={"Html"}
            hideExplorer={false}
        />
    );
}