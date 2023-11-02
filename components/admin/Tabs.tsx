import React, { FC, useEffect, useState } from "react";
import Users from "../../entities/users";
import Permissions from "../../entities/permissions";
import { OrganizationalArea } from "./Table";

interface NavbarProps {
  user: Users;
  setActiveTab: (tab: OrganizationalArea) => void;
  activeTab?: OrganizationalArea;
}

const Navbar: FC<NavbarProps> = ({ user, setActiveTab, activeTab }) => {
  const getTabs = () => {
    if (user.role === Permissions.admin) {
      return [
        OrganizationalArea.Engineering,
        OrganizationalArea.Design,
        OrganizationalArea.Product,
        OrganizationalArea.Community,
      ];
    } else if (user.role === Permissions.vpe) {
      return [OrganizationalArea.Engineering];
    } else if (user.role === Permissions.vpd) {
      return [OrganizationalArea.Design];
    } else if (user.role === Permissions.vpp) {
      return [OrganizationalArea.Product];
    } else if (user.role === Permissions.community) {
      return [OrganizationalArea.Community];
    }

    return [];
  };

  const [tabs] = useState(getTabs());

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, setActiveTab]);

  const tabStyle =
    "px-4 py-1 font-light text-gray-700 rounded-3xl hover:text-white hover:bg-blue hover:shadow-md transition-colors duration-300";
  const activeTabStyle = "text-white bg-blue shadow-md";

  if (tabs.length <= 1) return <></>;

  return (
    <nav className="-ml-2 bg-gray-800 px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-baseline space-x-4">
          {tabs.map((tab) => (
            <button
              onClick={() => setActiveTab(tab)}
              key={tab}
              className={`${tabStyle} font-poppins ${
                activeTab === tab ? activeTabStyle : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
