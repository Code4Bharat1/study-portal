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

const nextjsPracticeMenu = [
  {
    label: "1. Intro",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. Pages & Routing",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. Static Generation",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. Server Rendering",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. API Routes",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. Dynamic Routes",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. CSS",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. Image Opt.",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Env Variables",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. Deployment",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

export default nextjsPracticeMenu;
