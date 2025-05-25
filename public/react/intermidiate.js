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
    label: "useEffect",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/1"),
  },
  {
    label: "Context API",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/2"),
  },
  {
    label: "useReducer",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/3"),
  },
  {
    label: "Custom Hooks",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/4"),
  },
  {
    label: "React Router",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/5"),
  },
  {
    label: "Error Boundaries",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/6"),
  },
  {
    label: "Performance",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/7"),
  },
  {
    label: "Portals",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/8"),
  },
  {
    label: "Refs",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/9"),
  },
  {
    label: "Testing",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/10"),
  },
];

export default reactPracticeMenu;
