
import {graphql} from "../../gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        email
        profileImageUrl
      }
    }
  }
`);

export const getSignedUrlQuery = graphql(`#graphql
  query GetSignedUrlQuery($imageType: String!) {
    getSignedURL(imageType: $imageType)
  }
  `)
