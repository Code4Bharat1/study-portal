import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const nextJsBasicProjects = [
  {
    label: "1. Static Portfolio",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a static portfolio site using Next.js with a home page, about page, and contact page. Use CSS modules for styling.`,
  },
  {
    label: "2. Blog with Static Generation",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Build a blog using Next.js with static generation. Create pages for blog posts and style them with CSS.`,
  },
  {
    label: "3. Task Tracker",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Create a task tracker app in Next.js. Use client-side state to add and remove tasks, and style with Tailwind CSS.`,
  },
];

export default nextJsBasicProjects;