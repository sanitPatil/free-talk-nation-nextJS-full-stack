"use client";
import { Edit, User, X } from "lucide-react";
import React, { useState } from "react";

import { UpdateModal } from "./UpdateModal";
import Image from "next/image";
import { Label } from "@/components/ui/label";

function Profile({ user }) {
  console.log(user);

  return (
    <div className="grid-flow-col  mt-4 m-2 p-1 w-full h-full ">
      <div className="relative text-center w-full shadow-md hover:border-blue-800 border-blue-600 border-dashed border h-40 rounded-xl mt-2 ">
        {user?.coverImage && (
          <div className=" flex justify-center items-center h-40">
            <Image
              src={user?.coverImage}
              width={500}
              height={500}
              alt="profile image "
              className="w-full h-36 p-1 rounded-lg"
            />
          </div>
        )}

        <span className="absolute bottom-2 right-4 p-1">
          <UpdateModal tag="profile" />
        </span>
      </div>
      <div className=" w-full p-4 flex flex-col items-center justify-center">
        <div className="relative w-full flex justify-center ">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              width={400}
              height={300}
              alt="profile image "
              priority={true}
              className="rounded-full w-40 h-40"
            />
          ) : (
            <User className="w-40 h-40 border  rounded-full" />
          )}
          <UpdateModal tag="avatar" />
        </div>
        <div className="mt-4 items-center justify-center w-full text-xl font-bold flex gap-4">
          <h1>{user?.username}</h1>
          <UpdateModal tag="username" />
        </div>
        <div className="mt-4 items-center justify-center w-full text-xl font-bold flex gap-4">
          <h1>Bio: {user?.bio ? user?.bio : "Free-talk user..."}</h1>
          <UpdateModal tag="bio" />
        </div>
      </div>
      <div className="flex flex-col container justify-center border-t-2 mt-2 border-black items-center">
        <h1 className="text-4xl font-bold m-2 text-blue-700">Settings</h1>
        <div className="grid grid-cols-2 w-full text-center text-3xl">
          <div className="flex items-center justify-center gap-4 font-bold">
            Email
            <UpdateModal tag="email" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-4 font-bold">
              Password
              <UpdateModal tag="password" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
