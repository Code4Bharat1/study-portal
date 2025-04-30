'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiFlowerLotusDuotone } from 'react-icons/pi';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const menuItems = [
    { name: 'MONGODB', link: '/firstmongo' },
    { name: 'EXPRESS', link: '/express' },
    { name: 'REACT', link: '/react' },
    { name: 'NODE', link: '/NodeCard' },
    { name: 'JAVASCRIPT', link: '/javascript' },
    { name: 'SQL', link: '/sql' },
    { name: 'PYTHON', link: '/firstPython' },
    { name: 'JAVA', link: '/java' },
    { name: 'PHP', link: '/php' },
    { name: 'HTML', link: '/w3-css' },
    { name: 'CSS', link: '/Csscard' },
    
  
  ];

  const navbarItems = [
    { name: 'Exercises', link: '/exercises' },
    { name: 'Services', link: '/services' },
    { name: 'Home', link: '/' },
    { name: 'Contact', link: '/contact' },
    { name: 'Quizz Test', link: '/quizz' }, // New link added
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto left-0 flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <div className="text-3xl font-semibold flex items-center space-x-2">
            <PiFlowerLotusDuotone className="text-blue-600 w-8 h-8 animate-glow" />
            <span className="logo-shine text-black">Skill</span>
            <span className="logo-shine text-blue-700">Bridge</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center justify-center gap-8 text-black text-sm font-semibold mx-auto">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`hover:text-blue-500 hover:border-b-2 hover:border-black focus:text-blue-500 focus:border-b-2 focus:border-black transition-all duration-300 cursor-pointer ${activeLink === item.link ? 'border-2 border-blue-600 px-4 py-2' : ''}`}
                  onClick={() => handleLinkClick(item.link)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex ml-auto items-center gap-4">
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

      {/* Scroll Menu */}
      <div className="fixed top-[60px] left-0 w-full backdrop-blur-md bg-gray-200 border-t border-b border-white/30 flex items-center px-4 py-1 gap-6 shadow-md z-40 overflow-x-hidden">
        {menuItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={`text-gray-800 hover:text-blue-600 hover:border-b-2 hover:border-black text-sm font-semibold transition-all duration-300 whitespace-nowrap border-2 border-transparent px-4 py-2 ${activeLink === item.link ? 'border-2 border-blue-600' : ''}`}
            onClick={() => handleLinkClick(item.link)}
          >
            {item.name}
          </Link>
        ))}
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
            {menuItems.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={`block text-lg font-semibold hover:text-blue-500 transition-all ${activeLink === item.link ? 'text-blue-600' : ''}`}
                onClick={() => {
                  handleLinkClick(item.link);
                  setMobileMenuOpen(false);
                }}
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
