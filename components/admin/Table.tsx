import React, { FC } from "react";
import DropdownMenu from "./DropdownMenu";
import { Avatar } from "./Profile";
import Tabs from "./Tabs";
import Permissions from "entities/permissions";
import Users from "entities/users";
import RoleHeader from "./RoleHeader";
import TableTitle from "./DashboardTableTitle";
import ApplicationsTable from "./ApplicationsTable";
import ApplicantRole from "entities/applicationRole";

export enum OrganizationalArea {
  Engineering = "Engineering",
  Design = "Design",
  Product = "Product",
  Community = "Community",
}

const Table: FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    OrganizationalArea | undefined
  >();
  const [activeRole, setActiveRole] = React.useState<
    ApplicantRole | undefined
  >();
  const [numFirstChoiceEntries, setNumFirstChoiceEntries] = React.useState<number | undefined>();
  const [numSecondChoiceEntries, setNumSecondChoiceEntries] = React.useState<number | undefined>();
  const [whichChoiceTab, setWhichChoiceTab] = React.useState(0);
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
        <Tabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
        />
      </div>
      <RoleHeader
        activeTab={activeTab}
        setActiveRole={setActiveRole}
        activeRole={activeRole}
      />
      <div className="mx-8">
        <TableTitle 
          numFirstChoiceEntries={numFirstChoiceEntries} 
          numSecondChoiceEntries={numSecondChoiceEntries} 
          setWhichChoiceTab={setWhichChoiceTab} 
          whichChoiceTab={whichChoiceTab}
        />
        <ApplicationsTable
          activeRole={activeRole}
          whichChoiceTab={whichChoiceTab}
          setNumFirstChoiceEntries={setNumFirstChoiceEntries}
          numFirstChoiceEntries={numFirstChoiceEntries}
          setNumSecondChoiceEntries={setNumSecondChoiceEntries}
          numSecondChoiceEntries={numSecondChoiceEntries}
        />
      </div>
    </div>
  );
};

export default Table;
