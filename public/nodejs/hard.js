import {
  FaCode,
  FaCheckSquare,
  FaVolumeUp,
  FaBars,
  FaSearch,
  FaUniversalAccess,
  FaWindowMaximize,
  FaList,
  FaImage,
  FaShieldAlt,
} from "react-icons/fa";

const jsPracticeMenu = [
  {
    label: "1. Worker Threads for CPU-Intensive Tasks",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/1/worker-threads"),
  },
  {
    label: "2. Cluster Module for Scalability",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/2/cluster-module"),
  },
  {
    label: "3. GraphQL API with Apollo",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/3/graphql-apollo"),
  },
  {
    label: "4. Advanced Middleware Patterns",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/4/advanced-middleware"),
  },
  {
    label: "5. Database Transactions and ORMs",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/5/database-transactions"),
  },
  {
    label: "6. OAuth 2.0 Authentication",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/6/oauth-authentication"),
  },
  {
    label: "7. Custom Stream Transformers",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/7/custom-streams"),
  },
  {
    label: "8. Performance Monitoring with PM2",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/8/performance-pm2"),
  },
  {
    label: "9. Microservices with gRPC",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/9/microservices-grpc"),
  },
  {
    label: "10. End-to-End Testing with Cypress",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-hard/10/e2e-testing-cypress"),
  },
];