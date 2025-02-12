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
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/Schemas/signUpSchema";

function SignUpComponent() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const signUpHandler = async (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
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
              className="space-y-10"
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
                    <FormLabel>Username</FormLabel>
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
                <Button type="submit" className="p-4 w-24 font-bold">
                  Submit
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
