import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string, {
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
