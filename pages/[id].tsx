import FeedCard from "@/components/FeedCard";
import MainScreenLayout from "@/components/layout/MainScreenLayout";
import { Tweet } from "@/gql/graphql";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const UserProfilePage = () => {
  const router = useRouter();
  const {user} = useGetUserById({id: router?.query?.id as string})
 
  return    (
    <div>
      <MainScreenLayout>
        <div>
          <nav className="flex items-center gap-3 pl-1 border-b border-slate-600">
            <BsArrowLeftShort className="text-3xl" />
            <div className="p-2">
              <h1 className="text-lg font-bold">{user?.firstName + " " + user?.lastName}</h1>
              <h1 className="text-md font-bold text-slate-500">{user?.tweets?.length} Whispr</h1>
            </div>
          </nav>
          <div className="pt-6 p-4 border-b border-slate-600 flex items-center gap-4">
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
              <h1 className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</h1>
              <p className="text-md text-slate-600">{user?.email}</p>
            </div>
           
          </div>
          <div>
            {
                user?.tweets?.map((tweet) => 
                    <FeedCard key={tweet?.id} data={tweet as Tweet}/>
                  )
            }
          </div>
        </div>
      </MainScreenLayout>
    </div>
  );
};
export default UserProfilePage;
