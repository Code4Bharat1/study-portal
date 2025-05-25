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

const cssPracticeMenu = [
  {
    label: "1. Advanced CSS Grid",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/1"),
  },
  {
    label: "2. Complex Animations",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/2"),
  },
  {
    label: "3. SASS Advanced",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/3"),
  },
  {
    label: "4. CSS Houdini",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/4"),
  },
  {
    label: "5. Responsive Typography",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/5"),
  },
  {
    label: "6. Advanced Pseudo-Elements",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/6"),
  },
  {
    label: "7. CSS Scroll Snap",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/7"),
  },
  {
    label: "8. Performance Optimization",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/8"),
  },
  {
    label: "9. CSS Container Queries",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/9"),
  },
  {
    label: "10. Accessibility in CSS",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/10"),
  },
];

export default cssPracticeMenu;