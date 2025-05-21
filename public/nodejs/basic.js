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
    label: "1. Node.js Setup and REPL",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/1/setup-repl"),
  },
  {
    label: "2. Modules and require",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/2/modules-require"),
  },
  {
    label: "3. File System Basics",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/3/file-system"),
  },
  {
    label: "4. Creating a Simple Server",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/4/simple-server"),
  },
  {
    label: "5. Handling HTTP Requests",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/5/http-requests"),
  },
  {
    label: "6. Working with JSON",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/6/json"),
  },
  {
    label: "7. Event Emitters",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/7/event-emitters"),
  },
  {
    label: "8. Basic Error Handling",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/8/error-handling"),
  },
  {
    label: "9. Streams and Buffers",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/9/streams-buffers"),
  },
  {
    label: "10. Package Management with npm",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("node-basic/10/npm"),
  },
];