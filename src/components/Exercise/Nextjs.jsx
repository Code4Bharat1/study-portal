"use client";

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
  FaCodeBranch,
  FaFolderOpen,
  FaBug,
  FaDatabase,
  FaUserShield,
  FaLock,
  FaSync,
  FaUserEdit,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import { useState } from "react";
import sdk from "@stackblitz/sdk";
import QuestionPlatform from "@/components/Exercise/Platform";

const handleOnChange = async (level) => {
  try {
    const container = document.getElementById("stackblitz-container");
    if (!container) throw new Error("Container element not found");

    const vm = await sdk.connect(container);
    console.log("Connected VM:", vm);

    const response = await fetch(`/exercise/nextjs/${level}/tests.js`);
    if (!response.ok) throw new Error("Failed to fetch test file");

    const testContent = await response.text();

    await vm.applyFsDiff({
      destroy: ["tests.test"],
      create: {
        "tests.test": testContent,
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
    label: "1. Intro",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/1"),
  },
  {
    label: "2. Pages & Routing",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/2"),
  },
  {
    label: "3. Static Generation",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/3"),
  },
  {
    label: "4. Server Rendering",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/4"),
  },
  {
    label: "5. API Routes",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/5"),
  },
  {
    label: "6. Dynamic Routes",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/6"),
  },
  {
    label: "7. CSS",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/7"),
  },
  {
    label: "8. Image Opt.",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/8"),
  },
  {
    label: "9. Env Variables",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/9"),
  },
  {
    label: "10. Deployment",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/10"),
  },
];

const intermediateMenu = [
  {
    label: "1. Dynamic API Routes",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/1"),
  },
  {
    label: "2. API Route Middleware",
    icon: <FaFolderOpen className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/2"),
  },
  {
    label: "3. API Error Handling",
    icon: <FaBug className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/3"),
  },
  {
    label: "4. SWR Fetching",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/4"),
  },
  {
    label: "5. ServerSideProps",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Auth Middleware",
    icon: <FaUserShield className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Env Variables",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/7"),
  },
  {
    label: "8. ISR",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/8"),
  },
  {
    label: "9. File Upload API",
    icon: <FaUserEdit className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/9"),
  },
  {
    label: "10. Email API",
    icon: <FaEnvelopeOpenText className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/10"),
  },
];

const advancedMenu = [
  {
    label: "1. App Router",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/1"),
  },
  {
    label: "2. Advanced Auth",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/2"),
  },
  {
    label: "3. WebSockets",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/3"),
  },
  {
    label: "4. Serverless",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/4"),
  },
  {
    label: "5. Caching",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/5"),
  },
  {
    label: "6. Micro-Frontends",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/6"),
  },
  {
    label: "7. Error Handling",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/7"),
  },
  {
    label: "8. PWAs",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/8"),
  },
  {
    label: "9. GraphQL",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/9"),
  },
  {
    label: "10. Playwright",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/10"),
  },
];

const testContent = `
const fs = require('fs');
const path = require('path');
const testsFile = path.join(__dirname, 'web-c.done');
fs.writeFileSync(testsFile, "WebContainer Booted", null, 2);`;

const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
`;

const packageJson = `{
  "name": "nextjs-exercise",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "node tests.test"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "eslint-config-next": "14.0.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}`;

const homePage = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Next.js Exercise</h1>
      </div>
    </main>
  )
}
`;

const sandboxFiles = {
  "app/page.jsx": homePage,
  "tests.test": testContent,
  "next.config.js": nextConfig,
  "package.json": packageJson,
};

const sandboxFilesOpened = "app/page.jsx";

export default function NextJSExercisePlatform() {
  const [menu, setMenu] = useState(basicMenu);
  const [task, setTask] = useState(menu[0].task);

  const setSidebarContent = (event) => {
    const value = event.target.value.toLowerCase();
    switch (value) {
      case "basic":
        setMenu(basicMenu);
        break;
      case "intermediate":
        setMenu(intermediateMenu);
        break;
      case "advanced":
        setMenu(advancedMenu);
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
