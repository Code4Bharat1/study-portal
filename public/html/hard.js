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

const htmlPracticeMenu = [
  {
    label: "1. Microdata",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1"),
  },
  {
    label: "2. Form Validation",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2"),
  },
  {
    label: "3. Multimedia Tracks",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3"),
  },
  {
    label: "4. Off-Canvas Nav",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4"),
  },
  {
    label: "5. SEO Metadata",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5"),
  },
  {
    label: "6. ARIA Advanced",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6"),
  },
  {
    label: "7. Secure Iframes",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7"),
  },
  {
    label: "8. Datalist Auto",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8"),
  },
  {
    label: "9. Picture Element",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9"),
  },
  {
    label: "10. Constraint API",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10"),
  },
];

export default htmlPracticeMenu;
