'use client';

import { useState, useEffect, useRef } from 'react';

const Sidebar = ({ menuItems }) => {
  const [selected, setSelected] = useState("Introduction");
  const firstInputRef = useRef(null);
  useEffect(() => {
    if (firstInputRef.current) {
      setSelected("Introduction");
      const event = menuItems.find(item => item.label === "Introduction");
      event?.onClick();
      firstInputRef.current = null
    }
  });
  
  return (
    <div className="bg-white text-black p-5 h-[calc(100vh-5.8rem)] sticky top-25 flex flex-col ">
      <ul className="flex flex-col overflow-y-auto pr-2 space-y-2">
        {menuItems.map(({ label, icon, href, onClick }) => {
          const isSelected = selected === label;

          return (
            <label
              key={label}
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
                ref={label.toLowerCase() === "introduction" ? firstInputRef : null}
                onChange={() => {
                  console.log("world")
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