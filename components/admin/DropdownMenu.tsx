import React, { useState } from "react";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="inline-block relative">
      <select
        className="flex items-center bg-sky-200 hover:bg-sky-300 py-1 px-4 pr-10 rounded-md border-none focus-visible:ring-2"
        onClick={toggleDropdown}
      >
        <option className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-sky-300 ring-1 ring-black ring-opacity-5">
          Blueprint Application Dashboard
        </option>
      </select>
    </div>
  );
};

export default DropdownMenu;
