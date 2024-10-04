import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import MainScreenLayout from "@/components/layout/MainScreenLayout";
import { Tweet } from "@/gql/graphql";
import { followUserMutation, unfollowUserMutation } from "@/graphQL/mutation/user";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const UserProfilePage = () => {
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  const { user } = useGetUserById({ id: router?.query?.id as string });
  const queryClient = useQueryClient();

  const isFollowing = useMemo(() => {
    if (!user || !user.followers) return false;
    return user.followers.findIndex((el) => el?.id === currentUser?.id) > -1; // findIndex returns -1 if not found
  }, [currentUser?.id, user]);

  const handleFollowUser = useCallback(async() => {
    if(!user || !user.id) return 
    await graphqlClient.request(followUserMutation,{to: user.id})
    await queryClient.invalidateQueries({queryKey: ["userById"]});
  },[])

  const handleUnfollowUser =  useCallback(async() => {
    if(!user || !user.id) return 
    await graphqlClient.request(unfollowUserMutation,{to: user.id})
    await queryClient.invalidateQueries({queryKey: ["userById"]});
  },[]);

  return (
    <div>
      <MainScreenLayout>
        <div>
          <nav className="flex items-center gap-3 pl-1 border-b border-slate-600">
            <BsArrowLeftShort className="text-3xl" />
            <div className="p-2">
              <h1 className="text-lg font-bold">
                {user?.firstName + " " + user?.lastName}
              </h1>
              <h1 className="text-md font-bold text-slate-500">
                {user?.tweets?.length} Whispr
              </h1>
            </div>
          </nav>
          <div className="pt-6 p-4 flex items-center gap-4">
            {user && user.profileImageUrl ? (
              <Image
                className="rounded-full"
                src={user?.profileImageUrl}
                alt="user-image"
                height={100}
                width={100}
              />
            ) : (
              <div className="mr-1">
                <RxAvatar className="icon" size="100px" color="white" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">
                {user?.firstName + " " + user?.lastName}
              </h1>
              <p className="text-md text-slate-600">{user?.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 ">
              <p className="text-sm text-slate-400">
                {user?.followers?.length} followers
              </p>
              <p className="text-sm text-slate-400">
                {user?.following?.length} followings
              </p>
            </div>
            {currentUser?.id !== user?.id &&
              (isFollowing ? (
                <button
                  className="text-sm text-black bg-white px-3 py-1 rounded-full"
                  onClick={handleUnfollowUser}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="text-sm text-black bg-white px-3 py-1 rounded-full"
                  onClick={handleFollowUser}
                >
                  Follow
                </button>
              ))}
          </div>
          <div>
            {user?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </MainScreenLayout>
    </div>
  );
};
export default UserProfilePage;
