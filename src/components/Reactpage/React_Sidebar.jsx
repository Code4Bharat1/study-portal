'use client';

import { useState } from 'react';
import Link from 'next/link';

const ReactSidebar = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: true, // Always open, never toggles back to false
    }));
  };

  return (
    <div className="absolute w-64 bg-white text-black p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">React Tutorial</h2>
      <nav className="space-y-2">
        <ul className="space-y-1">
          <li>
            <Link href="/reacthome" className="block p-2 rounded-md hover:bg-pink-100">
              React HOME
            </Link>
          </li>
          <li>
            <Link href="/reactintroduction" className="block p-2 rounded-md hover:bg-pink-100">
              React Introduction
            </Link>
          </li>
          <li>
            <Link href="/reactinstallation" className="block p-2 rounded-md hover:bg-pink-100">
              React Installation
            </Link>
          </li>
          <li>
            <Link href="/reactcomponents" className="block p-2 rounded-md hover:bg-pink-100">
              Components
            </Link>
          </li>
          <li>
            <Link href="/reactprops" className="block p-2 rounded-md hover:bg-pink-100">
              Props & State
            </Link>
          </li>

          {/* Hooks Section */}
          <li>
            <button
              onClick={() => toggleDropdown('hooks')}
              className="block w-full text-left p-2 rounded-md hover:bg-pink-100"
            >
              React Hooks
            </button>
            {isOpen.hooks && (
              <ul className="pl-4 space-y-1">
                <li>
                  <Link href="/reactusestate" className="block p-2 rounded-md hover:bg-pink-100">
                    useState
                  </Link>
                </li>
                <li>
                  <Link href="/reactuseeffect" className="block p-2 rounded-md hover:bg-pink-100">
                    useEffect
                  </Link>
                </li>
                <li>
                  <Link href="/react_custom_hooks" className="block p-2 rounded-md hover:bg-pink-100">
                    Custom Hooks
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Router Section */}
          <li>
            <button
              onClick={() => toggleDropdown('router')}
              className="block w-full text-left p-2 rounded-md hover:bg-pink-100"
            >
              React Router
            </button>
            {isOpen.router && (
              <ul className="pl-4 space-y-1">
                <li>
                  <Link href="/reactroutingbasics" className="block p-2 rounded-md hover:bg-pink-100">
                    Routing Basics
                  </Link>
                </li>
                <li>
                  <Link href="/reactdynamicroutes" className="block p-2 rounded-md hover:bg-pink-100">
                    Dynamic Routes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/reactcontext" className="block p-2 rounded-md hover:bg-pink-100">
              Context API
            </Link>
          </li>
          <li>
            <Link href="/reactformsandvalidation" className="block p-2 rounded-md hover:bg-pink-100">
              Forms & Validation
            </Link>
          </li>
          <li>
            <Link href="/reactperformance" className="block p-2 rounded-md hover:bg-pink-100">
              React Performance
            </Link>
          </li>
          <li>
            <Link href="/reactdeployment" className="block p-2 rounded-md hover:bg-pink-100">
              Deployment
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ReactSidebar;
