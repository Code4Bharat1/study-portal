
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({menuItems}) => {
  const pathname = usePathname();

  const getLinkClass = (href) => (
    `block p-2 rounded transition-all duration-200 ease-in-out
      hover:bg-[#d0f0fd]
      ${pathname === href ? 'bg-[#d0f0fd] font-semibold text-black' : 'text-gray-700'}`
  );

  return (
    <div className="w-80 pt-35 bg-white text-black p-4 h-screen fixed flex flex-col">

      {/* Menu */}
      <ul
        className="flex flex-col overflow-y-auto pr-2"
      >
        {menuItems.map(({ label, icon, href }) => (
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
    </div>
  );
};

export default Sidebar; 