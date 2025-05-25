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
    label: "1. App Router & Server Components",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/1"),
  },
  {
    label: "2. Advanced Auth Patterns",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/2"),
  },
  {
    label: "3. WebSocket Integration",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/3"),
  },
  {
    label: "4. Serverless Deployment",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/4"),
  },
  {
    label: "5. Caching Strategies",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/5"),
  },
  {
    label: "6. Micro-Frontends",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/6"),
  },
  {
    label: "7. Error Handling",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/7"),
  },
  {
    label: "8. Progressive Web Apps",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/8"),
  },
  {
    label: "9. GraphQL",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/9"),
  },
  {
    label: "10. Testing with Playwright",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/10"),
  },
];

export default nextjsPracticeMenu;
