"use client";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import axios from "axios";
import TweetCard from "./TweetCard";
import AddPost from "./AddPost";
import { useRouter } from "next/navigation";

function PostList() {
  const [postList, setPostList] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/get-posts");
      if (response.status === 200) {
        setPostList(response.data.list);
      } else {
        setErrorMessage(response.data.message || "Failed to fetch posts.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch posts when the component mounts
  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="p-1  flex justify-between">
        <Button
          type="button"
          className="text-right"
          onClick={fetchPosts}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      <ScrollArea className="h-[35rem] m-2 w-full rounded-md">
        <div className="m-2">
          {postList.length > 0 ? (
            postList.map((post) => <TweetCard tweet={post} key={post._id} />)
          ) : (
            <p className="text-gray-500 text-center">No posts available.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default PostList;
