// components/Project/html-css-js-intermediate.js
import { FaTable, FaLink, FaImage } from "react-icons/fa";

const intermediateProjects = [
  {
    label: "1. Responsive Landing Page",
    icon: <FaLink className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("intermediate/1", setAttempts, setResult),
    task: `**Task:** Build a responsive landing page with a navigation bar, hero section, and contact form. Use CSS Flexbox or Grid for layout and media queries for responsiveness. Add JS to validate the form.`,
  },
  {
    label: "2. Interactive Photo Gallery",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("intermediate/2", setAttempts, setResult),
    task: `**Task:** Create a photo gallery with a grid of images. Style it with CSS (e.g., hover effects, transitions). Use JS to open a modal when an image is clicked.`,
  },
  {
    label: "3. Dynamic Data Table",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e, setAttempts, setResult) => handleOnChange("intermediate/3", setAttempts, setResult),
    task: `**Task:** Build a table to display user data (e.g., name, age, email). Style it with CSS (e.g., alternate row colors). Use JS to sort the table by age.`,
  },
];

export default intermediateProjects;