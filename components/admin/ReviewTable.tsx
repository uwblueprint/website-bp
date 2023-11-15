import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getReviewTableColumns } from "./ReviewTableColumn";
import ApplicantRole from "entities/applicationRole";
import { ResumeIcon } from "@components/icons/resume.icon";
import { applicationTableQueries } from "graphql/queries";
import { getMuiTheme } from "utils/muidatatable";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  academicYear: string;
  program: string;
  resumeLink: string;
  firstChoiceRole: string;
  secondChoiceRole: string;
};

interface TableProps {
  activeRole?: ApplicantRole;
  setNumEntries: (tab: number) => void;
  numEntries?: number;
}

const ApplicationsTable: React.FC<TableProps> = ({
  activeRole,
  setNumEntries,
}) => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchApplicationsByRole();
  }, [activeRole]);

  const fetchApplicationsByRole = async () => {
    const result = await fetchGraphql(
      applicationTableQueries.applicationsByRole,
      {
        role: activeRole || ApplicantRole.vpe,
      },
    );
    setApplications(result.data.applicationTable);
    setNumEntries(result.data.applicationTable.length);
  };

  const createStudentRow = (application: any) => {
    const app = application.application;
    const skills = application.reviewDashboards;

    return {
      id: app.id,
      name: app.firstName + " " + app.lastName,
      resume: (
        <a target="_blank" href={app.resumeUrl} className="flex items-center">
          <ResumeIcon />
          <span className="ml-2 underline">View Resume</span>
        </a>
      ),
      term: app.academicYear,
      program: app.program,
      score: skills.passionFSG,
      status: app.status,
      skillCategory: skills.skillCategory,
      secondChoice: app.secondChoiceRole,
      secondChoiceStatus: app.secondChoiceStatus,
    };
  };

  const getTableRows = () => applications.map(createStudentRow);

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title=""
        data={getTableRows()}
        columns={getReviewTableColumns()}
        options={{
          search: true,
          viewColumns: false,
          download: false,
          print: false,
          searchPlaceholder: "Search by name, reviewer, status, etc...",
          filter: true,
          selectableRows: "none",
          sortFilterList: true,
        }}
      />
    </MuiThemeProvider>
  );
};

export default ApplicationsTable;
