"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type NavMenuContextValue = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export function NavMenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);
  return (
    <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
  );
}

export function useNavMenu() {
  const ctx = useContext(NavMenuContext);
  if (!ctx) {
    throw new Error("useNavMenu must be used within NavMenuProvider");
  }
  return ctx;
}
