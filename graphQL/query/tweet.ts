
import {graphql} from "../../gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
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
