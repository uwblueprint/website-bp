export interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

export type Role = "Admin" | "User";

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  role: Role;
};
