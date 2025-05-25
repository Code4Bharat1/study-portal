import {
  FaTools,
  FaProjectDiagram,
  FaDatabase,
  FaChartLine,
  FaCogs,
  FaSyncAlt,
  FaLock,
  FaRocket,
  FaFingerprint,
  FaCloud,
} from "react-icons/fa";

const mysqlAdvancedMenu = [
  {
    label: "1. Query Optimization",
    icon: <FaTools className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/1"),
  },
  {
    label: "2. Recursive CTEs",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/2"),
  },
  {
    label: "3. Table Partitioning",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/3"),
  },
  {
    label: "4. Full-Text Search",
    icon: <FaChartLine className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/4"),
  },
  {
    label: "5. Stored Procedures",
    icon: <FaCogs className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/5"),
  },
  {
    label: "6. Window Functions",
    icon: <FaSyncAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/6"),
  },
  {
    label: "7. Data Encryption",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/7"),
  },
  {
    label: "8. Backup & Recovery",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/8"),
  },
  {
    label: "9. Audit Logging",
    icon: <FaFingerprint className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/9"),
  },
  {
    label: "10. Cloud Databases",
    icon: <FaCloud className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("advanced/10"),
  },
];

export default mysqlAdvancedMenu;
