import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getApplicationTableColumns } from "./ApplicationsTableColumn";
import { theme } from "../../styles/Theme";
import ApplicantRole from "entities/applicationRole";
import { useRouter } from "next/router";
import { ResumeIcon } from "@components/icons/resume.icon";

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

type StudentRow = {
  name: string;
  resume: React.ReactNode;
  term: string;
  program: string;
  reviewerOne: string;
  reviewerTwo: string;
  score: number;
  status: string;
  secondChoice: string;
  secondChoiceStatus: string;
  skill: string;
};

const queries = {
  applicationsByRole: `
            query applicationTable($role: String!) {
              applicationTable(role: $role) {
                application {
                  id
                  firstName
                  lastName
                  academicYear
                  resumeUrl
                  program
                  status
                  secondChoiceRole
                  secondChoiceStatus
              }
              reviewers {
                  firstName
                  lastName
              }
              reviewDashboards {
                  passionFSG
                  teamPlayer
                  desireToLearn
                  skillCategory
              }
              }
            }
          `,
};

interface TableProps {
  activeRole?: ApplicantRole;
  setNumEntries: (tab: number) => void;
  numEntries?: number;
}

const ApplicationsTable: React.FC<TableProps> = ({
  activeRole,
  setNumEntries,
  numEntries,
}) => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchApplicationsByRole();
  }, [activeRole]);

  const fetchApplicationsByRole = async () => {
    const result = await fetchGraphql(queries.applicationsByRole, {
      role: activeRole || ApplicantRole.vpe,
    });
    setApplications(result.data.applicationTable);
    setNumEntries(result.data.applicationTable.length);
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiPaper: {
          root: {
            border: `1px solid ${theme.colors.greys.border}`,
          },
        },
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            marginBottom: "3em",
          },
          root: {
            fontFamily: "Source Sans Pro",
          },
        },
        MuiTypography: {
          root: {
            fontFamily: "Source Sans Pro !important",
          },
          body1: {
            fontFamily: "Source Sans Pro",
          },
          body2: {
            fontFamily: "Source Sans Pro",
          },
        },
        MuiButtonBase: {
          root: {
            fontFamily: "Source Sans Pro",
          },
        },
        MUIDataTableHeadCell: {
          data: {
            color: theme.colors.near_black,
            fontFamily: "Source Sans Pro",
            fontWeight: 350,
            fontSize: 18,
          },
          sortActive: {
            color: theme.colors.B10,
          },
        },
        MUIDataTableBodyCell: {
          root: {
            color: theme.colors.near_black,
            fontFamily: "Source Sans Pro",
            fontWeight: 350,
            fontSize: 18,
          },
        },
        // MUIDataTableToolbar: {
        //   root: {
        //     display: "",
        //   },
        // },
        MuiTableSortLabel: {
          root: {
            color: `${theme.colors.B10} !important`,
          },
          active: {
            color: theme.colors.B10,
          },
          iconDirectionAsc: {
            color: theme.colors.B10,
          },
        },
        MuiSvgIcon: {
          root: {
            color: `${theme.colors.B10} !important`,
          },
        },
      },
    });

  const router = useRouter();

  const createStudentRow = (application: any) => {
    const app = application.application;
    const reviewers = application.reviewers;

    return {
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

  const getTableRows = () => applications.map(createStudentRow);

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
