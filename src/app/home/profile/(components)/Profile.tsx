"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Edit, Edit2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import UpdateCoverImage from "./UpdateCover";
import UpdateAvatar from "./UpdateAvatar";
import UpdateUsername from "./UpdateUsername";
import UpdateEmail from "./UpdateEmail";

function Profile() {
  const [imageSrc, setImageSrc] = useState("/avatar-placeholder.png");
  return (
    <div className="px-8 py-4 w-full h-full">
      <div className="mx-4 w-full flex-row gap-8 space-y-12 ">
        {/* cover image */}
        <div className="w-full flex h-32 border rounded-lg border-blue-900">
          <div className="w-full ">
            <div className="w-full h-full  rounded-sm flex items-center justify-center">
              Profile Image
            </div>
          </div>
          <div className="relative bottom-0 m-4">
            <UpdateCoverImage />
          </div>{" "}
        </div>
        {/* profile image  */}
        <div className="mt-4 w-full  px-4 py-4 text-center flex justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
            <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-white text-xl font-bold">JD</span> // Initials fallback
              )}
            </div>
          </div>
          <UpdateAvatar />
        </div>
        <div className="flex justify-center gap-4 text-center text-xl  font-bold ">
          <div className=" flex justify-center gap-2">
            <Label>Username</Label>
            <UpdateUsername />
          </div>
          <div className=" flex justify-center gap-7">
            <Label>email</Label>
            <UpdateEmail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
