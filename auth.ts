import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth-config";
import db from "./lib/db";
import { getAdminById } from "./lib/admin";
import { redirect } from "next/navigation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      const existingUser = await getAdminById(user.id as string);

      
      
      if (!existingUser) return false;
      // if(existingUser.twoFactorEnabled) return false;
    

      return true;
    },
    async session({ session,token  }) {
      session.user.name=token.name;
      session.user.id=token.id as string;
      session.user.role=token.role;
    //   session.role=token.role;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getAdminById(token.sub as string);
      if (!existingUser) return null;
      token.name = existingUser.fullName;
      token.email = existingUser.email;
      token.id = existingUser.id;
      token.role=existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
});
