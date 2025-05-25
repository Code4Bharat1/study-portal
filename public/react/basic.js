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
    label: "JSX Intro",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/1"),
  },
  {
    label: "Components",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/2"),
  },
  {
    label: "Props & PropTypes",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/3"),
  },
  {
    label: "useState",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/4"),
  },
  {
    label: "Events",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/5"),
  },
  {
    label: "Conditional Rendering",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/6"),
  },
  {
    label: "Lists & Keys",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/7"),
  },
  {
    label: "Styling",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/8"),
  },
  {
    label: "Forms",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/9"),
  },
  {
    label: "useEffect",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/10"),
  },
];
