import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import { verifyUserGoogleTokenQuery } from "@/graphQL/query/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface SideBarButton {
  title: string;
  icon: React.ReactNode;
}
const sideBarMenu: SideBarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notification",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  const handleGoogleToken = useCallback(async (creds: CredentialResponse) => {
    const googleToken = creds.credential;
    if (!googleToken) {
      toast.error("Inavlid ID");
      return;
    }
    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    );
    if (verifyGoogleToken) {
      window.localStorage.setItem("AuthToken", verifyGoogleToken);
      toast.success("User verified");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    } else toast.error("Unable to verify user");
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 px-52 w-screen h-screen">
        <div className="col-span-3 pt-8 pr-4 w-full relative">
          <div className="whisprIcon text-4xl hover:bg-gray-800 h-fit w-fit rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="sidebarMenu mt-4 text-xl font-semibold pr-4 ">
            <ul>
              {sideBarMenu.map(({ title, icon }) => (
                <li
                  key={title}
                  className="flex justify-start items-center gap-4  mt-2 hover:bg-gray-800 w-fit px-5 py-2 rounded-full"
                >
                  <span>{icon} </span>
                  <span>{title} </span>
                </li>
              ))}
            </ul>
            <div className="addTweet mt-4">
              <button className="bg-[#1d9bf0] rounded-full w-full p-2 text-lg">
                Whispr
              </button>
            </div>
            <div className="absolute bottom-5 flex items-center gap-4 bg-slate-900 px-3 py-2 rounded-full">
              {user && user.profileImageUrl ? (
                <Image
                  className="rounded-full"
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              ) : (
                <div>
                  {" "}
                  <RxAvatar
                    className="icon"
                    style={{
                      border: "0.2px",
                    }}
                    size="50px"
                    color="white"
                  />{" "}
                </div>
              )}
              {user && (
                <div className="flex gap-2">
                  <h3>{user?.firstName}</h3>
                  <h3>{user?.lastName}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[0.2px] border-l-[0.2px] border-gray-600 h-screen overflow-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />

          <FeedCard />
        </div>
        {!user && (
          <div className="col-span-3">
            <div className="googleSignin p-5 bg-slate-800">
              <h1 className="my-2 text-xl">New to twitter?</h1>
              <GoogleLogin onSuccess={handleGoogleToken} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
