import React, { FC } from "react";

const RowHeader: FC = () => {
  const columns: string[] = [
    "Name",
    "Application",
    "Term",
    "Program",
    "Reviewer #1",
    "Reviewer #2",
    "Score",
    "Application Status",
  ];
  const sortColumn = (column: string) => {
    // sort by column
    console.log(column);
  };
  const tabStyle =
    "px-4 py-1 rounded-3xl hover:text-white hover:bg-blue hover:shadow-md transition-colors duration-300";
  return (
    <div className="flex items-center py-4 px-8 justify-between bg-charcoal-200">
      <div className="flex items-center">
        <div className="hidden md:block">
          <div className="flex items-baseline space-x-8">
            {columns.map((column) => (
              <button className={tabStyle} onClick={() => sortColumn(column)}>
                <p className="font-bold">{column}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowHeader;
