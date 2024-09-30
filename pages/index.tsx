import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import { verifyUserGoogleTokenQuery } from "@/graphQL/query/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiHash, BiHomeCircle, BiSolidImageAdd, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { useGetTweets } from "@/hooks/useGetTweets";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet } from "@/hooks/useCreateTweet";

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
  const {tweets} = useGetTweets();
  const {mutate} = useCreateTweet();
  const [content,setContent] = useState('');

  const handleAddImage = useCallback(()=> {
    const input = document.createElement('input');
    input.setAttribute("type","file");
    input.setAttribute("accept","image/*");
    input.click();
  },[])

  const handleAddTweet = useCallback(() => {
    mutate({
      content: content
    })
    setContent('');
  },[content, mutate])

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className='border-t border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer'>
            <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
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
                  <RxAvatar
                    className="icon"
                    style={{
                     
                    }}
                    size="30px"
                    color="white"
                  />{" "}
                </div>
              )}
        </div>
        <div className="col-span-11  ">
          <textarea 
          value={content}
          className="w-full bg-transparent px-4 py-1 border-b border-slate-800 text-lg" 
          rows={4}
          placeholder="What's happening?"
          onChange={(e) => setContent(e.target.value)}
          />
          <div className=" flex items-center justify-between mt-2">
          <BiSolidImageAdd onClick={handleAddImage}/>
          <button 
            className="bg-[#1d9bf0] rounded-full py-0.5 px-3 text-sm"
            onClick={handleAddTweet}
            >
                Whispr
          </button>
          </div>
        </div>
            </div>
          </div>
          {
          tweets?.map(tweet => 
            <FeedCard key={tweet?.id} data={tweet as Tweet}/>
          )
          }
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
