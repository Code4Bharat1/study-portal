'use client';

import Link from 'next/link';
import { PiFlowerLotusDuotone } from 'react-icons/pi';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { name: "HTML", link: "/firstHtml" },
    { name: "CSS", link: "/Csscard" },
    { name: "JavaScript", link: "/javascript" },
    { name: "React", link: "/react" },
    { name: "Node.js", link: "/CardNode" },
    { name: "PHP", link: "/php" },
    { name: "Python", link: "/firstPython" },
    { name: "Express", link: "/express" },
    { name: "Mongodb", link: "/firstmongo" },
    { name: "Java", link: "/firstJava" }
  ];

  const learningItems = [
    { name: 'Tutorial', link: '/tutorial' },
    { name: 'Video', link: '/video' },
    { name: 'Quizz Test', link: '/quizz' },
    { name: 'Exercises', link: '/exercises' },
  ];

  const navbarItems = [
    { name: 'Home', link: '/' },
    { name: 'Contact', link: '/contact' },
    { name: 'Activity', link: '/activity' },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 shadow-lg">
        <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="text-3xl font-semibold flex items-center space-x-2 flex-shrink-0">
            <PiFlowerLotusDuotone className="text-blue-600 w-8 h-8 animate-glow" />
            <span className="logo-shine text-black">Skill</span>
            <span className="logo-shine text-blue-700">Bridge</span>
          </div>

          {/* ======================= CENTER MENU START ======================= */}
          {/* Highlighted with border and background for visibility */}
          <div className=" ">
            <ul className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-8 text-black text-sm font-semibold w-max">
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={`hover:text-blue-500 hover:border-b-2 hover:border-black transition-all duration-300 cursor-pointer pb-1 ${
                      pathname === item.link
                        ? 'border-b-2 border-black text-blue-500'
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Dropdown with delay effect */}
              <li className="relative group">
                <span
                  className={`cursor-pointer pb-1 hover:text-blue-500 ${
                    learningItems.some((i) => pathname === i.link)
                      ? 'text-blue-500 border-b-2 border-black'
                      : ''
                  }`}
                >
                  Learning ▾
                </span>
                <ul className="invisible opacity-0 translate-y-[-10px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 
                             absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg min-w-[150px] z-50 
                             transition-all duration-300 delay-200">
                  {learningItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-600 ${
                          pathname === item.link ? 'bg-blue-100 text-blue-600' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          {/* ======================= CENTER MENU END ======================= */}

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex items-center ml-170">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          {/* Buttons - Right */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <Link href="/register">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-full text-sm transition-all shadow-lg">
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button className="border border-blue hover:bg-white hover:text-blue-600 text-black px-4 py-2 rounded-full text-sm transition-all shadow-md">
                Log In
              </button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              className="text-black text-3xl"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Horizontal Scroll Menu */}
      <div className="fixed top-[60px] left-0 w-full backdrop-blur-md bg-gray-200 border-t border-b border-white/30 flex items-center px-4 py-1 gap-6 shadow-md z-40 overflow-x-auto whitespace-nowrap">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item, index) => {
            const isActive = pathname.replace(/\/$/, '') === item.link.replace(/\/$/, '');

            return (
              <Link
                href={item.link}
                key={index}
                className={`text-gray-800 text-sm font-semibold transition-all duration-300 px-4 py-2 relative ${
                  isActive
                    ? 'text-black after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-black'
                    : 'hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            );
          })
        ) : (
          <span className="text-sm text-gray-500">No items found</span>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button
              className="text-white text-3xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="bg-white rounded-t-3xl text-gray-800 px-8 py-6 space-y-6">
            {[...navbarItems, ...learningItems].map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={`block text-lg font-semibold hover:text-blue-500 transition-all ${
                  pathname === item.link ? 'text-blue-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}