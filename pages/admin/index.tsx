import { useState, useEffect, useMemo } from "react";
import { NextPage } from "next";
import Table from "@components/admin/Table";
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
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <div>
        <Table />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
