import FeedCard from "@/components/FeedCard";
import MainScreenLayout from "@/components/layout/MainScreenLayout";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet } from "@/hooks/tweets/useCreateTweet";
import { useGetTweets } from "@/hooks/tweets/useGetTweets";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";



export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useGetTweets();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent('');
  }, [content, mutate]);

  return (
    <div>
      <MainScreenLayout>
        <div>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
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
                  {" "}
                  <RxAvatar
                    className="icon"
                    style={{
                      border: "0.2px",
                    }}
                    size="30px"
                    color="white"
                  />{" "}
                </div>
              )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                  placeholder="What's happening?"
                  rows={3}
                ></textarea>
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-1 px-3 rounded-full"
                  >
                    Whispr
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          tweets?.map(tweet => 
            <FeedCard key={tweet?.id} data={tweet as Tweet}/>
          )
        }
      </MainScreenLayout>
    </div>
  );
}