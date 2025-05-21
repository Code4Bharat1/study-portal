import {
  FaCode,
  FaCheckSquare,
  FaVolumeUp,
  FaBars,
  FaSearch,
  FaUniversalAccess,
  FaWindowMaximize,
  FaList,
  FaImage,
  FaShieldAlt,
} from "react-icons/fa";

const nextjsPracticeMenu = [
  {
    label: "1. App Router and Server Components",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/1/app-router"),
  },
  {
    label: "2. Advanced Authentication Patterns",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/2/advanced-auth"),
  },
  {
    label: "3. WebSocket Integration",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/3/websockets"),
  },
  {
    label: "4. Serverless Deployment",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/4/serverless"),
  },
  {
    label: "5. Advanced Caching Strategies",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/5/caching"),
  },
  {
    label: "6. Micro-Frontends with Module Federation",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/6/micro-frontends"),
  },
  {
    label: "7. Advanced Error Handling",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/7/error-handling"),
  },
  {
    label: "8. Progressive Web Apps (PWA)",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/8/pwa"),
  },
  {
    label: "9. GraphQL with Next.js",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/9/graphql"),
  },
  {
    label: "10. Advanced Testing with Playwright",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-advanced/10/playwright"),
  },
];

export default nextjsPracticeMenu;