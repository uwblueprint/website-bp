import React, { FC } from "react";
import TableTitle from "./ApplicationDashboardTableTitle";
import ApplicationsTable from "./ApplicationsTable";

const Table: FC = () => {
  return (
    <div className="px-8">
      <TableTitle />
      <ApplicationsTable />
    </div>
  );
};

export default Table;
