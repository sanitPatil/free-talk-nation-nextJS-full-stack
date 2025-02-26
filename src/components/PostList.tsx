"use client";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import axios from "axios";
import TweetCard from "./TweetCard";

function PostList() {
  const [postList, setPostList] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/get-posts");
        if (response.status === 200) {
          setPostList(response.data.list);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.message);
        }
      } finally {
        setErrorMessage("");
      }
    };
    fetchPosts();
  }, []);
  console.log(postList);

  return (
    <ScrollArea className="h-[35rem] m-2 w-full rounded-md ">
      <div className="m-2">
        {postList &&
          postList.map((post) => <TweetCard tweet={post} key={post._id} />)}
      </div>
    </ScrollArea>
  );
}

export default PostList;
