import {
  FaTable,
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSortAmountDown,
  FaFilter,
  FaDatabase,
  FaLink,
  FaColumns,
} from "react-icons/fa";

const sqlBasicMenu = [
  {
    label: "Create Table",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/1"),
  },
  {
    label: "Insert Data",
    icon: <FaPlusCircle className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/2"),
  },
  {
    label: "Select All",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/3"),
  },
  {
    label: "Select Where",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/4"),
  },
  {
    label: "Update User",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/5"),
  },
  {
    label: "Delete User",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/6"),
  },
  {
    label: "Sort Users",
    icon: <FaSortAmountDown className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/7"),
  },
  {
    label: "Limit Results",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/8"),
  },
  {
    label: "Select Columns",
    icon: <FaColumns className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/9"),
  },
  {
    label: "INNER JOIN",
    icon: <FaLink className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("basic/10"),
  },
];

export default sqlBasicMenu;
