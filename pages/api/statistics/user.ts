import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/db';

export default async function userStatistics(
   req: NextApiRequest,
   res: NextApiResponse
) {
   console.log('Fetching session...');
   const session = await getSession({ req });

   if (!session?.user?.uid) {
      console.log('Session not found.');

      return res.status(500).json({ message: 'No user id found.' });
   }
   console.log('Session located.');

   // use prisma to get user information
   const user = await prisma.user.findUnique({
      where: {
         id: session.user.uid,
      },
      select: {
         isAdmin: true,
      },
   });
   if (!user || !user.isAdmin) {
      return res.status(404).json({ message: "You're not allowed in here." });
   }

   if (req.method != 'GET') {
      return res.status(405).end(`Method ${req.method} not allowed`);
   }

   const profileCount = await prisma.profile.count();

   if (!profileCount) {
      return res.status(500).json({ message: 'No user count returned.' });
   }

   return res.status(200).json({ userCount: profileCount });
}
