import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
   OFFERING_CREATED_STATUS,
   STANDARD_DISCLOSURE,
} from '../../../../lib/consts';

import { prisma } from '../../../../lib/db';
import { OfferingDetails, OfferingResponse } from '../../../../types/typings';
import {
   convertInputDateToDateTime,
   convertInputDateToNCFormat,
   formatAmountForNC,
} from '../../../../utils/mappers';

export default async function newOffering(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID;
   const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY;

   if (!CLIENT_ID || !DEVELOPER_KEY) {
      console.log('North Capital parameters not loaded.');
      return res.status(500).json({ message: 'No NC parameters found.' });
   }

   console.log(req.method);
   console.log('Fetching session...');
   const session = await getSession({ req });

   if (!session?.user?.uid) {
      console.log('Session not found.');

      return res.status(500).json({ message: 'No user id found.' });
   }

   if (!session.user.admin) {
      return res.status(404).json({ message: "You're not allowed in here." });
   }
   console.log(req.body);

   if (req.method == 'POST') {
      console.log('we made it inside');
      const {
         organizationId,
         offeringName,
         startDate,
         endDate,
         targetAmount,
         minimumAmount,
         maximumAmount,
         issueType,
         description,
         price,
      } = req.body;
      if (
         !organizationId ||
         !offeringName ||
         !startDate ||
         !endDate ||
         !targetAmount ||
         !minimumAmount ||
         !maximumAmount ||
         !issueType ||
         !description ||
         !price
      ) {
         console.log('bad request, ', req.body);
         return res.status(405).json({
            message: `Bad request. Please make sure all fields are complete.`,
         });
      }

      console.log('Looking for an organization');
      // #1 Locate organization to be the owner of this offering
      var organization = await prisma.organization.findUnique({
         where: {
            id: organizationId,
         },
      });

      if (!organization) {
         return res.status(405).end('No valid organization found.');
      }

      console.log('Organization found');
      // #2 Create offering with North Capital
      const createOfferingURL =
         'https://api-sandboxdash.norcapsecurities.com/tapiv3/index.php/v3/createOffering';
      const data = new URLSearchParams();
      data.append('clientID', CLIENT_ID);
      data.append('developerAPIKey', DEVELOPER_KEY);
      data.append('issuerId', organization.ncIssuerId!);
      data.append('issueName', offeringName);
      data.append('issueType', issueType);
      data.append('targetAmount', formatAmountForNC(targetAmount));
      data.append('minAmount', formatAmountForNC(minimumAmount));
      data.append('maxAmount', formatAmountForNC(maximumAmount));
      data.append('startDate', convertInputDateToNCFormat(startDate));
      data.append('endDate', convertInputDateToNCFormat(endDate));
      data.append('offeringText', description);
      data.append('stampingText', 'Confidential');

      if (typeof price == 'string') {
         data.append('unitPrice', formatAmountForNC(parseInt(price)));
      } else if (typeof price == 'number') {
         data.append('unitPrice', formatAmountForNC(price));
      } else {
         return res.status(500).json({
            message:
               "Price keeps coming back as a string sometimes for some reason and I don't know why",
         });
      }

      console.log(data);
      const response = await fetch(createOfferingURL, {
         method: 'PUT',
         body: data,
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
      });

      if (!response.ok) {
         console.log(response);
         return res.status(500).json({
            message: `Error creating offering! status: ${response.status}`,
         });
      }

      const result = (await response.json()) as OfferingResponse;
      console.log(
         'createOffering result is: ',
         JSON.stringify(result, null, 4)
      );

     
   }

   function getOfferingIdFromResult(result: OfferingResponse): string {
      var resultOfferingObject = result.offeringDetails[1] as OfferingDetails[];
      if (!resultOfferingObject || !resultOfferingObject[0].offeringId) {
         console.log('Failed to get offering ID', resultOfferingObject);
         return '';
      }
      return resultOfferingObject[0].offeringId;
   }
}
