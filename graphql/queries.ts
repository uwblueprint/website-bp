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
      id
      firstName
      lastName
      email
      role
      position
      accessToken
      refreshToken
    }
  }`,
  reportReviewConflict: `
    mutation reportReviewConflict(
      $applicantRecordId: String!
      $reviewerId: Int!
    ) {
      reportReviewConflict(
        applicantRecordId: $applicantRecordId
        reviewerId: $reviewerId
      ) {
        applicantRecordId
        reviewerId
        status
        score
        reviewerHasConflict
      }
    }
  `,
  refresh: `
  mutation refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken)
  }
`,
  updateInterviewGroup: `
    mutation UpdateInterviewGroup($id: ID!, $status: String!, $schedulingLink: String!) {
      updateInterviewGroup(id: $id, status: $status, schedulingLink: $schedulingLink) {
        schedulingLink
        status
      }
    }
  `,
  changeRating: `
    mutation changeRating($id: String!, $ratingToBeChanged: String!, $newValue: Int!) {
      changeRating(id: $id, ratingToBeChanged: $ratingToBeChanged, newValue: $newValue) {
        id
      }
    }
  `,
  modifyFinalComments: `
    mutation modifyFinalComments($id: String!, $newComments: String!, $newSkillCategory: String!, $newRecommendedSecondChoice: String!) {
      modifyFinalComments(id: $id, newComments: $newComments, newSkillCategory: $newSkillCategory, newRecommendedSecondChoice: $newRecommendedSecondChoice) {
        id
      }
    }
  `,
};

// TODO: add functionaltiy to getRole in case accessToken expired and needs to be refreshed.
// This can be done with adding backend middleware and passing refresh token into getRole
export const queries = {
  isAuthorizedByRole: `
  query isAuthorizedByRole($accessToken: String!, $roles: [Role!]!) {
      isAuthorizedByRole(accessToken: $accessToken, roles: $roles)
  }
  `,
  getInterviewGroup: `
    query GetInterviewGroup($id: ID!) {
      getInterviewGroup(id: $id) {
        schedulingLink
        status
      }
    }
  `,
  getInterviewersByGroupId: `
    query GetInterviewersByGroupId($groupId: ID!) {
      getInterviewersByGroupId(groupId: $groupId) {
        id
        firstName
        lastName
        email
        profilePictureFileId
      }
    }
  `,
  getInterviewedApplicantsByGroupId: `
    query GetInterviewedApplicantsByGroupId($groupId: ID!) {
      getInterviewedApplicantsByGroupId(groupId: $groupId) {
        firstName
        lastName
      }
    }
  `,
};
