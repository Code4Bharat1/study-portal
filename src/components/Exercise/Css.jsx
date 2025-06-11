"use client"

import {
  FaCode,
  FaCheckSquare,
  FaVolumeUp,
  FaSearch,
  FaUniversalAccess,
  FaWindowMaximize,
  FaList,
  FaImage,
  FaShieldAlt,
  FaThLarge,
  FaAlignCenter,
  FaBars,
  FaImages,
  FaRegStickyNote,
  FaGripHorizontal,
  FaBolt,
  FaLayerGroup,
  FaPaintBrush,
  FaArrowsAlt,
  
} from "react-icons/fa";

import { useState } from "react";

import sdk from "@stackblitz/sdk"
import QuestionPlatform from "@/components/TestPlatform";

const handleOnChange = async (level) => {
    try {
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        const vm = await sdk.connect(container);
        console.log("Connected VM:", vm);

        const response = await fetch(`/exercise/css/${level}/tests.js`);
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
    label: "1. CSS Selectors",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. Box Model",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. Colors and Backgrounds",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. Typography",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. Flexbox",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. CSS Positioning",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. Pseudo-Classes and Elements",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. CSS Transitions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Responsive Design",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. CSS Variables",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];


// TODO: This list is probably not correct, due to some mistake.
const intermediateMenu = [
  {
    label: "1. Responsive Grid Layout",
    icon: <FaThLarge className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. Flexbox Centering",
    icon: <FaAlignCenter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Hoverable Navbar",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Card Shadow & Border Radius",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. Three Column Grid Layout",
    icon: <FaGripHorizontal className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. CSS Variable Progress Bar",
    icon: <FaBolt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Responsive Image Gallery",
    icon: <FaImages className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Tooltip on Hover",
    icon: <FaPaintBrush className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. Sticky Header",
    icon: <FaRegStickyNote className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. Animated Button Hover",
    icon: <FaArrowsAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];


const hardMenu = [
  {
    label: "1. Advanced CSS Grid",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1"),
  },
  {
    label: "2. Complex Animations",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2"),
  },
  {
    label: "3. SASS Advanced",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3"),
  },
  {
    label: "4. CSS Houdini",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4"),
  },
  {
    label: "5. Responsive Typography",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5"),
  },
  {
    label: "6. Advanced Pseudo-Elements",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6"),
  },
  {
    label: "7. CSS Scroll Snap",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7"),
  },
  {
    label: "8. Performance Optimization",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8"),
  },
  {
    label: "9. CSS Container Queries",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9"),
  },
  {
    label: "10. Accessibility in CSS",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10"),
  },
];


const sandboxFiles = {
    'index.html': '', 
    'package.json': `{
  "name": "code4bharat-trybox",
  "stackblitz": {
    "startCommand": "node tests.test && source ~/.jshrc",
"installDependencies": false
  },
  "dependencies": {
    "cheerio": "^1.0.0",
    "htmlhint": "^1.1.4",
    "servor": "^4.0.2",
    "jsdom": "^26.1.0",
    "stylelint": "^16.20.0"
  }
}`}
const sandboxFilesOpened = "index.html"

export default function CssExercisePlatform() {
    const [menu, setMenu] = useState(basicMenu);
    const [task, setTask] = useState(menu[0].task)

    const setSidebarContent = (event) => {
        const value = (event.target.value).toLowerCase().toLowerCase();
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
            title={"Css"}

        />
    );
}

