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
    label: "1. Use Semantic HTML",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1/html-semantics"),
  },
  {
    label: "2. Advanced Form Inputs",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2/advanced-form-inputs"),
  },
  {
    label: "3. Embed Multimedia",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3/embed-multimedia"),
  },
  {
    label: "4. Create a Navigation Menu",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4/navigation-menu"),
  },
  {
    label: "5. Use Metadata",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5/html-metadata"),
  },
  {
    label: "6. Implement Accessibility (ARIA)",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6/html-aria"),
  },
  {
    label: "7. Use Inline Frames (iframe)",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7/html-iframe"),
  },
  {
    label: "8. Create Data Lists",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8/html-datalist"),
  },
  {
    label: "9. Use Figure and Caption",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9/html-figure"),
  },
  {
    label: "10. Build a Form with Validation",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10/form-validation"),
  },
];