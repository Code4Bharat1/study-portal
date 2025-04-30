'use client';

import { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaChevronDown, FaChevronUp, FaHome, FaRegFileAlt, FaDatabase, 
  FaUsers, FaCogs, FaServer, FaFolderOpen, FaLink, 
  FaBoxOpen, FaBolt, FaUpload, FaEnvelopeOpenText 
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState({});
  const pathname = usePathname();

  const toggleDropdown = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getLinkClass = (href) => (
    `block p-2 rounded transition-all duration-200 ease-in-out
      hover:bg-[#d0f0fd]
      ${pathname === href ? 'bg-[#d0f0fd] font-semibold text-black' : 'text-gray-700'}`
  );

  return (
    <div className="w-64 bg-white text-black p-4 h-screen fixed flex flex-col border-r shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 shrink-0">Node.js Tutorial</h2>

      {/* Menu */}
      <ul className="overflow-y-auto flex-1 custom-scrollbar pr-2">

        {/* Static Links */}
        <li className="mb-4">
          <Link href="/HomeNode" className={getLinkClass("/HomeNode")}>
            <FaHome className="inline mr-2 text-xl" /> Node.js HOME
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/IntroNode" className={getLinkClass("/IntroNode")}>
            <FaRegFileAlt className="inline mr-2 text-xl" /> Node.js Intro
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/GetStartedNode" className={getLinkClass("/GetStartedNode")}>
            <FaCogs className="inline mr-2 text-xl" /> Node.js Get Started
          </Link>
        </li>

        {/* Dropdown Section */}
        <li className="mb-4">
          <button 
            className="w-full text-left flex items-center justify-between text-lg font-semibold" 
            onClick={() => toggleDropdown('nodeJs')}
          >
            <span>Node.js Modules</span>
            {isOpen['nodeJs'] ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isOpen['nodeJs'] && (
            <ul className="pl-6 mt-2 space-y-2">
              {[
                { label: "HTTP Module", icon: <FaServer className="inline mr-2 text-xl" />, href: "/HttpModule" },
                { label: "File System", icon: <FaFolderOpen className="inline mr-2 text-xl" />, href: "/FileSystem" },
                { label: "URL Module", icon: <FaLink className="inline mr-2 text-xl" />, href: "/UrlModule" },
                { label: "NPM", icon: <FaBoxOpen className="inline mr-2 text-xl" />, href: "/Npm" },
                { label: "Events", icon: <FaBolt className="inline mr-2 text-xl" />, href: "/Events" },
                { label: "Upload Files", icon: <FaUpload className="inline mr-2 text-xl" />, href: "/UploadFiles" },
                { label: "Email", icon: <FaEnvelopeOpenText className="inline mr-2 text-xl" />, href: "/Email" }
              ].map(({ label, icon, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={getLinkClass(href)}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Other Static Links */}
        <li className="mb-4">
          <Link href="/MySQLNode" className={getLinkClass("/MySQLNode")}>
            <FaDatabase className="inline mr-2 text-xl" /> Node.js MySQL
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/MongoDBNode" className={getLinkClass("/MongoDBNode")}>
            <FaDatabase className="inline mr-2 text-xl" /> Node.js MongoDB
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/RaspberryPi" className={getLinkClass("/RaspberryPi")}>
            <FaUsers className="inline mr-2 text-xl" /> Raspberry Pi
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/ReferenceNode" className={getLinkClass("/ReferenceNode")}>
            <FaRegFileAlt className="inline mr-2 text-xl" /> Node.js Reference
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
