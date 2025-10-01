import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      createdAt: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
  }
}