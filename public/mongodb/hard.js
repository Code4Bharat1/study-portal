import {
  FaCogs,
  FaLayerGroup,
  FaRocket,
  FaBalanceScale,
  FaProjectDiagram,
  FaCodeBranch,
  FaBrain,
  FaChartBar,
  FaLock,
  FaCompress,
} from "react-icons/fa";

const mongodbAdvancedMenu = [
  {
    label: "1. Multi-Collection Txns",
    icon: <FaBalanceScale className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/1"),
  },
  {
    label: "2. Compound Indexes",
    icon: <FaCogs className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/2"),
  },
  {
    label: "3. Geo $near Query",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/3"),
  },
  {
    label: "4. Polymorphic Discriminators",
    icon: <FaLayerGroup className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/4"),
  },
  {
    label: "5. Refs & Embedded Docs",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/5"),
  },
  {
    label: "6. Aggregate Comments & Ratings",
    icon: <FaChartBar className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/6"),
  },
  {
    label: "7. $lookup Latest Orders",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/7"),
  },
  {
    label: "8. Field-Level Encryption",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/8"),
  },
  {
    label: "9. Change Streams",
    icon: <FaBrain className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/9"),
  },
  {
    label: "10. Schema Optimization",
    icon: <FaCompress className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("hard/10"),
  },
];

export default mongodbAdvancedMenu;
