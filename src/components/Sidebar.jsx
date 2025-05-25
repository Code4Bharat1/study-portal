'use client';

import { useState, useEffect } from 'react';

const Sidebar = ({ menuItems }) => {
  const [selected, setSelected] = useState(menuItems[0]?.label || "");

  useEffect(() => {
    if (menuItems.length > 0 && menuItems[0].onClick) {
      setSelected(menuItems[0].label)
      menuItems[0].onClick();
    }
  }, [menuItems]);

  return (
    <div className="bg-white text-black px-2 h-[calc(100vh-11rem)] sticky top-25 flex flex-col ">
      <ul className="flex flex-col overflow-y-auto pr-2 space-y-2">
        {menuItems.map(({ label, icon, href, onClick }, index) => {
          const isSelected = selected === label;

          return (
            <label
              key={`${label}-${index}`}
              htmlFor={label}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-all duration-200 ease-in-out
                ${isSelected ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <input
                id={label}
                type="radio"
                name="sidebar-items"
                value={label}
                checked={isSelected}
                onChange={() => {
                  setSelected(label);
                  onClick();
                }}
                className="hidden"
              />
              {icon}
              {label}
            </label>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;