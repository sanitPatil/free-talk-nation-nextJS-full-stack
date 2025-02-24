"use client";
import React, { ReactNode, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/Schemas/signInSchema";
import * as z from "zod";
import {
  Form,
  FormControl,
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
import { Loader2Icon } from "lucide-react";
function SignInComponent(): ReactNode {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const signInHandler = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    setLoginMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      email: data.identifier,
      password: data.password,
    });
    // alert(`OK${result?.ok},STATUS ${result?.status}, URL${result?.url}`);
    if (result?.ok) {
      toast({
        title: "login Successfully",
        description: "redirecting...",
      });
      router.push("/"); // Redirect after successful login
    } else {
      toast({
        title: "login failed",
        description: "invalid credentials...",
      });
      setLoginMessage("In-valid credetnials");
    }
    setIsLoading(false);
  };

  return (
    <div className="py-4 ">
      <div className="max-w-xl mx-auto p-4 m-4 bg-gradient-to-b from-gray-900 to-neutral-800 text-3xl rounded-3xl">
        <div className="text-center mt-4 font-bold ">
          <h1>Sign In</h1>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(signInHandler)}
              className="space-y-10"
            >
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="email/username"
                        {...field}
                      />
                    </FormControl>
                    <div>
                      {loginMessage && (
                        <p className="text-red-600 font-bold text-sm italic text-center ">
                          {loginMessage}
                        </p>
                      )}
                    </div>
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
                  {isLoading ? (
                    <Loader2Icon className="w-4 h-4 inline animate-spin" />
                  ) : (
                    "submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-sm text-center mt-4">
          Don&apos;t have Account? {"  "}{" "}
          <Link href={"/sign-up"} className="text-blue-600">
            <span className="font-bold">Sign-up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInComponent;
