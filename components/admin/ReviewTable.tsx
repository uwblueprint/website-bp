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
  edit?: boolean;
  toggleEdit?: () => void;
}

const ReviewTable: React.FC<TableProps> = ({
  activeRole,
  whichChoiceTab,
  setNumFirstChoiceEntries,
  setNumSecondChoiceEntries,
  edit,
  toggleEdit,
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

  const generateInnerData = (dataindex: number): any => {
    const reviewerScore = firstChoiceApplications[dataindex].reviewDashboards;
    const reviewer = firstChoiceApplications[dataindex].reviewers;

    const firstScore =  reviewerScore[0];
    const secondScore = reviewerScore[1];
      
    const firstReviewer = reviewer[0];
    const secondReviewer = reviewer[1];

    if (!firstReviewer || !secondReviewer) {
      return [{},{}];
    }

    const collectedReviewers = [
      {
      "Reviewer Name": firstReviewer.firstName + " " + firstReviewer.lastName,
      PFSG: firstScore.passionFSG,
      "Team Player": firstScore.teamPlayer, 
      D2L: firstScore.desireToLearn,
      Skill: firstScore.skill,
      "Total Score": firstScore.passionFSG + firstScore.teamPlayer + firstScore.desireToLearn + firstScore.skill,
      "Skill Category": firstScore.skillCategory,
      "Reviewer Comments": firstScore.reviewerComments,
      },
      {
        "Reviewer Name": secondReviewer.firstName + " " + secondReviewer.lastName,
        PFSG: secondScore.passionFSG,
        "Team Player": secondScore.teamPlayer, 
        D2L: secondScore.desireToLearn,
        Skill: secondScore.skill,
        "Total Score": secondScore.passionFSG + secondScore.teamPlayer + secondScore.desireToLearn + secondScore.skill,
        "Skill Category": secondScore.skillCategory,
        "Reviewer Comments": secondScore.reviewerComments,
      },
    ]

    //const [reviewers, setReviewer] = useState(collectedReviewers);

    return (collectedReviewers);
  };

  const renderExpandableRow = (
    rowData: any,
    rowMeta: { dataIndex: number },
  ) => {
    const reviewers = generateInnerData(rowMeta.dataIndex); 
    const application = {
      secondChoiceRole: "Graphic Designer",
      recommendForSecondChoice: true,
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
        name: "Total Score",
        options: { filter: false, sort: false },
      },
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
              <ExpandableRowTable data={reviewers} columns={innerColumns} edit={edit} toggleEdit={toggleEdit}/>
              <div className="flex items-start p-4 gap-120">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-center items-center gap-5">
                    <span className="text-blue font-semibold">2nd Choice:</span>
                    <p>{application.secondChoiceRole}</p>
                  </div>

                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={application.recommendForSecondChoice}
                      // onChange logic here
                    />
                    <span className="ml-2">Recommend for 2nd Choice</span>
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
