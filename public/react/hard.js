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
    label: "1. Redux Toolkit",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/1/redux-toolkit"),
  },
  {
    label: "2. React Suspense",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/2/react-suspense"),
  },
  {
    label: "3. Concurrent Rendering",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/3/concurrent-rendering"),
  },
  {
    label: "4. Advanced Custom Hooks",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/4/advanced-custom-hooks"),
  },
  {
    label: "5. React Query",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/5/react-query"),
  },
  {
    label: "6. Server-Side Rendering",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/6/server-side-rendering"),
  },
  {
    label: "7. React Fiber Architecture",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/7/react-fiber"),
  },
  {
    label: "8. Advanced Error Handling",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/8/advanced-error-handling"),
  },
  {
    label: "9. React Hooks Patterns",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/9/hooks-patterns"),
  },
  {
    label: "10. Unit Testing with Mocks",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-advanced/10/unit-testing-mocks"),
  },
];

export default reactPracticeMenu;