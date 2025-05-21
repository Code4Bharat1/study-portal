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
    label: "1. List Comprehensions",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/1/list-comprehensions"),
  },
  {
    label: "2. Lambda Functions",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/2/lambda-functions"),
  },
  {
    label: "3. Modules and Packages",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/3/modules-packages"),
  },
  {
    label: "4. Working with Sets",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/4/sets-operations"),
  },
  {
    label: "5. Advanced String Formatting",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/5/string-formatting"),
  },
  {
    label: "6. Decorators",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/6/decorators"),
  },
  {
    label: "7. Object-Oriented Programming",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/7/oop"),
  },
  {
    label: "8. Working with JSON",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/8/json-handling"),
  },
  {
    label: "9. Regular Expressions",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/9/regular-expressions"),
  },
  {
    label: "10. Unit Testing with unittest",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("python-intermediate/10/unit-testing"),
  },
];