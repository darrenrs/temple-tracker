import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // if just token.id is used, TypeScript throws an error
      session.user.id = (token.id ?? token.sub) as string
      return session
    },
  }
})