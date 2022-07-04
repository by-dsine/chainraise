import { ACCEPTED_CARDS, CARDS } from '../lib/consts';
import { CCPayment } from '../types/typings';

export function makeID(length: number): string {
   var result = '';
   var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (var i = 0; i < length; i++) {
      result += characters.charAt(
         Math.floor(Math.random() * characters.length)
      );
   }
   return result;
}

export function isCCValid(cc: CCPayment | null) {
   if (!cc) {
      return false;
   }
   let ownerName = cc.ownerName;
   let cardNumber = cc.cardNumber;
   let expirationDate = cc.expirationDate;
   let cardType = cc.cardType;
   let cvvNumber = cc.cvvNumber;
   let cardTypeMatchesNumber = false;

   if (
      !ownerName ||
      !cardNumber ||
      !expirationDate ||
      !cardType ||
      !cvvNumber
   ) {
      return false;
   }

   // verify card type is correct
   for (const [card, pattern] of Object.entries(CARDS)) {
      let re = new RegExp(pattern);
      if (cardNumber?.toString().match(re) != null) {
         if (card == cardType) {
            cardTypeMatchesNumber = true;
            if (!ACCEPTED_CARDS.includes(cardType)) {
               return false;
            }
         }
      }
   }

   // make sure expiration date makes sense
   let re: RegExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // forces MMYY format
   if (!re.test(expirationDate)) {
      return false;
   }

   return cardTypeMatchesNumber;
}
