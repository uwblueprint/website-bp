import React, { useState } from "react";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="inline-block relative">
      <button
        className="flex items-center bg-sky-200 hover:bg-sky-300 focus:bg-sky py-2 px-4 rounded-md"
        onClick={toggleDropdown}
      >
        Blueprint Application Dashboard
        <svg
          className={`ml-2 h-4 w-4 ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 14l6-6-1.41-1.41L10 11.17l-4.59-4.58L4 8l6 6z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-sky-300 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-sky-300"
              role="menuitem"
            >
              Blueprint Application Dashboard
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
