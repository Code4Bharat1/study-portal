"use client"

import { useState } from 'react';
import QuestionPlatform from '@/components/Exercise/Platform';

import sdk from "@stackblitz/sdk";

import {
  FaPlug,
  FaPlusSquare,
  FaList,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaSave,
  FaCodeBranch,
  FaSync,
  FaLayerGroup,
  FaCompressArrowsAlt,
  FaStream,
  FaRegCalendarAlt,
  FaCogs,
  FaCode,
  FaSort,
  FaBolt,
  FaBalanceScale,
  FaChartBar,
} from 'react-icons/fa';


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
  { label: "1. Init DB & Collection", icon: <FaPlug className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/1") },
  { label: "2. Insert One", icon: <FaPlusSquare className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/2") },
  { label: "3. Insert Many", icon: <FaList className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/3") },
  { label: "4. Find All", icon: <FaSearch className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/4") },
  { label: "5. Find Age > 30", icon: <FaFilter className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/5") },
  { label: "6. Update by Field", icon: <FaEdit className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/6") },
  { label: "7. Delete Inactive", icon: <FaTrash className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/7") },
  { label: "8. Find with $in", icon: <FaFilter className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/8") },
  { label: "9. Insert Array Field", icon: <FaSave className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/9") },
  { label: "10. Insert Nested Obj", icon: <FaCodeBranch className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/10") },
];


const intermediateMenu = [
  { label: "1. Update Many", icon: <FaSync className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/1") },
  { label: "2. Query with $or", icon: <FaLayerGroup className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/2") },
  { label: "3. Push to Array", icon: <FaCompressArrowsAlt className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/3") },
  { label: "4. Pull from Array", icon: <FaStream className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/4") },
  { label: "5. Query Date Range", icon: <FaRegCalendarAlt className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/5") },
  { label: "6. Use Index", icon: <FaCogs className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/6") },
  { label: "7. Count Docs", icon: <FaCode className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/7") },
  { label: "8. Sort Results", icon: <FaSort className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/8") },
  { label: "9. Limit & Skip", icon: <FaFilter className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/9") },
  { label: "10. Find Distinct", icon: <FaBolt className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("intermediate/10") },
];


const hardMenu = [
  { label: "1. Filter Nested Fields", icon: <FaLayerGroup className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/1") },
  { label: "2. Update Nested Fields", icon: <FaEdit className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/2") },
  { label: "3. Use Compound Filters", icon: <FaFilter className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/3") },
  { label: "4. Complex $and/$or", icon: <FaBalanceScale className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/4") },
  { label: "5. Soft Delete", icon: <FaTrash className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/5") },
  { label: "6. User Logs Pattern", icon: <FaChartBar className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/6") },
  { label: "7. Search in Arrays", icon: <FaSearch className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/7") },
  { label: "8. Regex Search", icon: <FaCode className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/8") },
  { label: "9. Bulk Write (Loop)", icon: <FaList className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/9") },
  { label: "10. Backup & Restore", icon: <FaSave className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("hard/10") },
];


const testContent = `
const fs = require('fs');
const path = require('path');
const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`

const packageJson = `{
  "name": "mongodb-exercise",
  "stackblitz": {
    "startCommand": "npm run test"
  },
  "scripts": {
    "execute": "node driver.js",
    "test": "node tests.test"
  },
  "dependencies": {
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "eslint": "^9.25.0",
    "globals": "^16.0.0"
  }
}`

const driverJS = `// driver.js

const fs = require('fs');
const path = require('path');
const { Db } = require('tingodb')();

// Setup TingoDB
const dbPath = path.join(__dirname, 'data');
const db = new Db(dbPath, {});

const code = fs.readFileSync('./script.js', 'utf8');

const run = new Function('db', code);
run(db);

`
const sandboxFiles = {
    'script.js': '',
    'tests.test': testContent,
    'driver.js': driverJS,
    'package.json': packageJson,
    'data/creatFolder.txt': 'Folder Created'
}
const sandboxFilesOpened = "script.js"

export default function MongodDBExercisePlatform() {
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

