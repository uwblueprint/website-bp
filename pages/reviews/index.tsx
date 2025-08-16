// import { useState, useEffect } from "react";
import { NextPage } from "next";
import Table from "@components/admin/Table";
// import {
//   ref,
//   get,
//   query,
//   orderByChild,
//   startAfter,
//   endBefore,
// } from "firebase/database";
// import { Student } from "@components/admin/ApplicationsTable";
import ProtectedRoute from "@components/context/ProtectedRoute";
import ReviewsLandingPage from "@components/admin/ReviewsLandingPage";
// import {
//   APPLICATION_OPEN_DATETIME,
//   APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD,
//   APPLICATION_TERM,
// } from "@constants/applications";
// import { firebaseDb } from "@utils/firebase";

const Reviews: NextPage = () => {
  return (
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <div>
        <ReviewsLandingPage />
      </div>
    </ProtectedRoute>
  );
};

export default Reviews;
