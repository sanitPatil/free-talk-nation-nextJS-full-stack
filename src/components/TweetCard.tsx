import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Heart, MessageCircle, Repeat2, Share, User } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
export default function TweetCard({ tweet }) {
  let fileExtension = null;
  if (tweet.file) fileExtension = tweet.file.split(".").pop().toLowerCase();

  if (tweet) {
    return (
      <div className={` flex gap-2 border-b p-4 m-2 border-gray-200`}>
        {/* User Avatar */}

        {tweet?.ownerDetails?.avatar && (
          <Image
            src={tweet?.ownerDetails?.avatar}
            width={40}
            height={40}
            alt="avatar"
            className="w-14 h-14 rounded-full"
          />
        )}

        {/* //   <User className="bg-white rounded-full w-10 h-10 text-black" /> */}

        {/* Tweet Content */}
        <div className="flex flex-col  w-full">
          {/* User Info */}
          <div className="flex items-center  text-sm">
            <h3 className="font-semibold mr-2">
              {tweet.ownerDetails.username}
            </h3>
            <span className="text-gray-500 ">
              @{tweet.ownerDetails.username} • {tweet.updatedAt}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="font-bold text-xl">{tweet.title}</div>
          </div>
          <p className="text-white text-sm mt-1">
            {tweet.description.length > 150
              ? `${tweet.description.split(" ").slice(0, 150).join(" ")}`
              : tweet.description}
            <span className="ml-2 text-blue-700">
              <Link href={`/home/tweet-display/${tweet._id}`}>
                read more...
              </Link>
            </span>
          </p>
          <div className="p-1 mt-2 flex justify-center">
            {tweet.file && (
              <>
                {/* Tweet Image */}
                {["jpg", "jpeg", "png", "gif", "webp"].includes(
                  fileExtension
                ) ? (
                  <Image
                    src={tweet.file}
                    alt="Tweet Image"
                    width={400}
                    height={400}
                    layout="intrinsic"
                    className="rounded-lg"
                    unoptimized // Required if using an external image source like Firebase
                  />
                ) : ["mp4", "webm", "ogg"].includes(fileExtension) ? (
                  <video
                    width="400"
                    height="200"
                    controls
                    preload="none"
                    className="rounded-md border"
                  >
                    <source src={tweet.file} type={`video/${fileExtension}`} />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div>
                    <iframe
                      src={tweet.file}
                      width="100%"
                      height="600px"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Tweet Actions */}
          <div className="flex justify-between mt-2 p-2 text-gray-500 text-xs ">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
              <MessageCircle size={14} /> 12
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
              <Repeat2 size={14} /> 4
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
              <Heart size={14} /> 88
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
              <Share size={14} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <div>Loading...</div>;
  }
}
