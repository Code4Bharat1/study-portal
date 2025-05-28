import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const mernBasicProjects = [
  {
    label: "1. Simple CRUD App",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a simple CRUD app with Express and MongoDB to manage a list of users. Use React for the frontend to display the list.`,
  },
  {
    label: "2. Blog Backend",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Build a blog backend with Express and MongoDB to store posts. Create a React frontend to fetch and display posts.`,
  },
  {
    label: "3. To-Do API",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Create a to-do API with Express and MongoDB. Build a React frontend to add and delete tasks.`,
  },
];

export default mernBasicProjects;