import {
   CreateAccountResponse,
   CreateLinkResponse,
   CreatePartyResponse,
   LinkDetail,
   PartyDetail,
} from '../../types/typings';

export const getPartyNumberFromResult = (
   result: CreatePartyResponse
): string => {
   var resultPartyObject = result.partyDetails[1] as PartyDetail[];
   if (!resultPartyObject || !resultPartyObject[0].partyId) {
      console.log('Failed to get partyId', resultPartyObject);
      return '';
   }
   return resultPartyObject[0].partyId;
};

export const getAccountIdFromResult = (
   result: CreateAccountResponse
): string => {
   return result.accountDetails[0].accountId;
};

export const getEntryType = (accountType: string): string => {
   switch (accountType) {
      case 'individual':
         return 'IndivACParty';
      case 'entity':
         return 'EntityACParty';
      default:
         return 'error';
   }
};

export const getLinkIdFromResult = (result: CreateLinkResponse): string => {
   var linkObject = result.linkDetails[1] as LinkDetail[];
   console.log(linkObject[0]);
   if (!linkObject || !linkObject[0].id) {
      console.log('Failed to get link id', linkObject);
      return '';
   }
   return linkObject[0].id;
};
