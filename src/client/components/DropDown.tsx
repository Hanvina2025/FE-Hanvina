import React, { useEffect, useRef } from "react";

export default function Dropdown({ locations, onSelect, selected, setIsShowDropdown }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsShowDropdown]);

  return (
    <div ref={dropdownRef} className="w-72 rounded-xl bg-white p-2 shadow-2xl">
      <div className="max-h-80 overflow-y-auto">
        {locations.map((airline) => (
          <label
            key={airline.id}
            className="flex items-center gap-2 px-3 py-3 border-b border-dotted border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="airline"
              value={airline.id}
              checked={selected === airline.id}
              onChange={() => onSelect(airline.id)}
              className="custom-radio appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-red-600 checked:bg-red-600 transition duration-200"
            />
            <span className="text-sm text-gray-800">{airline.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
