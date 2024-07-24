
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/db";
import { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient();


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if(!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if user exists.
        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        })
  
        if (!user) {
          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if(!passwordMatch) {
          return null;
        }

        // Any object returned will be saved in `user` property of the JWT
        return user;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user, session, trigger}) {
      /*
      if (trigger === 'update && session?.email') {
        token.email = session.email;
      }
        */
      // on sign-in, pass user id and email to token
      if(user) {
        return{
          ...token,
          id: user.id,
          email: user.email
        }

      }
      console.log(token);
      return token;
    },
    async session({ session, token, user }) {
      
      // pass in user id and email to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email
        }
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV == "development",
};