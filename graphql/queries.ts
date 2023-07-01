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
};

// TODO: add functionaltiy to getRole in case accessToken expired and needs to be refreshed.
// This can be done with adding backend middleware and passing refresh token into getRole
export const queries = {
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
};
