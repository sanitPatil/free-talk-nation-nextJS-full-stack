"use client";
import React, { useCallback, useEffect, useState } from "react";
import Profile from "./(components)/Profile";
import axios from "axios";

function page() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getLoginUser = async () => {
      try {
        const response = await axios.get("/api/get-login-user");
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user.");
      }
    };

    getLoginUser();
  }, []);

  return (
    <div className="w-full h-screen bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-md flex items-center justify-center">
      {errorMessage ? (
        <p className="text-red-700 font-bold text-4xl">{errorMessage}</p>
      ) : (
        <Profile user={user} />
      )}
    </div>
  );
}

export default page;
