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
        email: {
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
            return new Error(
              `user with given credential not found please login`
            );
          }

          const isPasswordValid: boolean = user.validatePassword(
            credentials.password
          );

          if (!isPasswordValid) return new Error("In-valid credentials");

          return user;
        } catch (error: any) {
          console.error(`AUTH OPTION: ${error}`);
          return new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<any> {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
