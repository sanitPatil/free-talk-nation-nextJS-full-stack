import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "username/email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await DbConnect();
        try {
          const user = await userModel.findOne({
            $or: [
              { username: credentials.identifier },
              { email: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error(
              `user with given credential not found please login`
            );
          }

          const isPasswordValid: boolean = await user.validatePassword(
            credentials.password
          );

          if (!isPasswordValid) throw new Error("In-valid credentials");

          return user;
        } catch (error: any) {
          console.error(`AUTH OPTION: ${error}`);
          throw new Error(error);
        }
      },
    }),
  ],
};
