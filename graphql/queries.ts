export const mutations = {
  login: `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              firstName
            }
          }
        `,
  loginWithGoogle: `
  mutation loginWithGoogleFoo {
    loginWithGoogle(idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1YmE5MzEzZmQ3YTdkNGFmYTg0ODg0YWJjYzg0MDMwMDQzNjMxODAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODY2MTM2OTkzMDEzLWtoaWN1bHBxanNkYWUzMmFocmVibjVtZjd0M2dnYnFsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODY2MTM2OTkzMDEzLWtoaWN1bHBxanNkYWUzMmFocmVibjVtZjd0M2dnYnFsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MTc1NDA3NzgwODU3NTA5MTE1IiwiaGQiOiJ1d2JsdWVwcmludC5vcmciLCJlbWFpbCI6InRob21hc3d1QHV3Ymx1ZXByaW50Lm9yZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTm1UU2ZBbjREUWZIa1NicENORlIzdyIsImlhdCI6MTY4NjQ0NDE2MCwiZXhwIjoxNjg2NDQ3NzYwfQ.PDo24UUuVEadY2EEm8l-l-47cfttKR4NALgx6eUxCrC6x8C6qTW7cZwA-PFxIwCBkLuIs1t0GKtsrp8qlzyxf0g7tYhwwNH25Et708Q9PI4_h6WU1GmBkD5AWHxHfu90xFn4Oml-pTijdEWuKnUOBrgwz4J_Ag-1KxxJkR4IFpEZQ_XARlMNfvpzz7UWyC1x96Gfd7PiPA9R5DpEn2qnDc96fOQkLojppUC1FzvhpA1_T0AEuPBVQv5sq7JpK_6tAcleQ5ZsxbSI-kJBGd52IFsXkoareklPjkdPsHQdTw35ge7uAWte-ktxIaX-HBWKFsGEqYpkWnHzcsa1sqZLjg") {
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
};
