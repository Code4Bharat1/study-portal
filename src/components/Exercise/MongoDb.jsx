"use client"

import {
  FaDatabase,
  FaPlug,
  FaPlusSquare,
  FaSearch,
  FaEdit,
  FaTrash,
  FaFilter,
  FaCodeBranch,
  FaSave,
  FaList,
  FaCogs,
  FaLayerGroup,
  FaRocket,
  FaBalanceScale,
  FaProjectDiagram,
  FaBrain,
  FaChartBar,
  FaLock,
  FaCompress,
  FaSync,
  FaCompressArrowsAlt,
  FaStream,
  FaRegCalendarAlt,
  FaCode,
  FaWrench,
  FaUserFriends,
  FaBolt,
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

        const response = await fetch(`/exercise/mongodb/${level}/tests.js`);
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
    label: "1. Connect with Mongoose",
    icon: <FaPlug className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. Create User Model",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. Insert One User",
    icon: <FaPlusSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. Insert Many Users",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. Query Age > 30",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. Update Name by ID",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. Delete Inactive Users",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. Find Users in Cities",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Array Field Document",
    icon: <FaSave className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. Embedded Comments",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

const intermediateMenu = [
  {
    label: "1. Update Multiple Users",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. Model with Subdocument Arrays",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Query Using $or",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Add Item to Array ($push)",
    icon: <FaCompressArrowsAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. Remove Item from Array ($pull)",
    icon: <FaStream className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Query by Date Range",
    icon: <FaRegCalendarAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Custom Static Method",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Middleware: Hash Password",
    icon: <FaWrench className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. One-to-Many Relationship",
    icon: <FaUserFriends className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. Use populate()",
    icon: <FaBolt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

const hardMenu = [
  {
    label: "1. Multi-Collection Txns",
    icon: <FaBalanceScale className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1"),
  },
  {
    label: "2. Compound Indexes",
    icon: <FaCogs className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2"),
  },
  {
    label: "3. Geo $near Query",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3"),
  },
  {
    label: "4. Polymorphic Discriminators",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4"),
  },
  {
    label: "5. Refs & Embedded Docs",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5"),
  },
  {
    label: "6. Aggregate Comments & Ratings",
    icon: <FaChartBar className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6"),
  },
  {
    label: "7. $lookup Latest Orders",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7"),
  },
  {
    label: "8. Field-Level Encryption",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8"),
  },
  {
    label: "9. Change Streams",
    icon: <FaBrain className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9"),
  },
  {
    label: "10. Schema Optimization",
    icon: <FaCompress className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10"),
  },
];


const sandboxFiles = {
    'script.js': '', 'eslint.config.mjs': `import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
`, 'tests.test': `
const fs = require('fs');
const path = require('path');
const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`,
    'package.json': `{
  "name": "code4bharat-trybox",
  "scripts": {
    "test": "node tests.test",
    "start": "node tests.test && servor",
    "output": "node -e \\"console.clear(); console.log('To see output of Javascript: 👉  Open your browsers Developer Tools (F12 or Ctrl+Shift+I) and check the Console tab.')\\" servor"
  },
  "dependencies": {
    "eslint": "^9.27.0",
    "globals": "^16.1.0",
    "esprima": "^4.0.1",
    "servor": "^4.0.2"
  }
}

`}
const sandboxFilesOpened = "index.html"

export default function MongoDBExercisePlatform() {
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

