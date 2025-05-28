import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const pythonBasicProjects = [
  {
    label: "1. Calculator",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a simple calculator in Python that can perform addition, subtraction, multiplication, and division.`,
  },
  {
    label: "2. File Reader",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Write a Python script to read a text file and count the number of words in it.`,
  },
  {
    label: "3. To-Do List CLI",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Build a command-line to-do list app in Python. Allow users to add, list, and delete tasks.`,
  },
];

export default pythonBasicProjects;