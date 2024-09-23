import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient("http://localhost:8080/graphql", {
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
