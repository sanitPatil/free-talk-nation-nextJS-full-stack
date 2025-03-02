import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/hooks/use-toast";
import { SignUpSchema } from "@/Schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod";

export function UpdateModal({ tag }: { tag: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/* profile image */}

        {tag && tag === "profile" && <ProfileImageUpdate />}

        {/* avatar image */}
        {tag && tag === "avatar" && <AvatarImageUpdate />}
        {/* username image */}
        {tag && tag === "username" && <UsernameUpdate />}

        {tag && tag === "bio" && <BioUpdate />}
        {/* email image */}
        {tag && tag === "email" && <EmailUpdate />}
        {/* password image */}
        {tag && tag === "password" && <PasswordUpdate />}
      </DialogContent>
    </Dialog>
  );
}

export const ProfileImageUpdate = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      file: undefined,
    },
  });
  const handlePostSubmit = async (data) => {
    setLoading(true);
    if (!data.file.type.startsWith("image/")) {
      toast({
        title: "Error-file!!!",
        description: "file does not have valid type!!!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else {
      const formData = new FormData();
      formData.append("file", data.file);
      try {
        const response = await axios.patch(
          "/api/edit-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast({
            title: "file updated Successfully",
            description: "successfully updated Profile Image, redirecting...",
          });
        } else {
          toast({
            title: "Error-file!!!",
            description:
              response?.data?.message || "file does not have valid type!!!",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error-file!!!",
          description: "failed to upload file!!!",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePostSubmit)}
          className="w-full z-50  justify-center"
        >
          <div>
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
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-blue-300 bg-gray-900 rounded-lg cursor-pointer hover:border-blue-500 transition-all"
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
                      disabled={loading}
                      accept="images/*"
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
          </div>

          <div className=" mt-2 flex justify-center gap-12">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="w-24">
              {loading ? (
                <Loader2 className="w-full animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const AvatarImageUpdate = () => {
  const form = useForm({
    defaultValues: {
      avatar: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePostSubmit = async (data) => {
    setLoading(true);
    if (!data.avatar.type.startsWith("image/")) {
      toast({
        title: "Error-file!!!",
        description: "file does not have valid type!!!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    } else {
      const formData = new FormData();
      formData.append("file", data.avatar);
      try {
        const response = await axios.patch("/api/edit-avatar-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          toast({
            title: "file updated Successfully",
            description: "successfully updated Avatar Image, redirecting...",
          });
        } else {
          toast({
            title: "Error-file!!!",
            description:
              response?.data?.message || "failed to update avatar!!!",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error-file!!!",
          description: "failed to upload file!!!",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePostSubmit)}
          className="w-full z-50  justify-center"
        >
          <div>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Upload Avatar
                  </FormLabel>

                  <label
                    htmlFor="fileUpload"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-blue-300 bg-gray-900 rounded-lg cursor-pointer hover:border-blue-500 transition-all"
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
                      disabled={loading}
                      accept="images/*"
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
          </div>

          <div className=" mt-2 flex justify-center gap-12">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="w-24">
              {loading ? (
                <Loader2 className="w-full animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const UsernameUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const debounced = useDebounceCallback(setUsername, 400);
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });
  useEffect(() => {
    if (username) {
      setUsernameMessage("");
      setCheckingUsername(true);
      const checkUsernameValid = async () => {
        try {
          const { data } = await axios.get(
            `/api/check-username-valid?username=${username}`
          );
          setUsernameMessage(data?.message);
        } catch (error: any) {
          if (error.response && error.response.status === 409) {
            setUsernameMessage(error.response.data.message);
          } else {
            setUsernameMessage(error.message);
          }
        } finally {
          setCheckingUsername(false);
        }
      };
      checkUsernameValid();
    }
  }, [username]);

  const handleUsernameUpdate = async (data) => {
    setLoading(true);
    if (!data.username) {
      toast({
        title: "Error Username!!!",
        description: "username field is empty",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch("/api/edit-username", data);
      if (response.status === 200) {
        toast({
          title: "User name updated successfully!!!",
          description: response.data.message,
        });
        return;
      } else {
        toast({
          title: "Username updation failed!!!",
          description: response.data.message,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "username updation failed!!!",
        description: "failed to update username",
        variant: "destructive",
      });
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className=" gap-4 py-4">
        <div className="items-center gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUsernameUpdate)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={checkingUsername}
                        placeholder="username"
                        className=""
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    <div>
                      {usernameMessage &&
                      usernameMessage === "username valid" ? (
                        <div className="text-green-600 italic text-sm mt-2 px-4 rounded text-center">
                          {usernameMessage}
                        </div>
                      ) : (
                        <div className="text-red-600 italic text-sm mt-2 px-4 text-center rounded ">
                          {usernameMessage}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" mt-2 flex justify-center gap-12">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" disabled={loading}>
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-24">
                  {loading ? (
                    <Loader2 className="w-full animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export const BioUpdate = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      bio: "",
    },
  });

  const handlePasswordUpdate = async (data) => {
    setLoading(true);
    if (!data.bio) {
      toast({
        title: "Error-bio",
        description: "bio field is cannot be empty!!!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch("/api/edit-bio", data);
      if (response.status === 200) {
        toast({
          title: "bio updated",
          description: "Bio updated successfully!!!",
        });
      } else {
        toast({
          title: "failed to update bio",
          description: response.data.message || "bio updation failed!!!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error-bio",
        description: "failed to update bio,try again!!!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePasswordUpdate)}>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bio</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="bio"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" mt-2 flex justify-center gap-12">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-24">
              {loading ? (
                <Loader2 className="w-full animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const EmailUpdate = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleEmailUpdate = async (data) => {
    setLoading(true);
    if (!data.email || !data.password) {
      toast({
        title: "Error-Email",
        description: "Email and Password field cannot be empty!!!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch("/api/edit-email", data);
      if (response.status === 200) {
        toast({
          title: "Email updated",
          description: "Email updated successfully!!!",
        });
      } else {
        toast({
          title: "failed to update Email",
          description: response.data.message || "Email updation failed!!!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error-Email",
        description: "failed to update Email,try again!!!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEmailUpdate)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" mt-2 flex justify-center gap-12">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-24">
              {loading ? (
                <Loader2 className="w-full animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const PasswordUpdate = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  const handlePasswordUpdate = async (data) => {
    setLoading(true);
    if (!data.old_password || !data.new_password) {
      toast({
        title: "Error-password-update",
        description: "password field cannot be empty!!!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch("/api/edit-password", data);
      if (response.status === 200) {
        toast({
          title: "password updated",
          description: "password updated successfully!!!",
        });
      } else {
        toast({
          title: "failed to update password",
          description: response.data.message || "password updation failed!!!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error-password",
        description: "failed to update password,try again!!!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePasswordUpdate)}>
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>old password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>new password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    placeholder="password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" mt-2 flex justify-center gap-12">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-24">
              {loading ? (
                <Loader2 className="w-full animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
