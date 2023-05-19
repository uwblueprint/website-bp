import React, { FC, useEffect, useState } from "react";
import Users from "../../entities/users";
import Permissions from "../../entities/permissions";

interface NavbarProps {
  user: Users;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Navbar: FC<NavbarProps> = ({ user, setActiveTab, activeTab }) => {
  const getTabs = () => {
    if (user.role === Permissions.admin) {
      return ["Engineering", "Design", "Product", "Community"];
    } else if (user.role === Permissions.vpe) {
      return ["Engineering"];
    } else if (user.role === Permissions.vpd) {
      return ["Design"];
    } else if (user.role === Permissions.vpp) {
      return ["Product"];
    } else if (user.role === Permissions.community) {
      return ["Community"];
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

  return (
    <nav className="-ml-2 bg-gray-800 px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="hidden md:block">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
