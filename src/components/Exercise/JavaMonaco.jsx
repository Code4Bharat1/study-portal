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
        const response = await fetch(`/exercise/java/${level}/tests.js`);
        const testContent = response.ok ? await response.text() : '// Test file not found';
        
        return {
            'Main.java': `// Java Exercise Workspace
// Write your Java code here

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        
        // Complete the exercise requirements below:
        
    }
}`,
            'tests.js': testContent
        };
    } catch (error) {
        console.error("Error loading exercise files:", error);
        return {
            'Main.java': '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
            'tests.js': '// Test file not available'
        };
    }
};

const basicMenu = [
    {
        label: "1. Java Basics and Syntax",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Learn Java syntax, variables, and basic program structure.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/1");
            return { files };
        },
    },
    {
        label: "2. Data Types and Variables",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Work with Java primitive and reference data types.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/2");
            return { files };
        },
    },
    {
        label: "3. Control Structures",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Implement if-else statements, loops, and switch cases.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/3");
            return { files };
        },
    },
    {
        label: "4. Methods and Functions",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Create and use methods with parameters and return values.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/4");
            return { files };
        },
    },
    {
        label: "5. Arrays and Collections",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Work with arrays and basic collection classes.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/5");
            return { files };
        },
    },
    {
        label: "6. Object-Oriented Programming",
        icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
        task: "Create classes, objects, and understand encapsulation.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/6");
            return { files };
        },
    },
    {
        label: "7. Inheritance and Polymorphism",
        icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
        task: "Implement inheritance and polymorphism concepts.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/7");
            return { files };
        },
    },
    {
        label: "8. Exception Handling",
        icon: <FaList className="inline mr-2 text-xl" />,
        task: "Handle exceptions using try-catch-finally blocks.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/8");
            return { files };
        },
    },
    {
        label: "9. String Manipulation",
        icon: <FaImage className="inline mr-2 text-xl" />,
        task: "Work with String class and string manipulation methods.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/9");
            return { files };
        },
    },
    {
        label: "10. File I/O Operations",
        icon: <FaShieldAlt className="inline mr-2 text-xl" />,
        task: "Read from and write to files using Java I/O classes.",
        onClick: async () => {
            const files = await loadExerciseFiles("basic/10");
            return { files };
        },
    },
];

const intermediateMenu = [
    {
        label: "1. Advanced OOP Concepts",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Master abstract classes, interfaces, and design patterns.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/1");
            return { files };
        },
    },
    {
        label: "2. Collections Framework",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Use advanced collections like HashMap, TreeSet, and LinkedList.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/2");
            return { files };
        },
    },
    {
        label: "3. Generics and Type Safety",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Implement generics for type-safe programming.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/3");
            return { files };
        },
    },
    {
        label: "4. Multithreading",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Create and manage threads for concurrent programming.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/4");
            return { files };
        },
    },
    {
        label: "5. Lambda Expressions",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Use lambda expressions and functional programming concepts.",
        onClick: async () => {
            const files = await loadExerciseFiles("intermediate/5");
            return { files };
        },
    },
];

const hardMenu = [
    {
        label: "1. Advanced Concurrency",
        icon: <FaCode className="inline mr-2 text-xl" />,
        task: "Master advanced concurrency patterns and thread pools.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/1");
            return { files };
        },
    },
    {
        label: "2. JVM and Memory Management",
        icon: <FaCheckSquare className="inline mr-2 text-xl" />,
        task: "Understand JVM internals and memory optimization.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/2");
            return { files };
        },
    },
    {
        label: "3. Design Patterns",
        icon: <FaVolumeUp className="inline mr-2 text-xl" />,
        task: "Implement common design patterns in Java.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/3");
            return { files };
        },
    },
    {
        label: "4. Reflection and Annotations",
        icon: <FaBars className="inline mr-2 text-xl" />,
        task: "Use reflection API and create custom annotations.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/4");
            return { files };
        },
    },
    {
        label: "5. Performance Optimization",
        icon: <FaSearch className="inline mr-2 text-xl" />,
        task: "Optimize Java applications for performance and scalability.",
        onClick: async () => {
            const files = await loadExerciseFiles("hard/5");
            return { files };
        },
    },
];

const sandboxFiles = {
    'Main.java': `// Java Exercise Workspace
// Write your Java code here

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        
        // Complete the exercise requirements below:
        
    }
}`,
    'tests.js': '// Test file will be loaded based on selected exercise'
};

export default function JavaExerciseMonacoPlatform() {
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
            filesOpened="Main.java"
            setSidebarContent={setSidebarContent}
            title="Java"
            language="java"
            task={task}
        />
    );
}