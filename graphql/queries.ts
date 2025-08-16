export const mutations = {
  login: `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              firstName
            }
          }
        `,
  loginWithGoogle: `mutation loginWithGoogle($idToken: String!) {
    loginWithGoogle(idToken: $idToken) {
      accessToken
      refreshToken
    }
  }`,
  refresh: `
  mutation refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken)
  }
`,
};

// TODO: add functionaltiy to getRole in case accessToken expired and needs to be refreshed.
// This can be done with adding backend middleware and passing refresh token into getRole
export const queries = {
  isAuthorizedAdmin: `
  query isAuthorizedAdmin($accessToken: String!) {
      isAuthorizedAdmin(accessToken: $accessToken)
    }
  `,
  isAuthorizedByRole: `
  query isAuthorizedByRole($accessToken: String!, $roles: [Role!]!) {
      isAuthorizedByRole(accessToken: $accessToken, roles: $roles)
    }
  `,
  isAuthorizedToReview: `
  query isAuthorizedToReview($applicationId: Int!, $reviewerUserId: String!) {
    isAuthorizedToReview(applicationId: $applicationId, reviewerUserId: $reviewerUserId)
  }
  `,
  applicationsById: `
  query applicationsById($id: Int!) {
    applicationsById(id: $id) {
        id
        academicOrCoop
        academicYear
        email
        firstChoiceRole
        firstName
        heardFrom
        lastName
        locationPreference
        program
        timesApplied
        pronouns
        pronounsSpecified
        resumeUrl
        roleSpecificQuestions
        secondChoiceRole
        shortAnswerQuestions
        status
        term
        timesApplied
    }
  }
`,
};

export const applicationTableQueries = {
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
                  timesApplied
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
  applicationsBySecondChoiceRole: `
          query secondChoiceRoleApplicationTable($role: String!) {
            secondChoiceRoleApplicationTable(role: $role) {
              application {
                id
                firstName
                lastName
                academicYear
                resumeUrl
                program
                timesApplied
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
