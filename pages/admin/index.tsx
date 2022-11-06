import React from "react";
import { NextPage } from "next";
import ProtectedRoute from "@components/context/ProtectedRoute";
import roleSpecificJson from "@constants/role-specific-questions.json";

const memberRoles = roleSpecificJson.map(({ role }) => role);

const Admin: NextPage = () => {
  return (
    <ProtectedRoute>
      <div className="container max-w-4xl px-8 mx-auto mt-7">
        <div className="flex justify-between">
          <h1 className="text-xl text-blue-100 mb-10">UW Blueprint</h1>
          <h1 className="text-xl text-blue-100 mb-10">Logout</h1>
        </div>
        <h1 className="text-6xl font-light text-blue-100 mb-8">Students</h1>
        <div className="flex justify-between">
          <select
            id="roles"
            name="roles"
            className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
            style={{ minHeight: "25px" }}
            required={false}
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
          <h1 className="text-xl text-blue-100 mb-10">Export CSV</h1>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
