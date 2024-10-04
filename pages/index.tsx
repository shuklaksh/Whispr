import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import MainScreenLayout from "@/components/layout/MainScreenLayout";
import { Tweet } from "@/gql/graphql";
import { getSignedUrlQuery } from "@/graphQL/query/tweet";
import { useCreateTweet } from "@/hooks/tweets/useCreateTweet";
import { useGetTweets } from "@/hooks/tweets/useGetTweets";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";



export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useGetTweets();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [bucketImage,setBucketImage] = useState<File | null>(null);

  const handleImageChange = (input: HTMLInputElement) => {
    const file = input.files ? input.files[0] : null;
    if (file) {
      setBucketImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      const prefix = "image/";
      let type = file.type;
  
    if (file.type.startsWith(prefix)) {
      type =  file.type.slice(prefix.length);
  }
      setImageType(type);
      reader.readAsDataURL(file);
    }
    }

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", () => handleImageChange(input));
    input.click();
  }, []);

  const handleCreateTweet = useCallback(async() => {
    let uploadedImageUrl = null;
    if(imageType) {
      const {getSignedURL} = await graphqlClient.request(getSignedUrlQuery,{
        imageType: imageType
      })
      if(getSignedURL) {
        await axios.put(getSignedURL,bucketImage, {
          headers: {
            'Content-type': imageType
          }
        })
        const url = new URL(getSignedURL);
        uploadedImageUrl = `${url.origin}${url.pathname}`;
      }
    }
    
    mutate({
      content,
      imageURL: uploadedImageUrl
    });
    setContent('');
    setImage('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
               { image && <Image src={image} alt="tweet-image" width={400} height={300}/>}
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
            <FeedCard key={tweet?.id} userId={tweet?.author?.id} data={tweet as Tweet} />
          )
        }
      </MainScreenLayout>
    </div>
  );
}