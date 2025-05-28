"use client";
import ProjectPlatform from "@/components/Project/Platform";
import nextJsBasicProjects from "@/components/Project/nextjs-basic";
import { useState } from "react";

export default function NextJsProjectPlatform() {
  const [menu, setMenu] = useState(nextJsBasicProjects);
  const [currentTask, setCurrentTask] = useState(nextJsBasicProjects[0]?.task || "");

  const setSidebarContent = (event) => {
    const value = event.target.value.toLowerCase();
    let newMenu;
    switch (value) {
      case "basic":
        newMenu = nextJsBasicProjects;
        break;
      case "intermediate":
        newMenu = nextJsBasicProjects; // Replace with nextJsIntermediateProjects when available
        break;
      case "hard":
        newMenu = nextJsBasicProjects; // Replace with nextJsAdvancedProjects when available
        break;
      default:
        newMenu = nextJsBasicProjects;
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
      projectType="nextjs"
      task={currentTask}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}