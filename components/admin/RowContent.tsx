import React, { FC, useState, useEffect } from "react";

const queries = {
  applicationsByRole: `
            query applicationsByRole($firstChoice: String!) {
              applicationsByRole(firstChoice: $firstChoice) {
                id
                firstName
                lastName
                academicYear
                resumeUrl
                program
                status
              }
            }
          `,
  dashboardsByApplicationId: `
          query dashboardsByApplicationId($applicationId: Int!) {
            dashboardsByApplicationId(applicationId: $applicationId) {
                reviewerEmail
                passionFSG
                teamPlayer
                desireToLearn
                skillCategory
            }
          }
        `,
};

const RowContent: FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [dashboards, setDashboards] = useState<any[]>([]);
  useEffect(() => {
    applications.map((app) => {
      dashboardsByApplicationId();
    });
  }, [applications]);

  useEffect(() => {
    applicationsByRole();
  }, []);

  const applicationsByRole = () => {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.applicationsByRole,
        variables: {
          firstChoice: "project developer",
        },
      }),
    }).then(
      async (res) =>
        await res
          .json()
          .then((result) => setApplications(result.data.applicationsByRole)),
    );
  };
  const dashboardsByApplicationId = () => {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.dashboardsByApplicationId,
        variables: {
          applicationId: 1,
        },
      }),
    }).then(
      async (res) =>
        await res
          .json()
          .then((result) =>
            setDashboards(result.data.dashboardsByApplicationId),
          ),
    );
  };
  return (
    <div>
      {/* {applications.map((app) => app)} */}
      {dashboards.map((dashboard) => dashboard.reviewerEmail)}
    </div>
  );
};
export default RowContent;
