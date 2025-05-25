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
    label: "1. CSS Selectors",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/1"),
  },
  {
    label: "2. Box Model",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/2"),
  },
  {
    label: "3. Colors and Backgrounds",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/3"),
  },
  {
    label: "4. Typography",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/4"),
  },
  {
    label: "5. Flexbox",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/5"),
  },
  {
    label: "6. CSS Positioning",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/6"),
  },
  {
    label: "7. Pseudo-Classes and Elements",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/7"),
  },
  {
    label: "8. CSS Transitions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/8"),
  },
  {
    label: "9. Responsive Design",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/9"),
  },
  {
    label: "10. CSS Variables",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/10"),
  },
];

export default cssPracticeMenu;