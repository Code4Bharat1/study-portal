import {
  FaProjectDiagram,
  FaDatabase,
  FaChartLine,
  FaTools,
  FaCogs,
  FaSyncAlt,
  FaLock,
  FaRocket,
  FaFingerprint,
  FaCloud,
} from "react-icons/fa";

const sqlAdvancedMenu = [
  {
    label: "Query Optimization",
    icon: <FaTools className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/1"),
  },
  {
    label: "Recursive CTEs",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/2"),
  },
  {
    label: "Table Partitioning",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/3"),
  },
  {
    label: "Full-text Search",
    icon: <FaChartLine className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/4"),
  },
  {
    label: "Stored Procedures",
    icon: <FaCogs className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/5"),
  },
  {
    label: "Window Functions",
    icon: <FaSyncAlt className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/6"),
  },
  {
    label: "Data Security",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/7"),
  },
  {
    label: "Backup & Recovery",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/8"),
  },
  {
    label: "Audit Logging",
    icon: <FaFingerprint className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/9"),
  },
  {
    label: "Cloud Databases",
    icon: <FaCloud className="inline mr-2 text-xl" />,
    onClick: () => handleOnChange("advanced/10"),
  },
];

export default sqlAdvancedMenu;
