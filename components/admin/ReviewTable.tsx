import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getReviewTableColumns } from "./ReviewTableColumn";
import ApplicantRole from "entities/applicationRole";
import { ResumeIcon } from "@components/icons/resume.icon";
import { applicationTableQueries } from "graphql/queries";
import { getMuiTheme } from "utils/muidatatable";
import ExpandableRowTable from "./ExpandableRowTable";

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
  useEffect(() => {
    fetchApplicationsByRole();
  }, [activeRole, whichChoiceTab]);

  const fetchApplicationsByRole = async () => {
    const currentRole = activeRole || ApplicantRole.vpe;
    try {
      const firstChoiceResult = await fetchGraphql(
        applicationTableQueries.applicationsByRole,
        {
          role: currentRole,
        },
      );

      const secondChoiceResult = await fetchGraphql(
        applicationTableQueries.applicationsBySecondChoiceRole,
        {
          role: currentRole,
        },
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

  const createStudentRow = (application: any) => {
    const app = application.application;

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
      status: app.status,
      secondChoice: app.secondChoiceRole,
      secondChoiceStatus: app.secondChoiceStatus,
    };
  };

  const getTableRows = () => {
    if (!whichChoiceTab) {
      return firstChoiceApplications.map(createStudentRow);
    }
    return secondChoiceApplications.map(createStudentRow);
  };

  const generateMockInnerData = () => {
    return [
      {
        reviewerName: "John Doe",
        pfsg: 4,
        teamPlayer: 3,
        d2l: 6,
        skill: 5,
        skillCategory: "junior",
        reviewerComments: "Great work presenting your case study.",
      },
      // Add as many objects as you want to simulate different rows
    ];
  };

  const renderExpandableRow = (
    rowData: any,
    rowMeta: { dataIndex: number },
  ) => {
    const innerData = generateMockInnerData(); // Use mock data for testing
    const application = {
      secondChoiceRole: "Graphic Designer",
      adminComments: "Great",
    };

    const innerColumns = [
      {
        name: "Reviewer Name",
        options: { filter: false, sort: false },
      },
      { name: "PFSG", options: { filter: false, sort: false } },
      { name: "Team Player", options: { filter: false, sort: false } },
      { name: "D2L", options: { filter: false, sort: false } },
      { name: "Skill", options: { filter: false, sort: false } },
      {
        name: "Skill Category",
        options: { filter: false, sort: false },
      },
      {
        name: "Reviewer Comments",
        options: { filter: false, sort: false },
      },
      // You may add more columns as needed
    ];

    return (
      <React.Fragment>
        <tr>
          <td colSpan={8} className="p-5 px-10">
            <div className="flex flex-col font-source text-base">
              <ExpandableRowTable data={innerData} columns={innerColumns} />
              <div className="flex items-start p-4 gap-120">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-center items-center gap-5">
                    <span className="text-blue font-semibold">2nd Choice:</span>
                    <p>{application.secondChoiceRole}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-blue font-semibold">
                    Admin Comments:
                  </span>
                  <p>{application.adminComments}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <td colSpan={11} style={{ borderBottom: "1px solid #e0e0e0" }}></td>
      </React.Fragment>
    );
  };

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
          expandableRows: true,
          expandableRowsHeader: false,
          expandableRowsOnClick: true,
          renderExpandableRow: renderExpandableRow,
        }}
      />
    </MuiThemeProvider>
  );
};

export default ReviewTable;
