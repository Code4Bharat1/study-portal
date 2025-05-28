import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const pythonIntermediateProjects = [
  {
    label: "1. Web Scraper",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Write a Python script using BeautifulSoup to scrape data from a website (e.g., product prices) and save it to a CSV file.`,
  },
  {
    label: "2. File Organizer",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create a Python script to organize files in a directory by type (e.g., images, documents) into separate folders.`,
  },
  {
    label: "3. Weather CLI App",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Build a command-line weather app in Python using an API (e.g., OpenWeatherMap) to fetch and display weather data.`,
  },
];

export default pythonIntermediateProjects;