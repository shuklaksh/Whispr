import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient("http://localhost:8080/graphql",{
    headers: () => ({
        Authorisation: isClient ? 
        `Bearer ${localStorage.getItem('AuthToken')}`
        : ""
})
});
