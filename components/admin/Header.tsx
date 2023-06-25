import React, { FC } from "react";
import DropdownMenu from "./DropdownMenu";
import { Avatar } from "./Profile";
import Tabs from "./Tabs";
import Permissions from "entities/permissions";
import Users from "entities/users";
import RoleHeader from "./RoleHeader";

export enum OrganizationalArea {
  Engineering = "Engineering",
  Design = "Design",
  Product = "Product",
  Community = "Community",
}

const Header: FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    OrganizationalArea | undefined
  >();

  const user: Users = {
    id: "1",
    name: "Chris Abey",
    email: "chrisabey@uwblueprint.org",
    role: Permissions.admin,
    profile_picture:
      "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fw23headshots%2FDev_Chris_Abey.jpg?alt=media&token=97630484-8ce5-49da-b77c-4190028a9abb",
  };
  return (
    <div>
      <div className="shadow-md">
        <div className="px-8 bg-sky-100 py-3 header-container flex justify-between items-center">
          <div className="flex items-center">
            <a href="/admin" aria-label="Return to home">
              <img
                src="/common/logo-with-text-blue.svg"
                alt="UW Blueprint Logo"
                style={{ paddingRight: 20 }}
              />
            </a>
            <DropdownMenu />
          </div>
          <div className="flex items-center space-x-4">
            <Avatar {...user} />
          </div>
        </div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      </div>
      <RoleHeader activeTab={activeTab} />
    </div>
  );
};

export default Header;
