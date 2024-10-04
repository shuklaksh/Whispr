import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

interface FeedCardProps {
  data: Tweet;
  userId?: string;
}

function FeedCard(props: FeedCardProps) {
  const { data, userId } = props;
  return (
    <div className="border-t border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className="col-span-1">
          {data.author && data.author.profileImageUrl ? (
            <Image
              className="rounded-full "
              src={data.author?.profileImageUrl}
              alt="user-image"
              height={50}
              width={50}
            />
          ) : (
            <div>
              <RxAvatar className="icon" size="30px" color="white" />
            </div>
          )}
        </div>
        <div className="col-span-11 ml-4 sm:ml-2">
        <Link href={`/${userId}`} className="leading-3">
            <h5 className="w-full text-md text-slate-300">
              {data?.author?.firstName + " " + data?.author?.lastName}
            </h5>
            <p className="w-full text-sm text-slate-500">
              {"@" + data?.author?.email}
            </p>
          </Link>

          <div className="mt-2 pl-1">
            <p>{data.content}</p>
            {data.imageURL && (
              <Image
                className="pt-1 w-[90%] h-auto"
                src={data?.imageURL}
                alt="tweet-image"
                width={100}
                height={100}
              />
            )}
          </div>

          <div className="postBtns flex justify-between mt-5 text-xl text-center w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
