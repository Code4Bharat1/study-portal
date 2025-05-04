import {
  FaHome, FaRegFileAlt, FaCogs,
  FaCode, FaCubes, FaEquals, FaRandom, FaCodeBranch, FaListUl,
  FaObjectGroup, FaSync, FaHtml5, FaMousePointer,
  FaProjectDiagram, FaTasks, FaArrowCircleRight
} from "react-icons/fa";
import Sidebar from "@/components/Sidebar"


const menuItems = [{ label: "Home", icon: <FaHome className="inline mr-2 text-xl" />, href: "/javascript/home" },
{ label: "Introduction", icon: <FaRegFileAlt className="inline mr-2 text-xl" />, href: "/javascript/intro" },
{ label: "Get Started", icon: <FaCogs className="inline mr-2 text-xl" />, href: "/javascript/get-started" },
{ label: "Basic Syntax", icon: <FaCode className="inline mr-2 text-xl" />, href: "/javascript/basic-syntax" },
{ label: "Variables & Data Types", icon: <FaCubes className="inline mr-2 text-xl" />, href: "/javascript/variables-datatype" },
{ label: "Operators", icon: <FaEquals className="inline mr-2 text-xl" />, href: "/javascript/operators" },
{ label: "Control Flow", icon: <FaRandom className="inline mr-2 text-xl" />, href: "/javascript/control-flow" },
{ label: "Functions", icon: <FaCodeBranch className="inline mr-2 text-xl" />, href: "/javascript/functions" },
{ label: "Arrays", icon: <FaListUl className="inline mr-2 text-xl" />, href: "/javascript/arrays" },
{ label: "Objects", icon: <FaObjectGroup className="inline mr-2 text-xl" />, href: "/javascript/objects" },
{ label: "Loops", icon: <FaSync className="inline mr-2 text-xl" />, href: "/javascript/loops" },
{ label: "DOM Manipulation", icon: <FaHtml5 className="inline mr-2 text-xl" />, href: "/javascript/dom-manupilation" },
{ label: "Events", icon: <FaMousePointer className="inline mr-2 text-xl" />, href: "/javascript/events" },
{ label: "Project: Calculator", icon: <FaProjectDiagram className="inline mr-2 text-xl" />, href: "/javascript/project-calculator" },
{ label: "Project: To-Do App", icon: <FaTasks className="inline mr-2 text-xl" />, href: "/javascript/project-todo" },
{ label: "Next Steps", icon: <FaArrowCircleRight className="inline mr-2 text-xl" />, href: "/javascript/next-steps" },
{ label: "Reference", icon: <FaRegFileAlt className="inline mr-2 text-xl" />, href: "/javascript/ReferenceNode" }
]

export default function JSSidebar(){
  return (
    <Sidebar menuItems={menuItems} />
  )
}


