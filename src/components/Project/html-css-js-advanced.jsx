// components/Project/html-css-js-advanced.js
import { FaWindowMaximize, FaShieldAlt, FaCode } from "react-icons/fa";

const advancedProjects = [
  {
    label: "1. Single Page Application (SPA)",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("hard/1", setAttempts, setResult),
    task: `**Task:** Create an SPA with multiple "pages" (e.g., Home, About, Contact) using HTML. Style it with CSS (e.g., smooth transitions). Use JS to handle routing without reloading the page.`,
  },
  {
    label: "2. Secure Form with Validation",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("hard/2", setAttempts, setResult),
    task: `**Task:** Build a form with advanced validation (e.g., email, password strength). Use CSS for styling (e.g., error states). Use JS to validate and prevent XSS attacks.`,
  },
  {
    label: "3. Custom Dashboard",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("hard/3", setAttempts, setResult),
    task: `**Task:** Create a dashboard with a sidebar, charts, and a table. Use CSS Grid for layout. Use JS to fetch mock data (e.g., from a JSON file) and populate the dashboard.`,
  },
];

export default advancedProjects;