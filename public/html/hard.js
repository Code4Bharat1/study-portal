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
    label: "1. Microdata and Schema.org",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1/microdata-schema"),
  },
  {
    label: "2. Custom Form Validation",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2/custom-form-validation"),
  },
  {
    label: "3. Advanced Multimedia with Tracks",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3/multimedia-tracks"),
  },
  {
    label: "4. Responsive Navigation with Off-Canvas",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4/off-canvas-navigation"),
  },
  {
    label: "5. Advanced Metadata for SEO",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5/advanced-seo-metadata"),
  },
  {
    label: "6. Advanced ARIA for Dynamic Content",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6/advanced-aria"),
  },
  {
    label: "7. Secure Iframes with Sandbox",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7/secure-iframe-sandbox"),
  },
  {
    label: "8. Dynamic Data Lists with Autocomplete",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8/dynamic-datalist"),
  },
  {
    label: "9. Responsive Figures with Picture Element",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9/picture-element"),
  },
  {
    label: "10. Form Validation with Constraint API",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10/constraint-validation-api"),
  },
];