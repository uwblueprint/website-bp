import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getApplicationTableColumns } from "./ApplicationsTableColumn";
import ApplicantRole from "entities/applicationRole";
import { ResumeIcon } from "@components/icons/resume.icon";
import { applicationTableQueries } from "graphql/queries";
import { getMuiTheme } from "utils/muidatatable";

interface TableProps {
  activeRole?: ApplicantRole;
  setNumFirstChoiceEntries: (count: number) => void;
  setNumSecondChoiceEntries: (count: number) => void;
}

const ApplicationsTable: React.FC<TableProps> = ({
  activeRole,
  setNumFirstChoiceEntries,
  setNumSecondChoiceEntries,
}) => {
  const [allApplications, setAllApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchApplicationsByRole();
    console.log("Active Role is: ", activeRole);
  }, [activeRole]);

  const fetchApplicationsByRole = async () => {
    const currentRole = activeRole || ApplicantRole.vpe;
    try {
      const [firstResult, secondResult] = await Promise.all([
        fetchGraphql(applicationTableQueries.applicationsByRole, {
          role: currentRole,
        }),
        fetchGraphql(applicationTableQueries.applicationsBySecondChoiceRole, {
          role: currentRole,
        }),
      ]);

      console.log("First Apps", firstResult.data.applicationTable);
      const firstApps = firstResult.data.applicationTable.map((app: any) =>
        createStudentRow(app, true),
      );
      const secondApps = secondResult.data.secondChoiceRoleApplicationTable.map(
        (app: any) => createStudentRow(app, false),
      );

      setAllApplications([...firstApps, ...secondApps]);

      setNumFirstChoiceEntries(firstApps.length);
      setNumSecondChoiceEntries(secondApps.length);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const createStudentRow = (application: any, isFirstChoice: boolean) => {
    const app = application.application;
    const reviewers = application.reviewers;

    return {
      id: app.id,
      name: `${app.firstName} ${app.lastName}`,
      resume: (
        <a target="_blank" href={app.resumeUrl} className="flex items-center">
          <ResumeIcon />
          <span className="ml-2 underline">View Resume</span>
        </a>
      ),
      term: app.academicYear,
      program: app.program,
      reviewerOne:
        reviewers?.length >= 1
          ? `${reviewers[0].firstName} ${reviewers[0].lastName}`
          : "",
      reviewerTwo:
        reviewers?.length >= 2
          ? `${reviewers[1].firstName} ${reviewers[1].lastName}`
          : "",
      firstChoiceApplication: isFirstChoice ? "Yes" : "No",
      status: app.status,
      firstChoice: app.firstChoiceRole,
      secondChoice: app.secondChoiceRole,
      secondChoiceStatus: app.secondChoiceStatus,
    };
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title=""
        data={allApplications}
        columns={[...getApplicationTableColumns()]}
        options={{
          // search: true,
          viewColumns: false,
          download: false,
          print: false,
          // searchPlaceholder: "Search by name, reviewer, status, etc...",
          // filter: true,
          selectableRows: "none",
          // sortFilterList: true,
        }}
      />
    </MuiThemeProvider>
  );
};

export default ApplicationsTable;
