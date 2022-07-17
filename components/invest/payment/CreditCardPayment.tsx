import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CARDS } from '../../../lib/consts';
import { usePaymentMethodStore } from '../../../lib/zustand/paymentStore';
import { CCPayment, PaymentMethodForm } from '../../../types/typings';
import CreditCard from './cc/CreditCard';

export const CreditCardPayment = () => {
   const paymentMethodForm = usePaymentMethodStore();

   let schema = yup.object().shape({
      ownerName: yup.string().required(),
      cardNumber: yup.number().required().positive().integer(),
      expirationDate: yup.string().required(),
      cvvNumber: yup.number().required().positive().integer(),
      cardType: yup.string().oneOf(['VI', 'MC', 'DI']).required(), // [“VI”,”MC”,”DI”]
   });

   const {
      register,
      setValue,
      watch,
      formState: { errors },
      handleSubmit,
   } = useForm<CCPayment>({
      resolver: yupResolver(schema),
   });

   const watchCardNumber = watch('cardNumber');

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         console.log(watchCardNumber);
         for (const [card, pattern] of Object.entries(CARDS)) {
            let re = new RegExp(pattern);
            if (watchCardNumber?.toString().match(re) != null) {
               setValue('cardType', card);
               console.log(card);
            }
         }
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
   }, [watchCardNumber]);

   const onSubmit = handleSubmit(async (data) => {
      console.log('Plink');
      // validate credit card submitted

      // add credit card to payment method form
      paymentMethodForm.setCC(data);

      // submit payment method form
      const paymentMethod = {
         offeringSlug: paymentMethodForm.offeringSlug,
         paymentMethod: paymentMethodForm.paymentMethod,
         transactionAmount: paymentMethodForm.transactionAmount,
         cc: data,
      } as PaymentMethodForm;

      const response = await fetch('/api/payment/submit', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify(paymentMethod),
      });

      const result = await response.json();

      console.log(result);
   });

   return (
      <form onSubmit={onSubmit} className="mt-4">
         <CreditCard />
         <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
            {/* <div className="col-span-4">
               <label
                  htmlFor="name-on-card"
                  className="block text-sm font-medium text-gray-700"
               >
                  Name on card
               </label>
               <div className="mt-1">
                  <input
                     type="text"
                     id="name-on-card"
                     {...register('ownerName')}
                     autoComplete="cc-name"
                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
            </div>

            <div className="col-span-3">
               <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700"
               >
                  Expiration date (MMYY)
               </label>
               <div className="mt-1">
                  <input
                     type="text"
                     {...register('expirationDate')}
                     id="expiration-date"
                     autoComplete="cc-exp"
                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
               >
                  CVV
               </label>
               <div className="mt-1">
                  <input
                     type="text"
                     {...register('cvvNumber')}
                     id="cvv"
                     autoComplete="cvv"
                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
            </div> */}
         </div>

         <div className="py-5">
            <div className="flex justify-end">
               <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
               >
                  Next
               </button>
            </div>
         </div>
      </form>
   );
};
