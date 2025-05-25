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

const sqlIntermediateMenu = [
  {
    label: "1. Use GROUP BY to summarize sales by region",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/1/group-by-sales-region"),
  },
  {
    label: "2. Filter results with HAVING clause",
    icon: <FaFilter className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/2/having-filter"),
  },
  {
    label: "3. Create and query views",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/3/views"),
  },
  {
    label: "4. Use ORDER BY with multiple columns",
    icon: <FaSortAmountUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/4/order-by-multiple"),
  },
  {
    label: "5. Write subqueries in WHERE clause",
    icon: <FaExchangeAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/5/subqueries"),
  },
  {
    label: "6. Implement user roles and permissions",
    icon: <FaUserCog className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/6/user-roles"),
  },
  {
    label: "7. Use transactions to ensure data integrity",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/7/transactions"),
  },
  {
    label: "8. Generate reports using aggregate functions",
    icon: <FaChartBar className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/8/aggregate-reports"),
  },
  {
    label: "9. Work with multiple related tables using JOINs",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/9/complex-joins"),
  },
  {
    label: "10. Manage user contacts using SELF JOIN",
    icon: <FaUserFriends className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("sql-intermediate/10/self-join"),
  },
];

export default sqlIntermediateMenu;
