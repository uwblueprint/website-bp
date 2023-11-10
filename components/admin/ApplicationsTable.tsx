import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getApplicationTableColumns } from "./ApplicationsTableColumn";
import ApplicantRole from "entities/applicationRole";
import { useRouter } from "next/router";
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
  whichChoiceTab?: number;
  setNumFirstChoiceEntries: (tab: number) => void;
  numFirstChoiceEntries?: number;
  setNumSecondChoiceEntries: (tab: number) => void;
  numSecondChoiceEntries?: number;
}

const ApplicationsTable: React.FC<TableProps> = ({
  activeRole,
  whichChoiceTab,
  setNumFirstChoiceEntries,
  setNumSecondChoiceEntries
}) => {
  const [firstChoiceApplications, setFirstChoiceApplications] = useState<any[]>([]);
  const [secondChoiceApplications, setSecondChoiceApplications] = useState<any[]>([]);
  useEffect(() => {
    fetchApplicationsByRole();
  }, [activeRole, whichChoiceTab]);

  const fetchApplicationsByRole = async () => {
    const firstChoiceResult = await fetchGraphql(
      applicationTableQueries.applicationsByRole,
      {
        role: activeRole || ApplicantRole.vpe,
      },
    );

    const secondChoiceResult = await fetchGraphql(
      applicationTableQueries.applicationsBySecondChoiceRole,
      {
        role: activeRole || ApplicantRole.vpe,
      },
    );
    setFirstChoiceApplications(firstChoiceResult.data.applicationTable);
    setNumFirstChoiceEntries(firstChoiceResult.data.applicationTable.length);

    setSecondChoiceApplications(secondChoiceResult.data.secondChoiceRoleApplicationTable);
    setNumSecondChoiceEntries(secondChoiceResult.data.secondChoiceRoleApplicationTable.length);
  };

  const router = useRouter();

  const createStudentRow = (application: any) => {
    const app = application.application;
    const reviewers = application.reviewers;

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
      reviewerOne:
        reviewers?.length >= 1
          ? `${reviewers[0].firstName} ${reviewers[0].lastName}`
          : "",
      reviewerTwo:
        reviewers?.length >= 2
          ? `${reviewers[1].firstName} ${reviewers[1].lastName}`
          : "",
      status: app.status,
      secondChoice: app.secondChoiceRole,
      secondChoiceStatus: app.secondChoiceStatus,
    };
  };

  const getTableRows = () => {
    if (!whichChoiceTab) {
      return firstChoiceApplications.map(createStudentRow)
    }
    return secondChoiceApplications.map(createStudentRow)

  }

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title=""
        data={getTableRows()}
        columns={getApplicationTableColumns()}
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
