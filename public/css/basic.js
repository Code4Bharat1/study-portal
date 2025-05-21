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
    onClick: (e) => handleOnChange("css-basic/1/selectors"),
  },
  {
    label: "2. Box Model",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/2/box-model"),
  },
  {
    label: "3. Colors and Backgrounds",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/3/colors-backgrounds"),
  },
  {
    label: "4. Typography",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/4/typography"),
  },
  {
    label: "5. Flexbox",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/5/flexbox"),
  },
  {
    label: "6. CSS Positioning",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/6/positioning"),
  },
  {
    label: "7. Pseudo-Classes and Elements",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/7/pseudo-classes"),
  },
  {
    label: "8. CSS Transitions",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/8/transitions"),
  },
  {
    label: "9. Responsive Design",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/9/responsive-design"),
  },
  {
    label: "10. CSS Variables",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("css-basic/10/variables"),
  },
];

export default cssPracticeMenu;