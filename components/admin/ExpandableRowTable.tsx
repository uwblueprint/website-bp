// InnerTableComponent.tsx
import React from "react";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";
import { getExpandableRowMuiTheme } from "utils/muidatatable";
import { MuiThemeProvider } from "@material-ui/core";

type ReviewerData = {
  reviewerName: string;
  pfsg: number;
  teamPlayer: number;
  d2l: number;
  skill: number;
  skillCategory: string;
  reviewerComments: string;
};

interface InnerTableProps {
  data: ReviewerData[];
  columns: MUIDataTableColumn[];
}

const ExpandableRowTable: React.FC<InnerTableProps> = ({ data, columns }) => {
  const options: MUIDataTableOptions = {
    filter: false,
    print: false,
    download: false,
    search: false,
    viewColumns: false,
    pagination: false,
    selectableRows: "none",
  };

  return (
    <MuiThemeProvider theme={getExpandableRowMuiTheme()}>
      <MUIDataTable title="" data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  );
};

export default ExpandableRowTable;
