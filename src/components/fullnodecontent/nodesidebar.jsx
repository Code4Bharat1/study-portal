'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome, FaFileAlt, FaRocket, FaChevronDown, FaChevronUp,
  FaServer, FaLayerGroup, FaSitemap, FaDownload, FaUsb, FaEnvelope, FaDatabase
} from 'react-icons/fa';

const NodeSidebar = () => {
  const [isOpen, setIsOpen] = useState({}); // State to manage dropdowns
  const pathname = usePathname();

  // Toggle the dropdown visibility based on the section clicked
  const toggleDropdown = (section) => {
    setIsOpen(prev => ({
      ...prev,
      [section]: !prev[section], // Toggle the specific section's dropdown
    }));
  };

  // Get link class with enhanced active state management
  const getLinkClass = (href) => {
    return `block p-2 rounded transition-all duration-200 ease-in-out 
      hover:bg-[#d0f0fd] hover:text-gray-900 
      ${pathname === href 
        ? 'bg-[#007bff] text-white font-semibold shadow-md border-l-4 border-white' 
        : 'text-gray-700'}`;
  };

  return (
    <div className="w-70 bg-white text-black p-4 h-screen fixed flex flex-col border-r shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Node.js Tutorial</h2>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-4 pb-29">
          <li>
            <Link href="/NodeHome" className={getLinkClass("/nodehome")}>
              <FaHome className="inline mr-2 text-xl" /> Node.js HOME
            </Link>
          </li>
          <li>
            <Link href="/NodeIntro" className={getLinkClass("/nodeintro")}>
              <FaFileAlt className="inline mr-2 text-xl" /> Node.js Intro
            </Link>
          </li>
          <li>
            <Link href="/NodeGetStarted" className={getLinkClass("/getstarted")}>
              <FaRocket className="inline mr-2 text-xl" /> Get Started
            </Link>
          </li>

          {/* Modules Dropdown */}
          <li>
            <button
              className="w-full text-left flex items-center justify-between text-lg font-semibold"
              onClick={() => toggleDropdown('modules')}
            >
              <span>Modules</span>
              {isOpen['modules'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen['modules'] && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link href="/NodeModule" className={getLinkClass("/fsmodule")}>
                    <FaFileAlt className="inline mr-2 text-xl" /> Module
                  </Link>
                </li>
                <li>
                  <Link href="/NodeHttpModule" className={getLinkClass("/httpmodule")}>
                    <FaServer className="inline mr-2 text-xl" /> HTTP Module
                  </Link>
                </li>
                <li>
                  <Link href="/Nodefsmodule" className={getLinkClass("/fsmodule")}>
                    <FaFileAlt className="inline mr-2 text-xl" /> File System Module
                  </Link>
                </li>
                <li>
                  <Link href="/Nodestreammodule" className={getLinkClass("/streammodule")}>
                    <FaLayerGroup className="inline mr-2 text-xl" /> Stream Module
                  </Link>
                </li>
                <li>
                  <Link href="/Nodeeventsmodule" className={getLinkClass("/eventsmodule")}>
                    <FaFileAlt className="inline mr-2 text-xl" /> Events Module
                  </Link>
                </li>
                <li>
                  <Link href="/Nodepathmodule" className={getLinkClass("/pathmodule")}>
                    <FaSitemap className="inline mr-2 text-xl" /> Path Module
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other links */}
          <li>
            <Link href="/Nodenpm" className={getLinkClass("/npm")}>
              <FaDownload className="inline mr-2 text-xl" /> NPM
            </Link>
          </li>
          <li>
            <Link href="/Nodeuploadfiles" className={getLinkClass("/uploadfiles")}>
              <FaUsb className="inline mr-2 text-xl" /> Upload Files
            </Link>
          </li>
          <li>
            <Link href="/Nodeemail" className={getLinkClass("/email")}>
              <FaEnvelope className="inline mr-2 text-xl" /> Email
            </Link>
          </li>
          <li>
            <Link href="/Nodemysql" className={getLinkClass("/mysql")}>
              <FaDatabase className="inline mr-2 text-xl" /> MySQL
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NodeSidebar;