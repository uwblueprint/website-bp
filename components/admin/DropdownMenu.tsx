import React, { useState } from "react";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="inline-block relative">
      <select
        className="text-2xl text-blue font-poppins font-medium border-0 form-control pl-0"
        onClick={toggleDropdown}
      >
        <option className="origin-top-right absolute right-0 mt-2 w-full ">
          Blueprint Application Dashboard
        </option>
      </select>
    </div>
  );
};

export default DropdownMenu;
