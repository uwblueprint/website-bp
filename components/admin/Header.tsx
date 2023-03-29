import { FC } from "react";
import DropdownMenu from "./DropdownMenu";
import { Avatar } from "./Profile";
import Tabs from "./Tabs";
import Permissions from "entities/permissions";
import Users from "entities/users";

const Header: FC = () => {
  const user: Users = {
    id: "1",
    name: "Chris Abey",
    email: "chrisabey@uwblueprint.org",
    role: Permissions.admin,
    profile_picture:
      "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fw23headshots%2FDev_Chris_Abey.jpg?alt=media&token=97630484-8ce5-49da-b77c-4190028a9abb",
  };
  return (
    <div className="bg-charcoal-100 px-8 mx-auto py-8">
      <div className="py-3 header-container container flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/common/logo-with-text-blue.svg"
            alt="UW Blueprint Logo"
            style={{ paddingRight: 20 }}
          />
          <DropdownMenu />
        </div>
        <div className="flex items-center space-x-4">
          <Avatar img={user.profile_picture} name={user.name} />
        </div>
      </div>
      <Tabs user={user} />
    </div>
  );
};

export default Header;
