import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      profile(profile) {
        const picture =
          typeof profile.picture === 'string'
            ? profile.picture.replace(/=s\d+-c/, '=s256-c')
            : null
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: picture,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = (token.id ?? token.sub) as string
      return session
    },
  },
})