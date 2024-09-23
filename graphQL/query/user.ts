import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      profileImageUrl
    }
  }
`);
