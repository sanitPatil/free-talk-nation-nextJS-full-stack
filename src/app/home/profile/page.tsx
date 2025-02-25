import React from "react";
import Profile from "./(components)/Profile";

function page() {
  return (
    <div className="w-full h-screen bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-md flex items-center justify-center">
      <Profile />
    </div>
  );
}

export default page;
