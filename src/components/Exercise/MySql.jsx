"use client"

import { useState } from "react";

import sdk from "@stackblitz/sdk"

import QuestionPlatform from "@/components/Exercise/Platform";

const handleOnChange = async (level) => {
    try {
        const container = document.getElementById("stackblitz-container");
        if (!container) throw new Error("Container element not found");

        const vm = await sdk.connect(container);
        console.log("Connected VM:", vm);

        const response = await fetch(`/exercise/mysql/${level}/tests.js`);
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

import {
  FaTable,
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSortAmountDown,
  FaFilter,
  FaDatabase,
  FaLink,
  FaColumns,
  FaTools,
  FaProjectDiagram,
  FaChartLine,
  FaCogs,
  FaSyncAlt,
  FaLock,
  FaRocket,
  FaFingerprint,
  FaCloud,
  FaSortAmountUp,
  FaExchangeAlt,
  FaUserCog,
  FaChartBar,
  FaLayerGroup,
  FaUserFriends,
} from "react-icons/fa";

const basicMenu = [
  {
    label: "Create table",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "Insert data",
    icon: <FaPlusCircle className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "Select all",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "Filter data",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "Update record",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "Delete record",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "Sort data",
    icon: <FaSortAmountDown className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "Limit results",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "Select columns",
    icon: <FaColumns className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "Join tables",
    icon: <FaLink className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

const intermediateMenu = [
  {
    label: "1. Group By",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. HAVING Filter",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Views",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Order By Multiple",
    icon: <FaSortAmountUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. Subqueries",
    icon: <FaExchangeAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Roles & Permissions",
    icon: <FaUserCog className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Transactions",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Aggregate Reports",
    icon: <FaChartBar className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. Complex JOINs",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. SELF JOIN",
    icon: <FaUserFriends className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

const hardMenu = [
  {
    label: "1. Query Optimization",
    icon: <FaTools className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/1"),
  },
  {
    label: "2. Recursive CTEs",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/2"),
  },
  {
    label: "3. Table Partitioning",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/3"),
  },
  {
    label: "4. Full-Text Search",
    icon: <FaChartLine className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/4"),
  },
  {
    label: "5. Stored Procedures",
    icon: <FaCogs className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/5"),
  },
  {
    label: "6. Window Functions",
    icon: <FaSyncAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/6"),
  },
  {
    label: "7. Data Encryption",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/7"),
  },
  {
    label: "8. Backup & Recovery",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/8"),
  },
  {
    label: "9. Audit Logging",
    icon: <FaFingerprint className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/9"),
  },
  {
    label: "10. Cloud Databases",
    icon: <FaCloud className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/10"),
  },
];


const testContent = `
const fs = require('fs');
const path = require('path');
const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`

const packageJson = `{
  "name": "sqlite-exercise",
  "stackblitz": {
    "startCommand": "npm run test"
  },
  "scripts": {
    "execute": "node driver.js",
    "test": "node tests.test"
  },
  "dependencies": {
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "eslint": "^9.25.0",
    "globals": "^16.0.0"
  }
}
`

const driverJS = `const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "data", "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite DB", err);
    process.exit(1);
  }
});

const code = fs.readFileSync("./script.js", "utf8");

(async () => {
  try {
    const run = new Function("db", "require", code);
    run(db, require);
  } catch (error) {
    console.error("Error executing script.js:", error);
  } finally {
    db.close();
  }
})();`

const sandboxFiles = {
    'script.js': '',
    'tests.test': testContent,
    'driver.js': driverJS,
    'package.json': packageJson,
    "data/database.sqlite": ""
}
const sandboxFilesOpened = "script.js"

export default function MysqlExercisePlatform() {
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

