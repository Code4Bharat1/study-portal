"use client";
import ProjectPlatform from "@/components/Project/Platform";
import pythonBasicProjects from "@/components/Project/python-basic";
import { useState } from "react";

export default function PythonProjectPlatform() {
  const [menu, setMenu] = useState(pythonBasicProjects);
  const [currentTask, setCurrentTask] = useState(pythonBasicProjects[0]?.task || "");

  const setSidebarContent = (event) => {
    const value = event.target.value.toLowerCase();
    let newMenu;
    switch (value) {
      case "basic":
        newMenu = pythonBasicProjects;
        break;
      case "intermediate":
        newMenu = pythonBasicProjects; // Replace with pythonIntermediateProjects when available
        break;
      case "hard":
        newMenu = pythonBasicProjects; // Replace with pythonAdvancedProjects when available
        break;
      default:
        newMenu = pythonBasicProjects;
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
      projectType="python"
      task={currentTask}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}