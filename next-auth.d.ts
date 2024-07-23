import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from next-auth/JWT;

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string,
    email: string
  }
}