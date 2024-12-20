
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { verifyUserGoogleTokenQuery } from "@/graphQL/query/user";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface TwitterlayoutProps {
  children: React.ReactNode;
}

const MainScreenLayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [user?.id]
  );

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const toastId = toast.loading('Verifying...');
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.dismiss(toastId)
      toast.success("Verified Success");

      if (verifyGoogleToken)
        window.localStorage.setItem("AuthToken", verifyGoogleToken);

      await queryClient.invalidateQueries({queryKey: ["curentUser"]});
      location.reload(); //temporary
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold ounded-full w-full p-2 text-lg rounded-full ">
                  Whispr
                </button>
              </div>
            </div>
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
                <div className="mr-1">
                  <RxAvatar
                    className="icon"
                    size="30px"
                    color="white"
                  />
                </div>
              )}
              {user && (
                <div className="hidden sm:flex  gap-2">
                  <h3>{user?.firstName}</h3>
                  <h3>{user?.lastName}</h3>
                </div>
              )}
            </div>
        </div>
        <div className="col-span-10 sm:col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll no-scrollbar border-gray-600">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-center text-xl">New to Whispr?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainScreenLayout;