import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        await DbConnect();
        try {
          // console.log(credentials?.email);
          // console.log(credentials?.password);

          const user = await userModel.findOne({
            $or: [
              { username: credentials?.email },
              { email: credentials?.email },
            ],
          });
          // console.log(user);

          if (!user) {
            return null;
          }

          const isPasswordValid: boolean = user.validatePassword(
            credentials?.password as string
          );

          if (!isPasswordValid) return null;

          const resUser = await userModel
            .findById(user._id)
            .select("-password");

          return resUser;
        } catch (error) {
          return null;
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
