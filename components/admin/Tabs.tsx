import React, { FC } from "react";
import Users from "../../entities/users";
import Permissions from "../../entities/permissions";

interface NavbarProps {
  user: Users;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Navbar: FC<NavbarProps> = (props) => {
  let tabs: string[] = [];

  if (props.user.role === Permissions.admin) {
    tabs = ["Engineering", "Design", "Product", "Community"];
  } else if (props.user.role === Permissions.vpe) {
    tabs = ["Engineering"];
  } else if (props.user.role === Permissions.vpd) {
    tabs = ["Design"];
  } else if (props.user.role === Permissions.vpp) {
    tabs = ["Product"];
  } else if (props.user.role === Permissions.community) {
    tabs = ["Community"];
  } else {
    tabs = [];
  }

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
                  onClick={() => props.setActiveTab(tab)}
                  key={tab}
                  className={`${tabStyle} font-poppins ${
                    props.activeTab === tab ? activeTabStyle : ""
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
