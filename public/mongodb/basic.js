import {
  FaDatabase,
  FaPlug,
  FaPlusSquare,
  FaSearch,
  FaEdit,
  FaTrash,
  FaFilter,
  FaCodeBranch,
  FaSave,
  FaList,
} from "react-icons/fa";

const mongodbBasicMenu = [
  {
    label: "1. Connect with Mongoose",
    icon: <FaPlug className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. Create User Model",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. Insert One User",
    icon: <FaPlusSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. Insert Many Users",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. Query Age > 30",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. Update Name by ID",
    icon: <FaEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. Delete Inactive Users",
    icon: <FaTrash className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. Find Users in Cities",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Array Field Document",
    icon: <FaSave className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. Embedded Comments",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

export default mongodbBasicMenu;
