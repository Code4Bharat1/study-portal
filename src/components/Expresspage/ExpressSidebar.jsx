'use client';

import { useState } from 'react';
import Link from 'next/link';

const ExpressSidebar = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-64 bg-white text-black p-4 h-screen fixed overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Express Tutorial</h2>
      <nav className="space-y-2">
        <ul className="space-y-1">

          <li>
            <Link href="/expresshome" className="block p-2 rounded-md hover:bg-yellow-100">
              Express HOME
            </Link>
          </li>
          <li>
            <Link href="/expressintro" className="block p-2 rounded-md hover:bg-yellow-100">
              Introduction
            </Link>
          </li>
          <li>
            <Link href="/expresssetup" className="block p-2 rounded-md hover:bg-yellow-100">
              Setup & Installation
            </Link>
          </li>

          {/* Routing Section */}
          <li>
            <button
              onClick={() => toggleDropdown('routing')}
              className="block w-full text-left p-2 rounded-md hover:bg-yellow-100"
            >
              Routing
            </button>
            {isOpen.routing && (
              <ul className="pl-4 space-y-1">
                <li>
                  <Link href="/expressrouting" className="block p-2 rounded-md hover:bg-yellow-100">
                    Basics of Routing
                  </Link>
                </li>
                <li>
                  <Link href="/expressparams" className="block p-2 rounded-md hover:bg-yellow-100">
                    Route Parameters
                  </Link>
                </li>
                <li>
                  <Link href="/expressmiddleware" className="block p-2 rounded-md hover:bg-yellow-100">
                    Middleware
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Advanced Topics */}
          <li>
            <button
              onClick={() => toggleDropdown('advanced')}
              className="block w-full text-left p-2 rounded-md hover:bg-yellow-100"
            >
              Advanced Topics
            </button>
            {isOpen.advanced && (
              <ul className="pl-4 space-y-1">
                <li>
                  <Link href="/expressauth" className="block p-2 rounded-md hover:bg-yellow-100">
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link href="/expressjwt" className="block p-2 rounded-md hover:bg-yellow-100">
                    JWT Integration
                  </Link>
                </li>
                <li>
                  <Link href="/expressfileupload" className="block p-2 rounded-md hover:bg-yellow-100">
                    File Uploads
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Utilities & Deployment */}
          <li>
            <Link href="/expresserror" className="block p-2 rounded-md hover:bg-yellow-100">
              Error Handling
            </Link>
          </li>
          <li>
            <Link href="/expressenv" className="block p-2 rounded-md hover:bg-yellow-100">
              .env & Configuration
            </Link>
          </li>
          <li>
            <Link href="/expressdeployment" className="block p-2 rounded-md hover:bg-yellow-100">
              Deployment
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default ExpressSidebar;
