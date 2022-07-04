import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/db';
import {
   GetOrganizationResponse,
   IssuerDetails,
   IssuerResponse,
} from '../../../../types/typings';

export default async function organization(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { name } = req.query;

   if (typeof name !== 'string') {
      return res.status(500).json({
         message:
            'Organization name was not received as a string. Please try reformatting.',
      });
   }

   console.log('Fetching session...');
   const session = await getSession({ req });

   if (!session?.user?.uid) {
      console.log('Session not found.');

      return res.status(500).json({ message: 'No user id found.' });
   }

   if (!session.user.admin) {
      return res.status(404).json({ message: "You're not allowed in here." });
   }

   if (req.method != 'GET') {
      return res.status(405).end(`Method ${req.method} not allowed`);
   }

   console.log('Calling db...');
   var organization = await prisma.organization.findUnique({
      where: {
         name: name,
      },
   });

   if (!organization) {
      return res
         .status(404)
         .json({ message: 'No organization found with that name.' });
   }

   let organizationData: GetOrganizationResponse = {
      organizationName: organization.name,
      organizationId: organization.id,
   };
   console.log(organizationData);

   return res.status(200).json(organizationData);
}
