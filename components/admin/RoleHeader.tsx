import React, { FC, useState, useEffect, useCallback } from "react";
import ApplicantRole from "entities/applicationRole";
import { OrganizationalArea } from "./Header";

interface RoleHeaderProps {
  activeTab?: OrganizationalArea;
}

interface ColourMap {
  bg: string;
  bgHover: string;
  border: string;
  text: string;
}

const RoleHeader: FC<RoleHeaderProps> = ({ activeTab }) => {
  const [activeRole, setActiveRole] = useState<ApplicantRole | null>(null);
  const [colour, setColour] = useState<Partial<ColourMap>>({});
  const [roles, setRoles] = useState<ApplicantRole[]>([]);

  const getActiveRoles = useCallback(() => {
    switch (activeTab) {
      case OrganizationalArea.Engineering:
        return [ApplicantRole.vpe, ApplicantRole.pl, ApplicantRole.dev];
      case OrganizationalArea.Design:
        return [
          ApplicantRole.vpd,
          ApplicantRole.design_mentor,
          ApplicantRole.graphic_design,
          ApplicantRole.product_design,
          ApplicantRole.uxr,
        ];
      case OrganizationalArea.Product:
        return [ApplicantRole.vpp, ApplicantRole.pm];
      case OrganizationalArea.Community:
        return [
          ApplicantRole.pres,
          ApplicantRole.vpt,
          ApplicantRole.vp_ext,
          ApplicantRole.vp_int,
          ApplicantRole.vp_comms,
          ApplicantRole.vp_scoping,
          ApplicantRole.vp_finance,
        ];
      default:
        return [];
    }
  }, [activeTab]);

  const getRoleTabColour = useCallback(() => {
    switch (activeTab) {
      case OrganizationalArea.Engineering:
        return {
          border: "border-org-areas-engineering",
          bg: "bg-org-areas-engineering",
          bgHover: "hover:bg-org-areas-engineering",
          text: "text-org-areas-engineering",
        };
      case OrganizationalArea.Design:
        return {
          border: "border-org-areas-design",
          bg: "bg-org-areas-design",
          bgHover: "hover:bg-org-areas-design",
          text: "text-org-areas-design",
        };
      case OrganizationalArea.Product:
        return {
          border: "border-org-areas-product",
          bg: "bg-org-areas-product",
          bgHover: "hover:bg-org-areas-product",
          text: "text-org-areas-product",
        };
      case OrganizationalArea.Community:
        return {
          border: "border-org-areas-community",
          bg: "bg-org-areas-community",
          bgHover: "hover:bg-org-areas-community",
          text: "text-org-areas-community",
        };
      default:
        return {};
    }
  }, [activeTab]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      setActiveRole(roles[0]);
    }
  }, [roles]);

  useEffect(() => {
    setRoles(getActiveRoles());
    setColour(getRoleTabColour());
  }, [activeTab, getActiveRoles, getRoleTabColour]);

  const tabStyle = `border-2 ${colour.border} rounded-full ${colour.text} text-center px-4 m-2 inline-block capitalize hover:${colour.bg} hover:text-white transition-colors`;
  const activeTabStyle = `border-2 ${colour.border} rounded-full text-white text-center px-4 m-2 inline-block capitalize ${colour.bg}`;

  return (
    <div
      className="px-8 py-10 flex items-center"
      style={{ display: "flex", alignItems: "center" }}
    >
      <h4 className="font-poppins font-medium pr-2">Roles</h4>
      <div>
        {roles?.map((role) => (
          <button
            onClick={() => setActiveRole(role)}
            key={role}
            className={`font-poppins ${
              activeRole === role ? activeTabStyle : tabStyle
            }`}
            style={{ minWidth: "fit-content" }}
          >
            {role?.replace(/vp/g, "VP")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleHeader;
