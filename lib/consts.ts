export const CLIENT_ID = process.env.NORTH_CAPITAL_CLIENT_ID;
export const DEVELOPER_KEY = process.env.NORTH_CAPITAL_DEVELOPER_KEY;

export const NOT_STARTED = 'Not Started';
export const PARTY_CREATED = 'Party Created';
export const AUTO_APPROVED = 'Auto Approved';
export const DISAPPROVED = 'Disapproved';
export const STANDARD_DISCLOSURE = 'Standard words go here';

export const OFFERING_CREATED_STATUS = 1;

export const TRANSACTION_CREATED_STATUS = 'created';

export const CARDS = {
   VI: '^4', // Visa, accepted by North Capital
   amex: '^(34|37)',
   MC: '^5[1-5]', // Mastercard, accepted by North Capital
   DI: '^6011', // Discover, accepted by North Capital
   unionpay: '^62',
   troy: '^9792',
   diners: '^(30[0-5]|36)',
};

export const ACCEPTED_CARDS = ['VI', 'MC', 'DI'];

export const CREDIT_CARD_TXN_LIMIT = 500000; // max transaction amount in cents (as of 6/28/22: $5000)
