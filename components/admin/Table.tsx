import React, { FC } from "react";
// import RowHeader from "./RowHeader";
import TableTitle from "./TableTitle";
// import RowContent from "./RowContent";
import ApplicationsTable from "./ApplicationsTable";

const Table: FC = () => {
  return (
    <div className="px-8">
      <TableTitle />
      {/* <RowHeader /> */}
      {/* <RowContent /> */}
      <ApplicationsTable />
    </div>
  );
};

export default Table;