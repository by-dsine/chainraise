import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from "next-auth/providers/linkedin";
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
	  LinkedInProvider({
		clientId: process.env.LINKEDIN_CLIENT_ID,
		clientSecret: process.env.LINKEDIN_CLIENT_SECRET
	  })
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
	// callbacks: {
		// async jwt(token, account) {
		  // if (account ?.accessToken) {
			// token.accessToken = account.accessToken
		  // }
		  // return token;
		// },
		// redirect: async (url, _baseUrl)=>{
		  // if (url === '/user') {
			// return Promise.resolve('/')
		  // }
		  // return  Promise.resolve('/')
		// }
	// }
});
