import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getApplicationTableColumns } from "./ApplicationsTableColumn";
import { theme } from "../../styles/Theme";
import { LinkIcon } from "@components/icons/link.icon";
import { ResumeIcon } from "@components/icons/resume.icon";
import ApplicantRole from "entities/applicationRole";

const STATUS_BASE_CLASSES = "text-center rounded px-2 py-1";
const SECOND_CHOICE_BASE_CLASSES = "rounded-3xl text-center w-fit px-2";

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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-sky-200`}>Applied</div>
        );
      case "in review":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-yellow-100`}>
            In Review
          </div>
        );
      case "interview":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-green-100`}>Interview</div>
        );
      default:
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-charcoal-300`}>
            Pending
          </div>
        );
    }
  };

  const getSecondChoiceStatusStyle = (status: string) => {
    switch (status) {
      case "n/a":
        return (
          <div
            className={`${SECOND_CHOICE_BASE_CLASSES} text-charcoal-300 border border-red-600`}
          >
            N/A
          </div>
        );
      case "considered":
        return (
          <div
            className={`${SECOND_CHOICE_BASE_CLASSES} text-green-300 border border-green-600`}
          >
            Considered
          </div>
        );
      case "not considered":
        return (
          <div
            className={`${SECOND_CHOICE_BASE_CLASSES} text-red-500 border border-green-600`}
          >
            Not Considered
          </div>
        );
    }
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
        MUIDataTableToolbar: {
          root: {
            display: "none",
          },
        },
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

  const createStudentRow = (application: any) => {
    const app = application.application;
    const reviewers = application.reviewers;

    return {
      name: (
        <a target="_blank" href={app.resumeUrl} className="flex items-center">
          <LinkIcon />
          <span className="ml-2 underline">
            {app.firstName} {app.lastName}
          </span>
        </a>
      ),
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
      status: getStatusStyle(app.status),
      secondChoice: app.secondChoiceRole,
      secondChoiceStatus: getSecondChoiceStatusStyle(app.secondChoiceStatus),
    };
  };

  const getTableRows = () => applications.map(createStudentRow);

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title=""
        data={getTableRows()}
        columns={getApplicationTableColumns()}
      />
    </MuiThemeProvider>
  );
};

export default ApplicationsTable;
