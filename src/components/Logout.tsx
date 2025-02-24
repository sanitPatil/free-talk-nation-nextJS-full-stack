import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

async function Logout() {
    
  return (
    <Button
      className="font-bold p-2 text-xl text-red-700"
      onClick={() => signOut()}
    >
      Log out
    </Button>
  );
}

export default Logout;
