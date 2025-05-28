"use client";
import ProjectPlatform from "@/components/Project/Platform";
import htmlCssJsBasicProjects from "@/components/Project/html-css-js-basic";
import htmlCssJsIntermediateProjects from "@/components/Project/html-css-js-intermediate";
import htmlCssJsAdvancedProjects from "@/components/Project/html-css-js-advanced";
import { useState } from "react";

export default function HtmlCssJsProjectPlatform() {
  const [menu, setMenu] = useState(htmlCssJsBasicProjects);
  const [currentTask, setCurrentTask] = useState(htmlCssJsBasicProjects[0]?.task || "");

  const setSidebarContent = (event) => {
    const value = event.target.value.toLowerCase();
    let newMenu;
    switch (value) {
      case "basic":
        newMenu = htmlCssJsBasicProjects;
        break;
      case "intermediate":
        newMenu = htmlCssJsIntermediateProjects;
        break;
      case "hard":
        newMenu = htmlCssJsAdvancedProjects;
        break;
      default:
        newMenu = htmlCssJsBasicProjects;
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
      projectType="html-css-js"
      task={currentTask}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}