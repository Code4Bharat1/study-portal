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
        const response = await fetch(`/exercise/html/${level}/tests.js`);
        const testContent = response.ok ? await response.text() : '// Test file not found';
        
        return {
            'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Exercise</title>
</head>
<body>
    <h1>Welcome to HTML Programming!</h1>
    
    <!-- Complete the exercise requirements below: -->
    
</body>
</html>`,
            'tests.js': testContent
        };
    } catch (error) {
        console.error("Error loading exercise files:", error);
        return {
            'index.html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>HTML Exercise</title>\n</head>\n<body>\n    <h1>Hello, HTML!</h1>\n</body>\n</html>',
            'tests.js': '// Test file not available'
        };
    }
};

const basicMenu = [
    {
        label: "1. HTML Document Structure",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Create a basic HTML document with proper structure and DOCTYPE.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/1");
            return { files };
        },
    },
    {
        label: "2. Text Elements and Formatting",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Use headings, paragraphs, and text formatting elements.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/2");
            return { files };
        },
    },
    {
        label: "3. Links and Navigation",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Create links, anchors, and navigation menus.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/3");
            return { files };
        },
    },
    {
        label: "4. Images and Media",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Embed images, videos, and other media elements.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/4");
            return { files };
        },
    },
    {
        label: "5. Lists and Tables",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Create ordered lists, unordered lists, and data tables.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/5");
            return { files };
        },
    },
    {
        label: "6. Forms and Input Elements",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Build forms with various input types and validation.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/6");
            return { files };
        },
    },
    {
        label: "7. Semantic HTML Elements",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Use semantic elements like header, nav, main, section, article.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/7");
            return { files };
        },
    },
    {
        label: "8. HTML Attributes",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Work with HTML attributes like id, class, data attributes.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/8");
            return { files };
        },
    },
    {
        label: "9. Meta Tags and SEO",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Add meta tags for SEO and social media optimization.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/9");
            return { files };
        },
    },
    {
        label: "10. HTML Validation",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Create valid HTML that passes W3C validation standards.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/10");
            return { files };
        },
    },
];

const intermediateMenu = [
    {
        label: "1. Advanced Forms",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Create complex forms with validation and accessibility features.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/1");
            return { files };
        },
    },
    {
        label: "2. HTML5 APIs",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Use HTML5 APIs like Geolocation, Local Storage, and Canvas.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/2");
            return { files };
        },
    },
    {
        label: "3. Accessibility (ARIA)",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Implement ARIA attributes for better accessibility.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/3");
            return { files };
        },
    },
    {
        label: "4. Microdata and Schema",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Add structured data using microdata and Schema.org.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/4");
            return { files };
        },
    },
    {
        label: "5. Progressive Web Apps",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Create PWA manifest and service worker integration.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/5");
            return { files };
        },
    },
];

const hardMenu = [
    {
        label: "1. Web Components",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Create custom HTML elements using Web Components.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/1");
            return { files };
        },
    },
    {
        label: "2. Advanced Accessibility",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Implement complex accessibility patterns and screen reader support.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/2");
            return { files };
        },
    },
    {
        label: "3. Performance Optimization",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Optimize HTML for performance with lazy loading and preloading.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/3");
            return { files };
        },
    },
    {
        label: "4. Cross-browser Compatibility",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Ensure HTML works across different browsers and devices.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/4");
            return { files };
        },
    },
    {
        label: "5. HTML Email Templates",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Create HTML email templates that work across email clients.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/5");
            return { files };
        },
    },
];

const sandboxFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Exercise</title>
</head>
<body>
    <h1>Welcome to HTML Programming!</h1>
    
    <!-- Complete the exercise requirements below: -->
    
</body>
</html>`,
    'tests.js': '// Test file will be loaded based on selected exercise'
};

export default function HtmlExerciseMonacoPlatform() {
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
            filesOpened="index.html"
            setSidebarContent={setSidebarContent}
            title="HTML"
            language="html"
            task={task}
        />
    );
}