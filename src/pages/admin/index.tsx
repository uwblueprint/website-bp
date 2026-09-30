import { useState, useEffect, useMemo } from "react";
import { NextPage } from "next";
import { signOut } from "firebase/auth";
import {
  ref,
  get,
  query,
  orderByChild,
  startAfter,
  endBefore,
} from "firebase/database";
import { CSVLink } from "react-csv";
import ApplicationsTable, {
  Student,
} from "@components/admin/ApplicationsTable";
import ProtectedRoute from "@components/context/ProtectedRoute";
import Loading from "@components/common/Loading";
import {
  APPLICATION_OPEN_DATETIME,
  APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD,
  APPLICATION_TERM,
} from "@constants/applications";
import roleSpecificJson from "@constants/role-specific-questions.json";
import { auth, firebaseDb } from "@utils/firebase";
import { useAuth } from "@components/context/AuthUserContext";

const memberRoles = roleSpecificJson.map(({ role }) => role);

const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Academic Term", key: "academicYear" },
  { label: "Program", key: "program" },
  { label: "First Choice Position", key: "firstChoiceRole" },
  { label: "Second Choice Position", key: "secondChoiceRole" },
  {
    label: "Application Link",
    key: "id",
  },
  { label: "Resume Link", key: "resumeLink" },
];

const signOutWithGoogle = async () => {
  signOut(auth);
};

const Admin: NextPage = () => {
  const [roleSelected, setRoleSelected] = useState("default");
  const [students, setStudents] = useState<Student[] | null>(null);
  const { user } = useAuth(); // get the logged in user to trigger

  useEffect(() => {
    get(
      // Only show apps which actually fell within the application window.
      query(
        ref(firebaseDb, "studentApplications"),
        orderByChild("timestamp"),
        startAfter(+APPLICATION_OPEN_DATETIME),
        endBefore(+APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD),
      ),
    )
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
                academicYear: allApps[id].academicYear,
                program: allApps[id].program,
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
  }, [user]);

  const filteredData = useMemo(
    () =>
      students
        ?.filter((app) =>
          [app.firstChoiceRole, app.secondChoiceRole, "default"].includes(
            roleSelected,
          ),
        )
        .sort(({ firstName: fn1 }, { firstName: fn2 }) =>
          fn1 > fn2 ? 1 : fn1 < fn2 ? -1 : 0,
        ) ?? [],

    [students, roleSelected],
  );

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
              data={filteredData.map((app) =>
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
          {students !== null ? (
            <ApplicationsTable students={filteredData} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
