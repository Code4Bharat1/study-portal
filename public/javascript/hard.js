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
    label: "1. Closures & IIFEs",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1"),
  },
  {
    label: "2. Functional Patterns",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2"),
  },
  {
    label: "3. Array Manipulation",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3"),
  },
  {
    label: "4. Async & Concurrency",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4"),
  },
  {
    label: "5. Design Patterns",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5"),
  },
  {
    label: "6. Event Handling",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6"),
  },
  {
    label: "7. Modules & Lazy Load",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7"),
  },
  {
    label: "8. RegEx Advanced",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8"),
  },
  {
    label: "9. Error Handling",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9"),
  },
  {
    label: "10. Web APIs & Perf",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10"),
  },
];

export default jsPracticeMenu;
