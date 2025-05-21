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
    onClick: (e) => handleOnChange("css-advanced/1/advanced-grid"),
  },
  {
    label: "2. Complex Animations",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/2/complex-animations"),
  },
  {
    label: "3. SASS Advanced",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/3/advanced-sass"),
  },
  {
    label: "4. CSS Houdini",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/4/houdini"),
  },
  {
    label: "5. Responsive Typography",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/5/responsive-typography"),
  },
  {
    label: "6. Advanced Pseudo-Elements",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/6/advanced-pseudo"),
  },
  {
    label: "7. CSS Scroll Snap",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/7/scroll-snap"),
  },
  {
    label: "8. Performance Optimization",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/8/performance"),
  },
  {
    label: "9. CSS Container Queries",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/9/container-queries"),
  },
  {
    label: "10. Accessibility in CSS",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-advanced/10/accessibility"),
  },
];

export default cssPracticeMenu;