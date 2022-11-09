import { NextPage } from "next";
import ProtectedRoute from "@components/context/ProtectedRoute";
import ApplicationsTable from "@components/admin/ApplicationsTable";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  resumeLink: string;
  detailsLink: string;
}

const TABLE_MOCK_DATA: Student[] = [
  // left this here for easier testing
  // we would replace this with data fetching functionality
  {
    id: 1,
    firstName: "Evan",
    lastName: "Wong",
    email: "evanwong@uwblueprint.org",
    resumeLink: "asdlf.com",
    detailsLink: "asdf",
  },
  {
    id: 2,
    firstName: "Evan",
    lastName: "Wongd",
    email: "evanwondg@uwblueprint.org",
    resumeLink: "asdlf.com",
    detailsLink: "asdf",
  },
];

const Admin: NextPage = () => {
  return (
    <ProtectedRoute>
      <>
        Admin Page
        <ApplicationsTable Students={TABLE_MOCK_DATA} />
      </>
    </ProtectedRoute>
  );
};

export default Admin;
