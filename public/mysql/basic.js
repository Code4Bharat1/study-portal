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

const basicMenu = [
  {
    label: "Create table",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "Insert data",
    icon: <FaPlusCircle className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "Select all",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "Filter data",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "Update record",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "Delete record",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "Sort data",
    icon: <FaSortAmountDown className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "Limit results",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "Select columns",
    icon: <FaColumns className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "Join tables",
    icon: <FaLink className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

export default basicMenu;
