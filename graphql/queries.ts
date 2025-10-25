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
  changeRating: `
    mutation changeRating($id: Int!, $ratingToBeChanged: String!, $newValue: Int!) {
      changeRating(id: $id, ratingToBeChanged: $ratingToBeChanged, newValue: $newValue) {
        id
      }
    }
  `
  ,
  modifyFinalComments: `
    mutation modifyFinalComments($id: Int!, $newComments: String!, $newSkillCategory: String!, $newRecommendedSecondChoice: String!) {
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
};
