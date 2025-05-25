import {
  FaProjectDiagram,
  FaFilter,
  FaTable,
  FaSortAmountUp,
  FaExchangeAlt,
  FaUserCog,
  FaDatabase,
  FaChartBar,
  FaLayerGroup,
  FaUserFriends,
} from "react-icons/fa";

const mysqlIntermediateMenu = [
  {
    label: "1. Group By",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/1"),
  },
  {
    label: "2. HAVING Filter",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/2"),
  },
  {
    label: "3. Views",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/3"),
  },
  {
    label: "4. Order By Multiple",
    icon: <FaSortAmountUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/4"),
  },
  {
    label: "5. Subqueries",
    icon: <FaExchangeAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/5"),
  },
  {
    label: "6. Roles & Permissions",
    icon: <FaUserCog className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/6"),
  },
  {
    label: "7. Transactions",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/7"),
  },
  {
    label: "8. Aggregate Reports",
    icon: <FaChartBar className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/8"),
  },
  {
    label: "9. Complex JOINs",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/9"),
  },
  {
    label: "10. SELF JOIN",
    icon: <FaUserFriends className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("intermediate/10"),
  },
];

export default mysqlIntermediateMenu;
