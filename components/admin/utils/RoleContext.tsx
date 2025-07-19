// context/RoleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import ApplicantRole from "entities/applicationRole";

interface RoleContextType {
  activeRole: ApplicantRole;
  setActiveRole: (role: ApplicantRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeRole, setActiveRole] = useState<ApplicantRole>(
    ApplicantRole.vpe,
  );

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
