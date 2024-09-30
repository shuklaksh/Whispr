import { graphqlClient } from "@/clients/api"
import { CreateTweet } from "@/gql/graphql"
import { createTweetMutation } from "@/graphQL/mutation/tweet"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet= () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (payload: CreateTweet) => 
            graphqlClient.request(createTweetMutation,{payload}),
            onMutate: () => toast.loading("Creating Whispr",{id:"1"}), 
            onSuccess: async () => {
                await queryClient.invalidateQueries({queryKey: ['allTweets']})
                toast.success("succesfully added",{id: "1"})
            }
        })
    
    return mutation; 
}