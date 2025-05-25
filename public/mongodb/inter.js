import {
  FaSync,
  FaProjectDiagram,
  FaLayerGroup,
  FaCompressArrowsAlt,
  FaStream,
  FaRegCalendarAlt,
  FaCode,
  FaWrench,
  FaUserFriends,
  FaBolt,
} from "react-icons/fa";

const mongodbIntermediateMenu = [
  {
    label: "1. Update Multiple Users",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. Model with Subdocument Arrays",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Query Using $or",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Add Item to Array ($push)",
    icon: <FaCompressArrowsAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. Remove Item from Array ($pull)",
    icon: <FaStream className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Query by Date Range",
    icon: <FaRegCalendarAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Custom Static Method",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Middleware: Hash Password",
    icon: <FaWrench className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. One-to-Many Relationship",
    icon: <FaUserFriends className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. Use populate()",
    icon: <FaBolt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

export default mongodbIntermediateMenu;
