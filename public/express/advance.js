import {
  FaProjectDiagram,
  FaServer,
  FaNetworkWired,
  FaLock,
  FaBolt,
  FaSyncAlt,
  FaShieldVirus,
  FaRocket,
  FaDatabase,
  FaCloudUploadAlt,
} from "react-icons/fa";

const expressAdvancedMenu = [
  {
    label: "1. Rate Limiting",
    icon: <FaShieldVirus className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/1"),
  },
  {
    label: "2. API Versioning",
    icon: <FaProjectDiagram className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/2"),
  },
  {
    label: "3. Clustering",
    icon: <FaBolt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/3"),
  },
  {
    label: "4. OAuth2 Auth",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/4"),
  },
  {
    label: "5. Redis Caching",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/5"),
  },
  {
    label: "6. WebSockets",
    icon: <FaNetworkWired className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/6"),
  },
  {
    label: "7. AWS S3 Upload",
    icon: <FaCloudUploadAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/7"),
  },
  {
    label: "8. GraphQL Server",
    icon: <FaServer className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/8"),
  },
  {
    label: "9. Sentry Tracking",
    icon: <FaSyncAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/9"),
  },
  {
    label: "10. Helmet Security",
    icon: <FaRocket className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-advanced/10"),
  },
];

export default expressAdvancedMenu;
