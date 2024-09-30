import { graphqlClient } from "@/clients/api"
import { getAllTweetsQuery } from "@/graphQL/query/tweet"
import { useQuery } from "@tanstack/react-query"

export const useGetTweets= () => {
    const query = useQuery({
        queryKey: ['allTweets'],
        queryFn: () => {
            return graphqlClient.request(getAllTweetsQuery)
        }
    })
    
    return {...query, tweets: query.data?.getAllTweets}
}