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
        const response = await fetch(`/exercise/css/${level}/tests.js`);
        const testContent = response.ok ? await response.text() : '// Test file not found';
        
        return {
            'style.css': `/* CSS Exercise Workspace
Write your CSS code here */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}

/* Complete the exercise requirements below: */

`,
            'tests.js': testContent
        };
    } catch (error) {
        console.error("Error loading exercise files:", error);
        return {
            'style.css': '/* Write your CSS code here */\nbody { font-family: Arial, sans-serif; }',
            'tests.js': '// Test file not available'
        };
    }
};

const basicMenu = [
    {
        label: "1. CSS Selectors and Properties",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Learn basic CSS selectors and apply fundamental styling properties.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/1");
            return { files };
        },
    },
    {
        label: "2. Colors and Typography",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Style text with colors, fonts, and typography properties.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/2");
            return { files };
        },
    },
    {
        label: "3. Box Model",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Understand and apply margin, padding, border, and content properties.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/3");
            return { files };
        },
    },
    {
        label: "4. Layout with Display",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Use display properties to control element layout behavior.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/4");
            return { files };
        },
    },
    {
        label: "5. Positioning Elements",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Position elements using static, relative, absolute, and fixed positioning.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/5");
            return { files };
        },
    },
    {
        label: "6. Backgrounds and Borders",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Apply background images, colors, and border styles to elements.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/6");
            return { files };
        },
    },
    {
        label: "7. Basic Responsive Design",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Create responsive layouts using media queries and flexible units.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/7");
            return { files };
        },
    },
    {
        label: "8. CSS Pseudo-classes",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Use pseudo-classes like :hover, :focus, and :nth-child for interactive styling.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/8");
            return { files };
        },
    },
    {
        label: "9. CSS Units and Values",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Work with different CSS units: px, em, rem, %, vh, vw.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/9");
            return { files };
        },
    },
    {
        label: "10. CSS Inheritance",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Understand CSS inheritance and specificity rules.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/10");
            return { files };
        },
    },
];

const intermediateMenu = [
    {
        label: "1. Flexbox Layout",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Master flexbox for one-dimensional layouts and alignment.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/1");
            return { files };
        },
    },
    {
        label: "2. CSS Grid Layout",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Create complex two-dimensional layouts using CSS Grid.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/2");
            return { files };
        },
    },
    {
        label: "3. CSS Animations",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Create smooth animations using keyframes and transitions.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/3");
            return { files };
        },
    },
    {
        label: "4. CSS Transforms",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Apply 2D and 3D transformations to elements.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/4");
            return { files };
        },
    },
    {
        label: "5. Advanced Selectors",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Use complex selectors including attribute selectors and combinators.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/5");
            return { files };
        },
    },
];

const hardMenu = [
    {
        label: "1. Advanced CSS Grid",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Master complex grid layouts with subgrid and advanced techniques.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/1");
            return { files };
        },
    },
    {
        label: "2. CSS Houdini and Paint API",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Explore CSS Houdini for custom paint worklets and properties.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/2");
            return { files };
        },
    },
    {
        label: "3. Advanced Animations",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Create complex animations with timing functions and orchestration.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/3");
            return { files };
        },
    },
    {
        label: "4. CSS Container Queries",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Implement container queries for component-based responsive design.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/4");
            return { files };
        },
    },
    {
        label: "5. Modern CSS Features",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Use cutting-edge CSS features like :has(), cascade layers, and logical properties.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/5");
            return { files };
        },
    },
];

const sandboxFiles = {
    'style.css': `/* CSS Exercise Workspace
Write your CSS code here */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}

/* Complete the exercise requirements below: */

`,
    'tests.js': '// Test file will be loaded based on selected exercise'
};

export default function CssExerciseMonacoPlatform() {
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
            filesOpened="style.css"
            setSidebarContent={setSidebarContent}
            title="CSS"
            language="css"
            task={task}
        />
    );
}