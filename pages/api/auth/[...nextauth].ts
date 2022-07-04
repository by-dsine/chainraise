import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/db';

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      // ...add more providers here
   ],
   pages: {
      signIn: '/auth/signin',
      newUser: '/auth/new-user',
   },
   callbacks: {
      async session({ session, user }) {
         const getUser = await prisma.user.findFirst({
            where: {
               email: session!.user!.email,
            },
         });
         session.user.uid = getUser?.id;
         session.user.admin = getUser?.isAdmin!;

         return session;
      },
   },
});
