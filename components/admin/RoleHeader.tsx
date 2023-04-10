import React, { FC, useState, useEffect } from "react";
import ApplicantRole from "entities/applicationRole";

interface RoleHeaderProps {
  activeTab: string;
}

const RoleHeader: FC<RoleHeaderProps> = (props) => {
  const [activeRole, setActiveRole] = useState<ApplicantRole | null>(null);
  const [roles, setRoles] = useState<ApplicantRole[]>([]);

  useEffect(() => {
    if (roles.length > 0) {
      setActiveRole(roles[0]);
    }
  }, [roles]);

  useEffect(() => {
    let newRoles: ApplicantRole[] = [];

    if (props.activeTab === "Engineering") {
      newRoles = [ApplicantRole.vpe, ApplicantRole.pl, ApplicantRole.dev];
    } else if (props.activeTab === "Design") {
      newRoles = [
        ApplicantRole.vpd,
        ApplicantRole.design_mentor,
        ApplicantRole.graphic_design,
        ApplicantRole.product_design,
        ApplicantRole.uxr,
      ];
    } else if (props.activeTab === "Product") {
      newRoles = [ApplicantRole.vpp, ApplicantRole.pm];
    } else if (props.activeTab === "Community") {
      newRoles = [
        ApplicantRole.pres,
        ApplicantRole.vpt,
        ApplicantRole.vp_ext,
        ApplicantRole.vp_int,
        ApplicantRole.vp_comms,
        ApplicantRole.vp_scoping,
        ApplicantRole.vp_finance,
      ];
    }

    setRoles(newRoles);
  }, [props.activeTab]);

  const tabStyle =
    "border-2 border-pink-500 rounded-full text-pink-500 text-center px-4 m-2 inline-block capitalize";
  const activeTabStyle =
    "border-2 border-pink-500 rounded-full text-white text-center px-4 m-2 inline-block capitalize bg-pink-500";

  return (
    <div
      className="px-8 py-10 flex items-center"
      style={{ height: "44px", display: "flex", alignItems: "center" }}
    >
      <h4 className="font-poppins font-medium pr-2">Roles</h4>
      <div>
        {roles.map((role) => (
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
