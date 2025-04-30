'use client';
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';

export default function Hero() {
  const [query, setQuery] = useState("");
  const [suggestions] = useState([
    { name: "HTML", link: "/html-tutorial" },
    { name: "CSS", link: "/css-tutorial" },
    { name: "JavaScript", link: "/javascript-tutorial" },
    { name: "React", link: "/react" },
    { name: "Node.js", link: "/CardNode" },
    { name: "PHP", link: "/php-tutorial" },
    { name: "Python", link: "/python-tutorial" },
    { name: "Express",link: "/express"},
    { name: "Mongodb",link: "/firstmongo"},
  ]);

  const filteredSuggestions = suggestions.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="relative text-center py-30 px-4 overflow-hidden">
        {/* Video as Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
          src="/banner1.mp4" // Replace with your video path
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Content over the video */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-200">
            Learn to Code
          </h1>
          <p className="text-lg md:text-xl text-yellow-500 mb-8">
            With the world's largest web developer site.
          </p>

          {/* Search Box */}
          <div className="mt-8 flex justify-center max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search our tutorials, e.g. HTML"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-l-md text-gray-200 text-sm border-2 border-gray-300 pl-10 focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
              <FaSearch />
            </span>

            {/* Dropdown Suggestions */}
            {query && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-13 bg-white border-2 border-gray-300 rounded-md shadow-lg">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={index} className="px-6 py-2 text-gray-800">
                    <a
                      href={suggestion.link}
                      className="block cursor-pointer hover:bg-gray-200 px-4 py-2"
                    >
                      {suggestion.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Small Link */}
          <a
            href="#"
            className="inline-block mt-6 text-base underline font-semibold text-green-600 hover:text-green-800"
          >
            Not Sure Where To Begin?
          </a>
        </div>

        {/* Optional: Dark Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      </section>
    </>
  );
}
