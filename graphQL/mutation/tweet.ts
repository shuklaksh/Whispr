import { graphql } from "../../gql"

export const createTweetMutation = graphql(`#graphql
    mutation CreateTweet($payload: CreateTweet!) {
        createTweet(payload: $payload) {
            id
        }
    }
    `)