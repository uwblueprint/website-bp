import { useState, useEffect } from "react";
import { NextPage } from "next";
import { signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { CSVLink } from "react-csv";
import ApplicationsTable, {
  Student,
} from "@components/admin/ApplicationsTable";
import ProtectedRoute from "@components/context/ProtectedRoute";
import { APPLICATION_TERM } from "@constants/applications";
import roleSpecificJson from "@constants/role-specific-questions.json";
import { auth, firebaseDb } from "@utils/firebase";

const memberRoles = roleSpecificJson.map(({ role }) => role);

const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Resume Link", key: "resumeLink" },
  {
    label: "Application Link",
    key: "id",
  },
];

const signOutWithGoogle = async () => {
  signOut(auth);
};

const Admin: NextPage = () => {
  const [roleSelected, setRoleSelected] = useState("default");
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    get(ref(firebaseDb, "studentApplications"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allApps = snapshot.val();
          const filteredApps: Student[] = [];
          Object.keys(allApps).forEach((id) => {
            if (allApps[id].term === APPLICATION_TERM) {
              filteredApps.push({
                id,
                firstName: allApps[id].firstName,
                lastName: allApps[id].lastName,
                email: allApps[id].email,
                resumeLink: allApps[id].resumeUrl,
                firstChoiceRole: allApps[id].firstChoiceRole,
                secondChoiceRole: allApps[id].secondChoiceRole,
              });
            }
          });
          setStudents(filteredApps);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl px-4 mx-auto my-8">
        <div className="flex justify-between items-center my-16">
          <img src="/common/logo-with-text-blue.svg" alt="UW Blueprint Logo" />
          <button className="text-blue-100" onClick={signOutWithGoogle}>
            Logout
          </button>
        </div>
        <h2 className="text-blue-100 mb-8">Students</h2>
        <div className="flex justify-between">
          <select
            id="roles"
            name="roles"
            className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
            style={{ minHeight: "25px" }}
            onChange={(e) => setRoleSelected(e.target.value)}
          >
            <option value="default">Select an option</option>
            {memberRoles.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button className="text-blue-100">
            <CSVLink
              data={students.map((app) =>
                Object.assign({}, app, {
                  id: `https://uwblueprint.org/admin/student-details/${app.id}`,
                }),
              )}
              filename={"export.csv"}
              headers={headers}
              target="_blank"
            >
              Export CSV
            </CSVLink>
          </button>
        </div>
        <div className="my-8">
          <ApplicationsTable students={students} roleSelected={roleSelected} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
