"use client";
import TweetDisplay from "@/components/TweetDisplay";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [tweet, setTweet] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { tweetId } = useParams();

  useEffect(() => {
    const getTweet = async () => {
      setErrorMessage("");
      try {
        const response = await axios.get(`/api/get-tweet/${tweetId}`);
        if (response.status === 200) {
          setTweet(response.data.tweet);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage("failed to get Tweet Details!!!");
      } finally {
        setErrorMessage("");
      }
    };
    if (tweetId) getTweet();
  }, [tweetId]);
  console.log(tweet);

  return (
    <div className="">
      {tweet ? (
        <TweetDisplay tweet={tweet} />
      ) : (
        <div className="absolute top-1/2 right-[35rem] font-bold text-xl bg-white  p-4 rounded text-red-800">
          No Data Found!!!
        </div>
      )}
    </div>
  );
}

export default page;
