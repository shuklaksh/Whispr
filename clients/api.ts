import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient("https://d23hxlxrcyy445.cloudfront.net/graphql", {
  headers: () => {
    let token = isClient ? localStorage.getItem('AuthToken') : null;
    if (token) {
        token = token.replace(/['"]+/g, ''); // Remove any quotes around the token
      }
    return {
      Authorization: token ? `Bearer ${token}` : "" // Ensure no quotes around the token
    };
  }
});
