'use client';
import React from 'react';
import { Facebook, Twitter, Youtube, Linkedin, Instagram } from 'lucide-react';
import { PiFlowerLotusDuotone } from 'react-icons/pi';

const Footer = () => {
  return (
    <footer className="bg-[#0e1f26] text-white px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Logo & Address */}
        <div>
          <div className="text-3xl font-semibold flex items-center space-x-2 mb-2">
            <PiFlowerLotusDuotone className="text-blue-600 w-8 h-8 animate-glow" />
            <span className="logo-shine">Skill</span>
            <span className="logo-shine text-blue-700">Bridge</span>
          </div>
          <p>Architect VL, 8505 SW Hastings<br />St. Vancouver, BC V6L Canada</p>
          <p className="mt-2">askme@archiactvr.com</p>
        </div>

        {/* Column: Archiact */}
        <div className='ml-19'>
          <h3 className="font-semibold mb-2 ">ARCHIACT</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column: Services */}
        <div>
          <h3 className="font-semibold mb-2">SERVICES</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Games</li>
            <li>Publishing</li>
            <li>Solutions</li>
          </ul>
        </div>

        {/* Column: Events */}
        <div>
          <h3 className="font-semibold mb-2">EVENTS</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>CVR</li>
            <li>Game Jams</li>
          </ul>
        </div>

        {/* Column: Social */}
        <div>
          <h3 className="font-semibold mb-2">FOLLOW</h3>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 hover:text-blue-500" />
            <Twitter className="w-5 h-5 hover:text-sky-400" />
            <Youtube className="w-5 h-5 hover:text-red-500" />
            <Linkedin className="w-5 h-5 hover:text-blue-300" />
            <Instagram className="w-5 h-5 hover:text-pink-500" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-gray-400">
        <div className="space-x-6 mb-2 md:mb-0">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Sitemap</a>
        </div>
        <p>© 2025 Skill Bridge · Built with ❤️ by You</p>
      </div>
    </footer>
  );
};

export default Footer;
