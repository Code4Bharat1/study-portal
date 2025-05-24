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

const basicMenu = [
  {
    label: "1. Variables and Data Types",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1/variables-data-types"),
  },
  {
    label: "2. Basic Arithmetic Operations",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2/arithmetic-operations"),
  },
  {
    label: "3. Functions and Parameters",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3/functions-parameters"),
  },
  {
    label: "4. Conditional Statements",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4/conditional-statements"),
  },
  {
    label: "5. Loops and Iteration",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5/loops-iteration"),
  },
  {
    label: "6. Arrays and Basic Methods",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6/arrays-methods"),
  },
  {
    label: "7. DOM Manipulation Basics",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7/dom-manipulation"),
  },
  {
    label: "8. Event Listeners",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8/event-listeners"),
  },
  {
    label: "9. String Methods",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9/string-methods"),
  },
  {
    label: "10. Basic Error Handling",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10/error-handling"),
  },
];