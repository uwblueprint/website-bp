import Permissions from "./permissions";

type Users = {
  id: string; // primary key of Postgres DB
  email: string; // string
  name: string; // string
  role: Permissions; //enum
  profile_picture: string; // Firebase Profile Picture
};
export default Users;
