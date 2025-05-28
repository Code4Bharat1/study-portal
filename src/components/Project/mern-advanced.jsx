import { FaWindowMaximize, FaShieldAlt, FaCode } from "react-icons/fa";

const mernAdvancedProjects = [
  {
    label: "1. Full-Stack Blog Platform",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    task: `**Task:** Create a full-stack blog platform with Express, MongoDB, and React. Implement user authentication, post creation, comments, and a rich text editor.`,
  },
  {
    label: "2. Social Media Dashboard",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a social media dashboard with Express, MongoDB, and React. Include features like user profiles, posts, likes, and notifications.`,
  },
  {
    label: "3. Task Management System",
    icon: <FaCode className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a task management system with Express, MongoDB, and React. Implement user authentication, task creation, assignment, and status tracking.`,
  },
];

export default mernAdvancedProjects;