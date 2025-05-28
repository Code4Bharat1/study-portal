"use client";
import ProjectPlatform from "@/components/Project/Platform";
import mernBasicProjects from "@/components/Project/mern-basic";
import { useState } from "react";

export default function MernProjectPlatform() {
  const [menu, setMenu] = useState(mernBasicProjects);
  const [currentTask, setCurrentTask] = useState(mernBasicProjects[0]?.task || "");

  const setSidebarContent = (event) => {
    const value = event.target.value.toLowerCase();
    let newMenu;
    switch (value) {
      case "basic":
        newMenu = mernBasicProjects;
        break;
      case "intermediate":
        newMenu = mernBasicProjects; // Replace with mernIntermediateProjects when available
        break;
      case "hard":
        newMenu = mernBasicProjects; // Replace with mernAdvancedProjects when available
        break;
      default:
        newMenu = mernBasicProjects;
    }
    setMenu(newMenu);
    setCurrentTask(newMenu[0]?.task || "");
  };

  const handleMenuItemClick = (task) => {
    setCurrentTask(task);
  };

  return (
    <ProjectPlatform
      menuItems={menu}
      setSidebarContent={setSidebarContent}
      projectType="mern"
      task={currentTask}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}