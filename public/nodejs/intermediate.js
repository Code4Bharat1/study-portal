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
    label: "1. Asynchronous File Operations",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/1/async-file-operations"),
  },
  {
    label: "2. ES Modules in Node.js",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/2/es-modules"),
  },
  {
    label: "3. REST API with Express",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/3/rest-api-express"),
  },
  {
    label: "4. Middleware in Express",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/4/express-middleware"),
  },
  {
    label: "5. Basic Database Integration",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/5/database-integration"),
  },
  {
    label: "6. Authentication Basics",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/6/authentication"),
  },
  {
    label: "7. Advanced Event Emitters",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/7/advanced-event-emitters"),
  },
  {
    label: "8. Error Handling Middleware",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/8/error-handling-middleware"),
  },
  {
    label: "9. Streams for Large Data",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/9/streams-large-data"),
  },
  {
    label: "10. Unit Testing with Jest",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-intermediate/10/unit-testing-jest"),
  },
];