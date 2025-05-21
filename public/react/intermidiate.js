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
    label: "1. useEffect for Side Effects",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/1/useeffect-side-effects"),
  },
  {
    label: "2. Context API",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/2/context-api"),
  },
  {
    label: "3. useReducer Hook",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/3/usereducer"),
  },
  {
    label: "4. Custom Hooks",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/4/custom-hooks"),
  },
  {
    label: "5. React Router Basics",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/5/react-router"),
  },
  {
    label: "6. Error Boundaries",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/6/error-boundaries"),
  },
  {
    label: "7. Performance Optimization",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/7/performance-optimization"),
  },
  {
    label: "8. Portals",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/8/portals"),
  },
  {
    label: "9. Refs and useRef",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/9/useref"),
  },
  {
    label: "10. Testing React Components",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-intermediate/10/testing-components"),
  },
];

export default reactPracticeMenu;