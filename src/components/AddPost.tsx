import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  ImageIcon,
  VideoIcon,
  FileIcon,
  SendIcon,
  XIcon,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostSchemaValidation } from "@/Schemas/Post.Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AddPost() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  //  form
  const form = useForm<z.infer<typeof PostSchemaValidation>>({
    resolver: zodResolver(PostSchemaValidation),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
    },
  });

  const handlePostSubmit = async (
    data: z.infer<typeof PostSchemaValidation>
  ) => {
    setIsLoading(true);

    if (!data.title || !data.description) {
      setIsLoading(false);
      return router.refresh();
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }

    try {
      const response = await axios.post("/api/add-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast({
          title: "tweet upload successfully",
          description: response?.data.message,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // setaddPostErrorMessage(error.response?.data.message);
        toast({
          title: "failed to uplaod Tweet!!! Try Agian",
          description: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        // setaddPostErrorMessage("failed to upload Tweet!!! try again");
        toast({
          title: `failed`,
          description: "failed to upload Tweet!!! try again",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      form.reset({
        title: "",
        description: "",
        file: undefined,
      });
      setShowModal(false);
      router.replace("/home");
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="border">
        Add Post
      </Button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePostSubmit)}
              className="w-full  flex justify-center"
            >
              <Card className="w-full max-w-5xl bg-gray-800 text-white p-4 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-center  w-full">
                    Create Post
                  </h3>
                  <button onClick={() => setShowModal(false)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                <CardContent className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>title</FormLabel>
                        <FormControl>
                          <Input required placeholder="title" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-3 text-gray-500">
                    <button>
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button>
                      <VideoIcon className="w-5 h-5" />
                    </button>
                    <button>
                      <FileIcon className="w-5 h-5" />
                    </button>
                  </div>

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
                                  📄 {field.value?.name || "Selected File"}
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

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant={"outline"}
                      className="flex items-center font-bold space-x-2 text-black"
                    >
                      <SendIcon className="w-4 h-4" />
                      <span className="">
                        {isLoading ? (
                          <Loader className="animate-spin inline" />
                        ) : (
                          "Post"
                        )}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </motion.div>
      )}
    </>
  );
}
