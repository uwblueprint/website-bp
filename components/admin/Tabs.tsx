import React, { FC } from "react";
import Users from "../../entities/users";
import Permissions from "../../entities/permissions";

interface NavbarProps {
  user: Users;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  let tabs: string[] = [];

  if (user.role === Permissions.admin) {
    tabs = ["Engineering", "Design", "Product", "Community"];
  } else if (user.role === Permissions.vpe) {
    tabs = ["Engineering"];
  } else if (user.role === Permissions.vpd) {
    tabs = ["Design"];
  } else if (user.role === Permissions.vpp) {
    tabs = ["Product"];
  } else if (user.role === Permissions.community) {
    tabs = ["Community"];
  } else {
    tabs = [];
  }

  const tabStyle =
    "px-3 py-2 font-light text-gray-700 rounded-3xl hover:text-blue hover:bg-sky hover:shadow-md transition-colors duration-300";
  const activeTabStyle = "text-charcoal";

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {tabs.map((tab) => (
                  <a
                    key={tab}
                    href="#"
                    className={`${tabStyle} hover:text-blue ${activeTabStyle} font-poppins`}
                  >
                    {tab}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
