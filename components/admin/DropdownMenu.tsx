import React, { useState } from "react";

const DropdownMenu: React.FC<{ onChange?: (value: string) => void }> = ({
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="w-min">
      <select
        className="text-2xl text-blue font-poppins font-medium border-0 form-control pl-0"
        onClick={toggleDropdown}
        onChange={handleOptionChange}
      >
        <option value="Delegation Dashboard">Delegation Dashboard</option>
        <option value="Review Dashboard">Review Dashboard</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
