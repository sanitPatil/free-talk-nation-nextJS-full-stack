"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/Schemas/signInSchema";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { SignUpSchema } from "@/Schemas/signUpSchema";
import { Loader2 } from "lucide-react";
import axios, { Axios, AxiosError } from "axios";

function SignUpComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setsignUpError] = useState("");
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signUpHandler = async (data: z.infer<typeof SignUpSchema>) => {
    // setIsLoading(true);
    // console.log(data);
    // setIsLoading(false);
    setIsLoading(true);
    setsignUpError("");
    try {
      const signUpResponse = await axios.post("/api/sign-up", data);
      // console.log(`done1`);

      if (signUpResponse.data.error) {
        setsignUpError(`${signUpResponse.data.error.messgae}`);
      }
      console.log(signUpResponse);
      toast({
        title: "user successfully Register",
        description:
          signUpResponse.data.message || "user successfully Register",
      });

      router.replace("/sign-in"); // by default redirection type is push
    } catch (error) {
      if (error instanceof AxiosError) {
        setsignUpError(`Error: ${error}`);
      }
      setsignUpError("Error: something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-4 ">
      <div className="max-w-xl mx-auto p-4 m-4 bg-gradient-to-b from-gray-900 to-neutral-800 text-3xl rounded-3xl">
        <div className="text-center mt-4 font-bold ">
          <h1>Sign Up</h1>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(signUpHandler)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
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
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="p-4 w-24 font-bold"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 block animate-spin" />
                  ) : (
                    " Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-sm text-center mt-4">
          Already have Account? {"  "}{" "}
          <Link href={"/sign-in"} className="text-blue-600">
            <span className="font-bold">Sign-In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
