import { useState, useEffect } from "react";
import { NextPage } from "next";
import Header from "@components/admin/Header";
import Table from "@components/admin/ApplicationDashboardTable";
import {
  ref,
  get,
  query,
  orderByChild,
  startAfter,
  endBefore,
} from "firebase/database";
import { Student } from "@components/admin/ApplicationsTable";
import ProtectedRoute from "@components/context/ProtectedRoute";
import {
  APPLICATION_OPEN_DATETIME,
  APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD,
  APPLICATION_TERM,
} from "@constants/applications";
import { firebaseDb } from "@utils/firebase";

const Admin: NextPage = () => {
  const [, setStudents] = useState<Student[] | null>(null);

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
  }, []);

  return (
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <div>
        <Header />
        <Table />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
