import {
    FaHome, FaRegFileAlt, FaCogs,
    FaCode, FaCubes, FaEquals, FaRandom, FaCodeBranch, FaListUl,
    FaObjectGroup, FaSync, FaHtml5, FaMousePointer,
    FaProjectDiagram, FaTasks, FaArrowCircleRight
  } from "react-icons/fa";
import Sidebar from "@/components/Sidebar"
  
export const menuItems = [
{ label: "Home", icon: <FaHome className="inline mr-2 text-xl" />, href: "/nextjs/home" },
{ label: "Introduction", icon: <FaRegFileAlt className="inline mr-2 text-xl" />, href: "/nextjs/introduction" },
{ label: "Getting Started", icon: <FaCogs className="inline mr-2 text-xl" />, href: "/nextjs/get-started" },
{ label: "Pages & Routing", icon: <FaCode className="inline mr-2 text-xl" />, href: "/nextjs/pages-routing" },
{ label: "Static Generation", icon: <FaCubes className="inline mr-2 text-xl" />, href: "/nextjs/static-generation" },
{ label: "Server-side Rendering (SSR)", icon: <FaEquals className="inline mr-2 text-xl" />, href: "/nextjs/ssr" },
{ label: "API Routes", icon: <FaRandom className="inline mr-2 text-xl" />, href: "/nextjs/api-routes" },
{ label: "Static Files & Assets", icon: <FaCodeBranch className="inline mr-2 text-xl" />, href: "/nextjs/static-assets" },
{ label: "Styling with CSS", icon: <FaListUl className="inline mr-2 text-xl" />, href: "/nextjs/style-css" },
{ label: "Data Fetching", icon: <FaObjectGroup className="inline mr-2 text-xl" />, href: "/nextjs/data-fetching" },
{ label: "Image Optimization", icon: <FaSync className="inline mr-2 text-xl" />, href: "/nextjs/image-optimization" },
{ label: "Custom Document", icon: <FaHtml5 className="inline mr-2 text-xl" />, href: "/nextjs/custom-document" },
{ label: "Events & Client-side Rendering", icon: <FaMousePointer className="inline mr-2 text-xl" />, href: "/nextjs/events-client-rendering" },
{ label: "Next.js with TypeScript", icon: <FaTasks className="inline mr-2 text-xl" />, href: "/nextjs/typescript" },
{ label: "Deployment & Hosting", icon: <FaArrowCircleRight className="inline mr-2 text-xl" />, href: "/nextjs/deployment" },
{ label: "Next.js Documentation", icon: <FaRegFileAlt className="inline mr-2 text-xl" />, href: "/nextjs/docs" }
];

export default function JSSidebar(){
    return (
      <Sidebar menuItems={menuItems} />
    )
  }