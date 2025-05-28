import { FaWindowMaximize, FaShieldAlt, FaCode } from "react-icons/fa";

const pythonAdvancedProjects = [
  {
    label: "1. Machine Learning Model",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    task: `**Task:** Build a simple machine learning model in Python using scikit-learn to predict house prices based on a dataset.`,
  },
  {
    label: "2. Automated Email Sender",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Create a Python script to send automated emails using smtplib. Allow scheduling emails and attaching files.`,
  },
  {
    label: "3. Chatbot with NLP",
    icon: <FaCode className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a chatbot in Python using NLTK or spaCy for natural language processing. Implement basic conversation capabilities.`,
  },
];

export default pythonAdvancedProjects;