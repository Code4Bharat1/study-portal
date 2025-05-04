'use client';
import { FaHome, FaBook, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { PiFlowerLotusDuotone } from 'react-icons/pi';
import { Facebook, Twitter, Youtube, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      id="footer" 
      className="relative z-10 bg-slate-800 text-white text-sm shadow-lg px-8 py-12 w-full"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Address */}
        <div>
          <div className="text-3xl font-semibold flex items-center space-x-2 mb-2">
            <PiFlowerLotusDuotone className="text-blue-700 w-8 h-8" />
            <span className="logo-shine">Skill</span>
            <span className="logo-shine text-blue-700">Bridge</span>
          </div>
          <p className="text-gray-300">
            Fueled by heart, crafted with soul,<br />
            a piece of you in every goal.
          </p>
          <p className="mt-2 text-gray-400">askme@skillbridge.com</p>
        </div>

        {/* Column: Main Menu */}
        <div className='ml-2'>
          <h3 className="font-semibold mb-2 text-white flex items-center space-x-2">
            <FaHome className="w-5 h-5 text-white" />
            <span>Main Menu</span>
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Exercise</li>
          </ul>
        </div>

        {/* Column: Academic */}
        <div>
          <h3 className="font-semibold mb-2 text-white flex items-center space-x-2">
            <FaBook className="w-5 h-5 text-white" />
            <span>Academic</span>
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Courses</li>
            <li className="hover:text-white cursor-pointer">E-Learning</li>
            <li className="hover:text-white cursor-pointer">Solutions</li>
          </ul>
        </div>

        {/* Column: Help */}
        <div>
          <h3 className="font-semibold mb-2 text-white flex items-center space-x-2">
            <FaQuestionCircle className="w-5 h-5 text-white" />
            <span>Help</span>
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Progress Tracker</li>
            <li className="hover:text-white cursor-pointer">Technical Support</li>
          </ul>
        </div>

        {/* Column: Social */}
        <div>
          <h3 className="font-semibold mb-2 text-white">FOLLOW</h3>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-white hover:text-[#3b5998] cursor-pointer" />
            <Twitter className="w-5 h-5 text-white hover:text-[#1DA1F2] cursor-pointer" />
            <FaGithub className="w-5 h-5 text-white hover:text-[#333] cursor-pointer" />
            <Youtube className="w-5 h-5 text-white hover:text-[#FF0000] cursor-pointer" />
            <Linkedin className="w-5 h-5 text-white hover:text-[#0077B5] cursor-pointer" />
            <Instagram className="w-5 h-5 text-white hover:text-[#E1306C] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-gray-400">
        <div className="space-x-6 mb-2 md:mb-0">
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Sitemap</a>
        </div>
        <p className="flex items-center space-x-2">
          <span>© 2025</span>
          <PiFlowerLotusDuotone className="text-blue-700 w-8 h-8" />
          <span className="font-semibold">Skill Bridge</span>
          <span>· Powered by Skill Bridge</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
