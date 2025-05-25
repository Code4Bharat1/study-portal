import {
  FaNetworkWired,
  FaRoute,
  FaPlusCircle,
  FaList,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTools,
  FaKey,
  FaShieldAlt,
} from "react-icons/fa";

const expressBasicMenu = [
  {
    label: "1. Setup Server",
    icon: <FaNetworkWired className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/1"),
  },
  {
    label: "2. GET Homepage",
    icon: <FaRoute className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/2"),
  },
  {
    label: "3. POST Data",
    icon: <FaPlusCircle className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/3"),
  },
  {
    label: "4. List Items",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/4"),
  },
  {
    label: "5. GET by ID",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/5"),
  },
  {
    label: "6. Update by ID",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/6"),
  },
  {
    label: "7. Delete by ID",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/7"),
  },
  {
    label: "8. Logger Middleware",
    icon: <FaTools className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/8"),
  },
  {
    label: "9. Parse JSON",
    icon: <FaKey className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/9"),
  },
  {
    label: "10. 404 Handler",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-basic/10/404-handler"),
  },
];

export default expressBasicMenu;
