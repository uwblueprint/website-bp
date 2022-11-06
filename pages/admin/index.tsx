import { NextPage } from "next";
import ProtectedRoute from "@components/context/ProtectedRoute";

const Admin: NextPage = () => {
  return (
    <ProtectedRoute>
      <>Admin Page</>
    </ProtectedRoute>
  );
};

export default Admin;
