"use client"

import {
    FaCode,
    FaCheckSquare,
    FaVolumeUp,
    FaBars,
    FaSearch,
    FaUniversalAccess,
    FaWindowMaximize,
    FaList,
    FaImage,
    FaShieldAlt,
} from "react-icons/fa";

import { useState } from "react";
import MonacoTestPlatform from "@/components/MonacoTestPlatform";

const loadExerciseFiles = async (level) => {
    try {
        const response = await fetch(`/exercise/javascript/${level}/tests.js`);
        const testContent = response.ok ? await response.text() : '// Test file not found';
        
        return {
            'script.js': '// Write your JavaScript code here\nconsole.log("Hello, JavaScript!");\n\n// Complete the exercise requirements below\n',
            'tests.js': testContent
        };
    } catch (error) {
        console.error("Error loading exercise files:", error);
        return {
            'script.js': '// Write your JavaScript code here\nconsole.log("Hello, JavaScript!");',
            'tests.js': '// Test file not available'
        };
    }
};

const basicMenu = [
    {
        label: "1. Variables and Data Types",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Create variables of different data types (string, number, boolean) and display them using console.log",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/1");
            return { files };
        },
    },
    {
        label: "2. Basic Arithmetic Operations",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Perform basic arithmetic operations (addition, subtraction, multiplication, division) and display results",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/2");
            return { files };
        },
    },
    {
        label: "3. Functions and Parameters",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Create functions with parameters and return values to solve given problems",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/3");
            return { files };
        },
    },
    {
        label: "4. Conditional Statements",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Use if, else if, and else statements to create conditional logic",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/4");
            return { files };
        },
    },
    {
        label: "5. Loops and Iteration",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Use for loops, while loops, and array iteration methods",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/5");
            return { files };
        },
    },
    {
        label: "6. Arrays and Basic Methods",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Work with arrays using push, pop, slice, and other basic array methods",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/6");
            return { files };
        },
    },
    {
        label: "7. DOM Manipulation Basics",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Select and manipulate DOM elements using getElementById and querySelector",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/7");
            return { files };
        },
    },
    {
        label: "8. Event Listeners",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Add event listeners to handle user interactions like clicks and form submissions",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/8");
            return { files };
        },
    },
    {
        label: "9. String Methods",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Use string methods like split, join, substring, and replace",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/9");
            return { files };
        },
    },
    {
        label: "10. Basic Error Handling",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Implement try-catch blocks to handle errors gracefully",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/10");
            return { files };
        },
    },
];

const intermediateMenu = [
    {
        label: "1. Closures and Scope",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Understand and implement closures and variable scope in JavaScript",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/1");
            return { files };
        },
    },
    {
        label: "2. Higher-Order Functions",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Create and use higher-order functions that accept or return other functions",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/2");
            return { files };
        },
    },
    {
        label: "3. Array Methods (Map, Filter, Reduce)",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Master functional array methods like map, filter, and reduce",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/3");
            return { files };
        },
    },
    {
        label: "4. Promises and Async",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Work with asynchronous JavaScript using Promises and async/await",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/4");
            return { files };
        },
    },
    {
        label: "5. Object-Oriented Programming",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Create classes, objects, and implement inheritance in JavaScript",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/5");
            return { files };
        },
    },
    {
        label: "6. Event Delegation",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Implement event delegation for efficient event handling",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/6");
            return { files };
        },
    },
    {
        label: "7. Modules and Imports",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Use ES6 modules with import and export statements",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/7");
            return { files };
        },
    },
    {
        label: "8. Regular Expressions",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Create and use regular expressions for pattern matching",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/8");
            return { files };
        },
    },
    {
        label: "9. Error Handling with Custom Errors",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Create custom error classes and implement advanced error handling",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/9");
            return { files };
        },
    },
    {
        label: "10. DOM Manipulation with Datasets",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Use data attributes and datasets for advanced DOM manipulation",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/10");
            return { files };
        },
    },
];

const hardMenu = [
    {
        label: "1. Advanced Closures and IIFEs",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Master advanced closure patterns and Immediately Invoked Function Expressions",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/1");
            return { files };
        },
    },
    {
        label: "2. Functional Programming Patterns",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Implement functional programming concepts like currying and composition",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/2");
            return { files };
        },
    },
    {
        label: "3. Advanced Array Manipulation",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Solve complex problems using advanced array manipulation techniques",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/3");
            return { files };
        },
    },
    {
        label: "4. Async Patterns and Concurrency",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Handle complex asynchronous patterns and concurrent operations",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/4");
            return { files };
        },
    },
    {
        label: "5. Design Patterns in JavaScript",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Implement common design patterns like Observer, Factory, and Singleton",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/5");
            return { files };
        },
    },
    {
        label: "6. Advanced Event Handling",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Create complex event handling systems with custom events",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/6");
            return { files };
        },
    },
    {
        label: "7. Module Bundling and Lazy Loading",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Implement dynamic imports and lazy loading strategies",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/7");
            return { files };
        },
    },
    {
        label: "8. Advanced Regular Expressions",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Master complex regex patterns with lookaheads and capturing groups",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/8");
            return { files };
        },
    },
    {
        label: "9. Error Handling and Debugging",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Implement comprehensive error handling and debugging strategies",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/9");
            return { files };
        },
    },
    {
        label: "10. Web APIs and Performance",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Use modern Web APIs and optimize JavaScript performance",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/10");
            return { files };
        },
    },
];

const sandboxFiles = {
    'script.js': '// Write your JavaScript code here\nconsole.log("Hello, JavaScript!");\n\n// Complete the exercise requirements below\n',
    'tests.js': '// Test file will be loaded based on selected exercise'
};

export default function JavaScriptMonacoExercisePlatform() {
    const [menu, setMenu] = useState(basicMenu);
    const [task, setTask] = useState(basicMenu[0].task);

    const setSidebarContent = (event) => {
        const value = event.target.value.toLowerCase();
        switch (value) {
            case 'basic':
                setMenu(basicMenu);
                setTask(basicMenu[0].task);
                break;
            case 'intermediate':
                setMenu(intermediateMenu);
                setTask(intermediateMenu[0].task);
                break;
            case 'hard':
                setMenu(hardMenu);
                setTask(hardMenu[0].task);
                break;
        }
    };

    return (
        <MonacoTestPlatform
            menuItems={menu}
            files={sandboxFiles}
            filesOpened="script.js"
            setSidebarContent={setSidebarContent}
            title="JavaScript"
            language="javascript"
            task={task}
        />
    );
}