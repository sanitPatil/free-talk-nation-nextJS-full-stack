"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <nav className="flex justify-between p-1 bg-gray-900 text-white px-8 ">
      <div className="max-w-7xl mx-auto px-4 text-4xl font-bold rounded-full p-2 bg-transparent  ">
        <div className="">
          <Link href={"/"}>
            Free-Talk
            <sub>
              <X className="w-4 h-4 inline" />
            </sub>
          </Link>
        </div>
      </div>
      <div className="">
        <ul className="flex gap-4 p-4 rounded-full text-xl font-bold">
          <li className="hover:border-b-2">
            <Link href={"/sign-in"}>Sign in</Link>
          </li>
          <li className="hover:border-b-2">
            <Link href={"/sign-up"}>Sign up</Link>
          </li>
          <li className="hover:border-b-2">
            <Button
              className="font-bold p-2 text-xl text-red-700"
              onClick={() => signOut()}
            >
              Log out
            </Button>
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
