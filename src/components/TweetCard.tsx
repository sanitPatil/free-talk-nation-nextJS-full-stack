import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  EllipsisIcon,
  Heart,
  MessageCircle,
  MoreVertical,
  Repeat2,
  Share,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function TweetCard({ tweet }) {
  const { data: session, status } = useSession();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/delete-post/${postId}`);

      if (response.status === 200) {
        toast({
          title: "successfully delete tweet!",
          description: response.data.message || "",
        });
      } else {
        toast({
          title: "failed !",
          description: response.data.message || "",
        });
      }
    } catch (error) {
      toast({
        title: " failed!",
        description: "failed tweet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      router.replace("/home");
    }
  };
  return (
    <div className={` flex gap-2 border-b   p-4 m-2 border-gray-200`}>
      {/* User Avatar */}
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={`${
            tweet.ownerDetails.profileImage
              ? tweet.ownerDetails.profileImage
              : "/user-logo.png"
          }`}
        />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>

      {/* Tweet Content */}
      <div className="flex flex-col  w-full">
        {/* User Info */}
        <div className="flex items-center  text-sm">
          <h3 className="font-semibold mr-2">{tweet.ownerDetails.username}</h3>
          <span className="text-gray-500 ">
            @{tweet.ownerDetails.username} • {tweet.updatedAt}
          </span>
        </div>

        {/* Tweet Text */}
        <div className="flex justify-between">
          <div className="font-bold text-xl">{tweet.title}</div>
          {tweet.ownerDetails._id === session?.user._id && (
            <span>
              <Popover>
                <PopoverTrigger></PopoverTrigger>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="bg-black text-white w-24 flex flex-col p-1 rounded-lg shadow-lg">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full font-medium text-white hover:bg-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full font-medium text-white hover:bg-red-600"
                      onClick={() => handleDelete(tweet._id)}
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </Popover>
            </span>
          )}
        </div>
        <p className="text-white text-sm mt-1">{tweet.description}</p>

        {/* Tweet Image */}
        {tweet.file && (
          <div className={`mt-2`}>
            <Image
              width={700}
              height={160}
              src={tweet.file}
              alt="Tweet Image"
              className="rounded-lg "
            />
          </div>
        )}

        {/* Tweet Actions */}
        <div className="flex justify-between mt-2 p-2 text-gray-500 text-xs ">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
            <MessageCircle size={14} /> 12
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            <Repeat2 size={14} /> 4
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
            <Heart size={14} /> 88
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
            <Share size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
