"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Loader,
  MessageCircle,
  MoreVertical,
  PenSquare,
  Repeat,
  Share,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import { PostSchemaValidation } from "@/Schemas/Post.Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

function TweetDisplay({ tweet }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [updateLoading, setupdateLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof PostSchemaValidation>>({
    resolver: zodResolver(PostSchemaValidation),
    defaultValues: {
      title: tweet.title,
      description: tweet.description,
      file: undefined,
    },
  });
  useEffect(() => {
    if (tweet) {
      form.reset({
        title: tweet.title,
        description: tweet.description,
        file: undefined,
      });
    }
  }, [tweet, form.reset]);
  const handleDelete = async (tweetId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/delete-post/${tweetId}`);

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
    }
    router.replace("/");
  };

  const handleUpdate = async (data: z.infer<typeof PostSchemaValidation>) => {
    setupdateLoading(true);
    const formData = new FormData();
    if (!data.title || !data.description) {
      toast({
        title: "updation failed!!!",
        description: "title or description required!!!",
        variant: "destructive",
      });
      return;
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }

    try {
      const response = await axios.post(
        `/api/edit-tweet/${tweet._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "tweet updated successfully",
          description: response.data.message,
        });
      } else {
        toast({
          title: "failed to update tweet",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "updation failed!!!",
        description: "failed to update tweet",
        variant: "destructive",
      });
    } finally {
      setupdateLoading(false);
    }
    router.replace(`/`);
  };

  let fileExtension = null;
  if (tweet.file) fileExtension = tweet.file.split(".").pop().toLowerCase();
  return (
    <>
      {tweet && tweet.ownerDetails ? (
        <div className="m-4 p-4 bg-gray-800 rounded">
          <Card className="p-4 border-none shadow-none  bg-transparent text-white transition">
            <div className="flex space-x-4">
              {/* Profile Image */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="User"
                />
              </Avatar>

              {/* Tweet Content */}
              <div className="flex-1">
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <span className="font-semibold  dark:text-white">
                    {tweet.ownerDetails.username}
                  </span>

                  <span className="text-gray-700">
                    @{tweet.ownerDetails.username} ·
                    <span> {tweet.updatedAt}</span>
                  </span>
                  <div className=" flex justify-end">
                    {tweet.ownerDetails._id === session?.user._id && (
                      <Popover>
                        <PopoverTrigger asChild className="">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-2 h-2 text-gray-500" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          side="right" // Moves the popover content to the left
                          align="start"
                          className="bg-transparent rounded-lg border-none shadow-none"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex flex-col w-24 gap-1 bg-transparent backdrop-blur-lg p-1 rounded-lg"
                          >
                            <div className="flex ">
                              <Button
                                type="button"
                                variant={"link"}
                                className=""
                                onClick={() => setIsUpdate((prev) => !prev)}
                              >
                                <PenSquare className=" text-white cursor-pointer rounded-sm  transition-all" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleDelete(tweet?._id)}
                                variant={"link"}
                                className=" h-full  "
                              >
                                {loading ? (
                                  <Loader className=" animate-spin text-red-600" />
                                ) : (
                                  <Trash2 className=" text-red-500 cursor-pointer  transition-all" />
                                )}
                              </Button>
                            </div>
                          </motion.div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>

                {/* Tweet Text */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleUpdate)} className="">
                    <div className="mt-1  dark:text-gray-200">
                      <h1 className="text-xl font-bold mb-2 ">
                        {isUpdate ? (
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={updateLoading} />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          tweet.title
                        )}
                      </h1>

                      {isUpdate ? (
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>description</FormLabel>
                              <FormControl>
                                <Textarea
                                  required
                                  placeholder="description"
                                  disabled={updateLoading}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p>{tweet.description}</p>
                      )}

                      <div className="p-1 mt-2 flex justify-center">
                        {isUpdate ? (
                          <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white font-medium">
                                  Upload File
                                </FormLabel>

                                <label
                                  htmlFor="fileUpload"
                                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 bg-gray-900 rounded-lg cursor-pointer hover:border-blue-500 transition-all"
                                >
                                  {field.value ? (
                                    <div className="flex flex-col items-center">
                                      {/* Show file preview if it's an image */}
                                      {field.value instanceof File &&
                                      field.value.type.startsWith("image/") ? (
                                        <Image
                                          width={40}
                                          height={40}
                                          src={URL.createObjectURL(field.value)}
                                          alt="Preview"
                                          className="w-20 h-20 object-cover rounded-md shadow-md"
                                        />
                                      ) : (
                                        <div className="flex items-center gap-2 text-gray-600">
                                          📄{" "}
                                          {field.value?.name || "Selected File"}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center text-gray-500">
                                      <svg
                                        className="w-10 h-10 mb-2 text-gray-800"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 4v16m8-8H4"
                                        ></path>
                                      </svg>
                                      <p className="text-sm">
                                        Click or Drag & Drop to Upload
                                      </p>
                                    </div>
                                  )}
                                </label>

                                <FormControl>
                                  <Input
                                    id="fileUpload"
                                    type="file"
                                    className="hidden"
                                    disabled={updateLoading}
                                    onChange={(e) => {
                                      // const file =  || undefined;
                                      // IMPORTANT -SANIT
                                      const file = e.target.files?.[0] || null;
                                      field.onChange(file);
                                      e.target.value = "";
                                    }} // Handle file selection
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          tweet.file && (
                            <>
                              {/* Tweet Image */}
                              {["jpg", "jpeg", "png", "gif", "webp"].includes(
                                fileExtension
                              ) ? (
                                <Image
                                  src={tweet.file}
                                  alt="Tweet Image"
                                  width={400}
                                  height={400}
                                  layout="intrinsic"
                                  className="rounded-lg"
                                  unoptimized // Required if using an external image source like Firebase
                                />
                              ) : ["mp4", "webm", "ogg"].includes(
                                  fileExtension
                                ) ? (
                                <video
                                  width="400"
                                  height="200"
                                  controls
                                  preload="none"
                                  className="rounded-md border"
                                >
                                  <source
                                    src={tweet.file}
                                    type={`video/${fileExtension}`}
                                  />
                                  <track
                                    src="/path/to/captions.vtt"
                                    kind="subtitles"
                                    srcLang="en"
                                    label="English"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <div>
                                  <iframe
                                    src={tweet.file}
                                    width="100%"
                                    height="600px"
                                    sandbox="allow-scripts allow-same-origin allow-popups"
                                  />
                                </div>
                              )}
                            </>
                          )
                        )}
                      </div>
                      {isUpdate && (
                        <div className="mt-2 flex gap-4 justify-center">
                          <Button
                            type="button"
                            variant={"outline"}
                            className="text-black font-bold"
                            disabled={updateLoading}
                            onClick={() => setIsUpdate((prev) => !prev)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className=""
                            disabled={updateLoading}
                          >
                            {updateLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </form>
                </Form>

                {/* Tweet Actions */}
                <div className="flex justify-between mt-3  w-full  text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <MessageCircle size={18} />
                    <span>12</span>
                  </button>

                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <Repeat size={18} />
                    <span>4</span>
                  </button>

                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <Heart size={18} />
                    <span>89</span>
                  </button>

                  <button className="hover:text-gray-700">
                    <Share size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div>!!!</div>
      )}
    </>
  );
}

export default TweetDisplay;
