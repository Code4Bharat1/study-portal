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
    label: "1. Closures and Scope",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1/closures-scope"),
  },
  {
    label: "2. Higher-Order Functions",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2/higher-order-functions"),
  },
  {
    label: "3. Array Methods (Map, Filter, Reduce)",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3/array-methods"),
  },
  {
    label: "4. Promises and Async/Await",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4/promises-async-await"),
  },
  {
    label: "5. Object-Oriented Programming",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5/object-oriented-programming"),
  },
  {
    label: "6. Event Delegation",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6/event-delegation"),
  },
  {
    label: "7. Modules and Imports",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7/modules-imports"),
  },
  {
    label: "8. Regular Expressions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8/regular-expressions"),
  },
  {
    label: "9. Error Handling with Custom Errors",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9/custom-error-handling"),
  },
  {
    label: "10. DOM Manipulation with Datasets",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10/dom-datasets"),
  },
];