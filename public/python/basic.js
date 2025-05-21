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

const pythonPracticeMenu = [
  {
    label: "1. Variables and Data Types",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/1/variables-data-types"),
  },
  {
    label: "2. Basic Operators",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/2/basic-operators"),
  },
  {
    label: "3. Strings and String Methods",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/3/strings-methods"),
  },
  {
    label: "4. Lists and List Operations",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/4/lists-operations"),
  },
  {
    label: "5. Conditionals (if-else)",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/5/conditionals"),
  },
  {
    label: "6. Loops (for and while)",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/6/loops"),
  },
  {
    label: "7. Functions and Parameters",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/7/functions-parameters"),
  },
  {
    label: "8. Dictionaries and Key-Value Pairs",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/8/dictionaries"),
  },
  {
    label: "9. Basic File Input/Output",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/9/file-io"),
  },
  {
    label: "10. Exception Handling",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-basic/10/exception-handling"),
  },
];