import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphQL/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => {
            return graphqlClient.request(getCurrentUserQuery)
        }
    })
    
    return {...query, user: query.data?.getCurrentUser}
}