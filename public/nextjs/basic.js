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
    label: "1. Introduction to Next.js",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/1/introduction"),
  },
  {
    label: "2. Pages and Routing",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/2/pages-routing"),
  },
  {
    label: "3. Static Generation",
    icon: <FaVolumeUp className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/3/static-generation"),
  },
  {
    label: "4. Server-Side Rendering",
    icon: <FaBars className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/4/server-side-rendering"),
  },
  {
    label: "5. API Routes",
    icon: <FaSearch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/5/api-routes"),
  },
  {
    label: "6. Dynamic Routes",
    icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/6/dynamic-routes"),
  },
  {
    label: "7. CSS in Next.js",
    icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/7/css"),
  },
  {
    label: "8. Image Optimization",
    icon: <FaList className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/8/image-optimization"),
  },
  {
    label: "9. Environment Variables",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/9/environment-variables"),
  },
  {
    label: "10. Deploying Next.js",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-basic/10/deployment"),
  },
];

export default nextjsPracticeMenu;