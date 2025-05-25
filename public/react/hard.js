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

const reactPracticeMenu = [
  {
    label: "Redux Toolkit",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/1"),
  },
  {
    label: "Suspense",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/2"),
  },
  {
    label: "Concurrent Rendering",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/3"),
  },
  {
    label: "Custom Hooks",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/4"),
  },
  {
    label: "React Query",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/5"),
  },
  {
    label: "SSR",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/6"),
  },
  {
    label: "Fiber Architecture",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/7"),
  },
  {
    label: "Error Handling",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/8"),
  },
  {
    label: "Hooks Patterns",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/9"),
  },
  {
    label: "Unit Testing",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/10"),
  },
];

export default reactPracticeMenu;
