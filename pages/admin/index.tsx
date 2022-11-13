import React from "react";
import { NextPage } from "next";
import ProtectedRoute from "@components/context/ProtectedRoute";
import roleSpecificJson from "@constants/role-specific-questions.json";
import ApplicationsTable from "@components/admin/ApplicationsTable";
const memberRoles = roleSpecificJson.map(({ role }) => role);

const Admin: NextPage = () => {
  return (
    <ProtectedRoute>
      <div className="container max-w-4xl px-4 mx-auto my-8">
        <div className="flex justify-between items-center my-16">
          <img src="/common/logo-with-text-blue.svg" alt="UW Blueprint Logo" />
          <button className="text-blue-100">Logout</button>
        </div>
        <h2 className="text-blue-100 mb-8">Students</h2>
        <div className="flex justify-between">
          <select
            id="roles"
            name="roles"
            className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
            style={{ minHeight: "25px" }}
          >
            <option value="" disabled>
              Select an option
            </option>
            {memberRoles.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button className="text-blue-100">Export CSV</button>
        </div>
        <ApplicationsTable students={[]} />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
