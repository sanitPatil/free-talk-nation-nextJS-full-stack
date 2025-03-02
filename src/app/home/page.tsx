"use client";
import AddPost from "@/components/AddPost";

import PostList from "@/components/PostList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

import { Loader2, Search, SearchCheckIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";

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
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setUserList] = useState([]);
  const debounced = useDebounceCallback(setUsername, 400);

  useEffect(() => {
    const searchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/search-user?username=${username}`
        );
        if (response.status === 200) {
          setUserList(response.data.users);
        } else {
          toast({
            title: "failed to get user search",
            description: response.data.message || "failed to get user",
          });
        }
      } catch (error) {
        toast({
          title: "Error user search",
          description: "failed to get user",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (username) {
      searchUser();
    }
  }, [username]);

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
              <div className="p-1 relative">
                <Input
                  className="border-none bg-gray-800"
                  type="text"
                  disabled={isLoading}
                  placeholder="username"
                  onChange={(e) => {
                    debounced(e.target.value);
                  }}
                />
                <X
                  className={` ${
                    userlist.length > 0 ? "block" : "hidden"
                  } absolute top-0.5  border-none p-1 w-10 h-10 right-0 border`}
                  onClick={() => {
                    setUserList([]);
                  }}
                />
              </div>
            </div>
            <div className="jusitfy-center w-full">
              {userlist.length > 0 &&
                userlist.map((user) => (
                  <Link href={`/home/${user._id}`} key={user._id}>
                    <div className=" flex gap-4 items-center justify-center hover:bg-gray-800 p-1">
                      <Image
                        src={user?.avatar}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="w-12 h-12 border rounded-full"
                      />
                      <span className="">{user.username}</span>
                    </div>
                  </Link>
                ))}
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
