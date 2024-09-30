import { graphqlClient } from "@/clients/api"
import { getUserByIdQuery } from "@/graphQL/query/user"
import { useQuery } from "@tanstack/react-query"

export const useGetUserById = (props: {id: string}) => {
    const query = useQuery({
        queryKey: ['userById',props.id],
        queryFn: () => {
            return graphqlClient.request(getUserByIdQuery,{id: props.id})
        }
    })
    
    return {...query, user: query.data?.getUserById}
}