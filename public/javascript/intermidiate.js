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

const intermediateMenu = [
  {
    label: "1. Closures & Scope",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. Higher-Order Funcs",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Array Methods",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Promises & Async",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. OOP Basics",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Event Delegation",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Modules & Imports",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Regular Expressions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. Custom Error Handling",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. DOM Datasets",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

export default intermediateMenu;
