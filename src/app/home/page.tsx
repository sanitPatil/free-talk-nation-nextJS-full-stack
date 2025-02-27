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
      <>
        <div className="grid grid-cols-6 ">
          <div className="col-span-4 h-screen">
            <div className=" m-4">
              <PostList />
            </div>
          </div>
          <div className="col-span-2 p-1 border-l-2 ">
            <div className="m-4">
              <div className="border flex rounded-full border-black">
                <Input
                  placeholder="Search user..."
                  className="w-full pr-12 bg-transparent border bg-gray-100 border-black focus:ring-blue-500 rounded-full shadow-sm placeholder-gray-300 text-black"
                />
                <Button className="rounded-full">
                  <Search className="bg-black text-white" />
                </Button>
              </div>
              <div className="text-center mt-4">
                <SearchBar />
              </div>
            </div>
            <div className="absolute bottom-4 right-32">
              <AddPost />
            </div>
          </div>
        </div>
      </>
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
