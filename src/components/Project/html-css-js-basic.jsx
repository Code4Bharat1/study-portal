// components/Project/html-css-js-basic.js
import { FaFileAlt, FaHeading, FaParagraph, FaLink, FaImage, FaListUl, FaTable } from "react-icons/fa";

const basicProjects = [
  {
    label: "1. Personal Portfolio",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("basic/1", setAttempts, setResult),
    task: `**Task:** Create a personal portfolio page with a header, a section for your bio, and a footer. Use HTML for structure, CSS for styling (e.g., background color, fonts), and JS to add a "Contact Me" button that shows an alert.`,
  },
  {
    label: "2. Styled Blog Post",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("basic/2", setAttempts, setResult),
    task: `**Task:** Build a blog post page with a title, multiple headings, paragraphs, and an image. Style it using CSS (e.g., center the title, add margins). Use JS to toggle a "dark mode" theme.`,
  },
  {
    label: "3. Interactive To-Do List",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("basic/3", setAttempts, setResult),
    task: `**Task:** Create a to-do list with an unordered list. Style it with CSS (e.g., add borders, hover effects). Use JS to add and remove tasks dynamically.`,
  },
];

export default basicProjects;