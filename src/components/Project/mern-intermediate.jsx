import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const mernIntermediateProjects = [
  {
    label: "1. User Authentication System",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a user authentication system with Express, MongoDB, and React. Implement login, signup, and logout functionality with JWT authentication.`,
  },
  {
    label: "2. Real-Time Chat App",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create a real-time chat application using Express, MongoDB, React, and Socket.IO. Allow users to send and receive messages in real-time.`,
  },
  {
    label: "3. E-Commerce Product Listing",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Develop an e-commerce product listing page with Express and MongoDB to store products. Use React to display products with filtering and sorting.`,
  },
];

export default mernIntermediateProjects;