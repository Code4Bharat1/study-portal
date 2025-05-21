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
    label: "1. Advanced Closures and IIFEs",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1/advanced-closures-iifes"),
  },
  {
    label: "2. Functional Programming Patterns",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2/functional-programming"),
  },
  {
    label: "3. Advanced Array Manipulation",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3/advanced-array-manipulation"),
  },
  {
    label: "4. Async Patterns and Concurrency",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4/async-patterns-concurrency"),
  },
  {
    label: "5. Design Patterns in JavaScript",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5/design-patterns"),
  },
  {
    label: "6. Advanced Event Handling",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6/advanced-event-handling"),
  },
  {
    label: "7. Module Bundling and Lazy Loading",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7/module-bundling-lazy-loading"),
  },
  {
    label: "8. Advanced Regular Expressions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8/advanced-regular-expressions"),
  },
  {
    label: "9. Error Handling and Debugging",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9/error-handling-debugging"),
  },
  {
    label: "10. Web APIs and Performance",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10/web-apis-performance"),
  },
];