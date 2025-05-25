import {
  FaCodeBranch,
  FaFolderOpen,
  FaBug,
  FaShieldAlt,
  FaDatabase,
  FaUserShield,
  FaLock,
  FaSync,
  FaUserEdit,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const expressIntermediateMenu = [
  {
    label: "1. Use Router",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/1"),
  },
  {
    label: "2. Custom Logger",
    icon: <FaFolderOpen className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/2"),
  },
  {
    label: "3. Error Handler",
    icon: <FaBug className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/3"),
  },
  {
    label: "4. Input Validation",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/4"),
  },
  {
    label: "5. MongoDB Setup",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/5"),
  },
  {
    label: "6. JWT Auth",
    icon: <FaUserShield className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/6"),
  },
  {
    label: "7. Hash Passwords",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/7"),
  },
  {
    label: "8. Patch User",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/8"),
  },
  {
    label: "9. Use `req.user`",
    icon: <FaUserEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/9"),
  },
  {
    label: "10. Send Email",
    icon: <FaEnvelopeOpenText className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("express-intermediate/10"),
  },
];

export default expressIntermediateMenu;
