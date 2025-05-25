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

const jsPracticeMenu = [
  {
    label: "Async Files",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/1"),
  },
  {
    label: "ES Modules",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/2"),
  },
  {
    label: "REST API",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/3"),
  },
  {
    label: "Middleware",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/4"),
  },
  {
    label: "DB Integration",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/5"),
  },
  {
    label: "Auth Basics",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/6"),
  },
  {
    label: "Event Emitters",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/7"),
  },
  {
    label: "Error Handling",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/8"),
  },
  {
    label: "Streams",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/9"),
  },
  {
    label: "Unit Testing",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("intermediate/10"),
  },
];
