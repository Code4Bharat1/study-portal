import { FaFileAlt, FaHeading, FaListUl } from "react-icons/fa";

const nextJsIntermediateProjects = [
  {
    label: "1. Dynamic Blog with API",
    icon: <FaFileAlt className="inline mr-2 text-xl" />,
    task: `**Task:** Build a dynamic blog using Next.js with API routes to fetch blog posts from a mock API. Use SSG and ISR for rendering.`,
  },
  {
    label: "2. E-Commerce Cart Page",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    task: `**Task:** Create an e-commerce cart page in Next.js with client-side state management. Use Tailwind CSS for styling and add API routes for product data.`,
  },
  {
    label: "3. User Profile with Authentication",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    task: `**Task:** Develop a user profile page in Next.js with authentication using NextAuth.js. Fetch user data from an API and display it securely.`,
  },
];

export default nextJsIntermediateProjects;