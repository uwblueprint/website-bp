import React, { FC } from "react";
import RowHeader from "./RowHeader";
import TableTitle from "./TableTitle";

const Table: FC = () => {
  return (
    <div className="px-8">
      <TableTitle />
      <RowHeader />
    </div>
  );
};

export default Table;
