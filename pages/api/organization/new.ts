import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/db';
import { IssuerDetails, IssuerResponse } from '../../../types/typings';

export default async function newIssuerAndOrganization(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID;
   const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY;

   if (!CLIENT_ID || !DEVELOPER_KEY) {
      console.log('North Capital parameters not loaded.');
      return res.status(500).json({ message: 'No NC parameters found.' });
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

   if (req.method != 'POST') {
      return res.status(405).end(`Method ${req.method} not allowed`);
   }

   const { organizationName, firstName, lastName, email, phone } = JSON.parse(
      req.body
   );
   if (!organizationName || !firstName || !lastName || !email || !phone) {
      return res
         .status(405)
         .end(`Bad request. Please make sure all fields are complete.`);
   }

   // #1 Locate or create a user profile to be the owner
   var profile = await prisma.profile.findUnique({
      where: {
         email: email,
      },
   });

   if (!profile) {
      profile = await prisma.profile.create({
         data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
         },
      });
   }

   // #2 Create issuer with North Capital
   const createIssuerURL = new URL(
      'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createIssuer'
   );
   const data = new URLSearchParams();
   data.append('clientID', CLIENT_ID);
   data.append('developerAPIKey', DEVELOPER_KEY);
   data.append('issuerName', organizationName);
   data.append('firstName', profile.firstName!);
   data.append('lastName', profile.lastName!);
   data.append('email', profile.email!);

   const response = await fetch(createIssuerURL, {
      method: 'PUT',
      body: data,
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });

   if (!response.ok) {
      console.log(response);
      return res
         .status(500)
         .json({
            message: `Error creating issuer! status: ${response.status}`,
         });
   }

   const result = (await response.json()) as IssuerResponse;
   console.log('createIssuer result is: ', JSON.stringify(result, null, 4));

   let organizationId = '';
   if (result.statusCode == '101') {
      let issuerIdFromResult = getIssuerIdFromResult(result);
      if (!issuerIdFromResult) {
         return res.status(500).json({ message: 'No issuer ID was found.' });
      }

      // create organiztion
      const organization = await prisma.organization.create({
         data: {
            name: organizationName,
            ncIssuerId: issuerIdFromResult,
            contactId: profile.id,
         },
      });
      if (!organization) {
         return res
            .status(500)
            .json({ message: 'Organization was not created.' });
      }
      organizationId = organization.id;
      if (!organizationId) {
         return res.status(500).json({
            message:
               'Error populating organization ID field. This is really weird.',
         });
      }
   }

   return res.status(200).json({
      organizationName: organizationName,
      organizationId: organizationId,
   });
}

function getIssuerIdFromResult(result: IssuerResponse): string {
   var resultIssuerObject = result.issuerDetails[1] as IssuerDetails[];
   if (!resultIssuerObject || !resultIssuerObject[0].issuerId) {
      console.log('Failed to get issuerId', resultIssuerObject);
      return '';
   }
   return resultIssuerObject[0].issuerId;
}
