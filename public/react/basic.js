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
    label: "1. Introduction to JSX",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/1/jsx-introduction"),
  },
  {
    label: "2. Creating Components",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/2/components"),
  },
  {
    label: "3. Props and PropTypes",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/3/props-proptypes"),
  },
  {
    label: "4. State with useState",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/4/usestate"),
  },
  {
    label: "5. Handling Events",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/5/events"),
  },
  {
    label: "6. Conditional Rendering",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/6/conditional-rendering"),
  },
  {
    label: "7. Lists and Keys",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/7/lists-keys"),
  },
  {
    label: "8. Basic Styling in React",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/8/styling"),
  },
  {
    label: "9. Forms in React",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/9/forms"),
  },
  {
    label: "10. Component Lifecycle (useEffect)",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("react-basic/10/useeffect"),
  },
];