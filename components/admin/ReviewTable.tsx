import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getReviewTableColumns } from "./ReviewTableColumn";
import ApplicantRole from "entities/applicationRole";
import { ResumeIcon } from "@components/icons/resume.icon";
import { applicationTableQueries } from "graphql/queries";
import { getMuiTheme } from "utils/muidatatable";
import ReviewOverlay from "./ReviewOverlay"; // 🆕 new component for the full overlay

interface TableProps {
  activeRole?: ApplicantRole;
  whichChoiceTab?: number;
  setNumFirstChoiceEntries: (tab: number) => void;
  numFirstChoiceEntries?: number;
  setNumSecondChoiceEntries: (tab: number) => void;
  numSecondChoiceEntries?: number;
}

const ReviewTable: React.FC<TableProps> = ({
  activeRole,
  whichChoiceTab,
  setNumFirstChoiceEntries,
  setNumSecondChoiceEntries,
}) => {
  const [firstChoiceApplications, setFirstChoiceApplications] = useState<any[]>(
    [],
  );
  const [secondChoiceApplications, setSecondChoiceApplications] = useState<
    any[]
  >([]);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null,
  ); // 🆕

  useEffect(() => {
    fetchApplicationsByRole();
  }, [activeRole, whichChoiceTab]);

  const fetchApplicationsByRole = async () => {
    const currentRole = activeRole || ApplicantRole.vpe;
    try {
      const firstChoiceResult = await fetchGraphql(
        applicationTableQueries.applicationsByRole,
        { role: currentRole },
      );

      const secondChoiceResult = await fetchGraphql(
        applicationTableQueries.applicationsBySecondChoiceRole,
        { role: currentRole },
      );

      setFirstChoiceApplications(firstChoiceResult.data.applicationTable);
      setNumFirstChoiceEntries(firstChoiceResult.data.applicationTable.length);
      setSecondChoiceApplications(
        secondChoiceResult.data.secondChoiceRoleApplicationTable,
      );
      setNumSecondChoiceEntries(
        secondChoiceResult.data.secondChoiceRoleApplicationTable.length,
      );
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleRowClick = (_rowData: any, rowMeta: { dataIndex: number }) => {
    const applications =
      whichChoiceTab === 0 ? firstChoiceApplications : secondChoiceApplications;
    const clickedApp = applications[rowMeta.dataIndex];
    setSelectedApplication(clickedApp); // 🆕 open overlay
  };

  const createStudentRow = (application: any) => {
    const app = application.application;
    const mapToNumericalValue: any = {
      "This is my first time!": "0",
      Once: "1",
      Twice: "2",
      "3 or more": "3+",
    };

    return {
      id: app.id,
      name: app.firstName + " " + app.lastName,
      resume: (
        <a target="_blank" href={app.resumeUrl} className="flex items-center">
          <ResumeIcon />
          <span className="ml-2 underline">View Resume</span>
        </a>
      ),
      timesApplied: mapToNumericalValue[app.timesApplied],
      status: app.status,
    };
  };

  const getTableRows = () => {
    if (!whichChoiceTab) {
      return firstChoiceApplications.map(createStudentRow);
    }
    return secondChoiceApplications.map(createStudentRow);
  };

  return (
    <>
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
            filter: true,
            selectableRows: "none",
            onRowClick: handleRowClick, // 🆕 handle click
            searchPlaceholder: "Search by name, reviewer, status, etc...",
          }}
        />
      </MuiThemeProvider>

      {selectedApplication && (
        <ReviewOverlay
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </>
  );
};

export default ReviewTable;
