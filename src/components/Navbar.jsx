"use client";

import Link from "next/link";
import { PiFlowerLotusDuotone } from "react-icons/pi";
import { FaUser } from "react-icons/fa"; // Added user icon
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

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
    { name: "Java", link: "/firstJava" },
    { name: "Sql", link: "/sql" },
    { name: "MySql", link: "/mysql" },
    { name: "Next.js", link: "/nextjs"},

  ];

  const learningItems = [
    { name: "Tutorial", link: "/tutorial" },
    { name: "Video", link: "/video" },
    { name: "Quizz Test", link: "/quizz" },
    { name: "Exercises", link: "/exercises" },
    {name: "Practical-exercises" , link: "/exercises/react"},
    { name: "Best Practices", link: "/bestpracticecard" },
  ];

  const navbarItems = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
    { name: "Activity", link: "/activity" },
    { name: "Leaderboard", link: "/leaderboard" }

  ];

  const allItems = [...navbarItems, ...learningItems, ...menuItems];

  const filteredSearchItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userData = localStorage.getItem("user");
      if (userData) {
        const { name } = JSON.parse(userData);
        setUsername(name);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    window.location.href = "/";
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-3xl font-semibold flex items-center space-x-2">
                <PiFlowerLotusDuotone className="text-blue-600 w-8 h-8 animate-glow" />
                <span className="text-black">Skill</span>
                <span className="text-blue-700">Bridge</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex space-x-8">
                {navbarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={`px-1 py-2 text-sm font-medium hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-all duration-300 ${
                      pathname === item.link
                        ? "text-blue-500 border-blue-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Learning Dropdown */}
                <div className="relative group">
                  <button
                    className={`px-1 py-2 text-sm font-medium hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-all duration-300 ${
                      learningItems.some((i) => pathname === i.link)
                        ? "text-blue-500 border-blue-500"
                        : "text-gray-800"
                    }`}
                  >
                    Learning ▾
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {learningItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        className={`block px-4 py-2 text-sm ${
                          pathname === item.link
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Search + Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchQuery.length > 0 && setShowSearchResults(true)
                  }
                  className="px-4 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm w-40 transition-all duration-300 focus:w-52"
                />
                {showSearchResults && filteredSearchItems.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1 max-h-60 overflow-auto">
                      {filteredSearchItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Section */}
              <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {username ? (
                        <span className="font-medium">{username}</span>
                      ) : (
                        <FaUser className="w-4 h-4" />
                      )}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          showDropdown ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/register">
                      <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl">
                        Sign Up
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
                        Log In
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Menu */}
        <div className="w-full bg-white border-t border-gray-200 px-4 py-2 shadow-inner overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="inline-flex space-x-12">
            {menuItems.map((item, index) => {
              const isActive =
                pathname.replace(/\/$/, "") === item.link.replace(/\/$/, "");
              return (
                <Link
                  href={item.link}
                  key={index}
                  className={`text-sm font-medium px-1 py-1 relative transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="text-xl font-semibold flex items-center space-x-2">
                <PiFlowerLotusDuotone className="text-blue-600 w-6 h-6" />
                <span>SkillBridge</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 space-y-2">
              {isLoggedIn && (
                <div className="pb-2 mb-2 border-b border-gray-200">
                  <p className="font-medium text-gray-900 flex items-center space-x-2">
                    <FaUser className="w-4 h-4" />
                    <span>Welcome, {username || "Guest"}</span>
                  </p>
                </div>
              )}
              {[...navbarItems, ...learningItems, ...menuItems].map(
                (item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-800 hover:text-blue-500 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              )}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left border border-red-400 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-800 hover:text-blue-500 text-sm font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-800 hover:text-blue-500 text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}