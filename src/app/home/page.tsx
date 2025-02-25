"use client";
import AddPost from "@/components/AddPost";
import Nav1 from "@/components/Nav1";
import PostList from "@/components/PostList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchBar from "@/components/UserList";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

// if user not login
const captions = [
  "Speak your mind. ✨",
  "Let the words flow... 💬",
  "Express yourself freely! 🎤",
  "No filters, just thoughts. 💭",
  "Unleash your creativity! 🚀",
  "Raw and real. 🔥",
];
function page() {
  const [caption, setCaption] = useState(captions[0]);

  const changeCaption = () => {
    const randomIndex = Math.floor(Math.random() * captions.length);
    setCaption(captions[randomIndex]);
  };

  const { status } = useSession();
  if (status === "authenticated") {
    return (
      <div className=" h-screen ">
        <div className="flex  ">
          <div className="w-1/2 h-screen bg-black/80 flex-auto ...">
            <div className=" m-4">
              <h4 className="flex justify-between mx-4  mb-2 ">
                <Button>Refresh</Button>
              </h4>
              <PostList />
            </div>
          </div>
          <div className="w-40  flex-auto  bg-gray-800 ">
            <div className="m-4">
              <div className="border flex rounded-full bg-black border-black focus:border-black">
                <Input
                  placeholder="Search user..."
                  className="w-full pr-12 bg-transparent border bg-black border-black focus:ring-blue-500 rounded-full shadow-sm placeholder-gray-300 text-white"
                />
                <Button className="rounded-full">
                  <Search className="" />
                </Button>
              </div>
              <div className="flex flex-col   justify-between">
                <SearchBar />
                <div className="mt-12  text-center">
                  <AddPost />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // if user is not login
  } else {
    return (
      <div className="absolute w-screen h-screen">
        <div
          className="h-screen w-full flex items-center justify-center bg-black/50 backdrop-blur-sm text-white text-3xl font-bold p-4 cursor-pointer"
          onClick={changeCaption}
        >
          {caption}
          <h1 className="italic font-mono">please login to read post</h1>{" "}
        </div>
      </div>
    );
  }
}

export default page;
