import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePaymentMethodStore } from '../../lib/zustand/paymentStore';
import { PaymentMethodForm } from '../../types/typings';
import { ACHPayment } from './payment/ACHPayment';
import { CreditCardPayment } from './payment/CreditCardPayment';
import { WirePayment } from './payment/WirePayment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const paymentMethods: PaymentMethod[] = [
   { id: 'cc', title: 'Credit card' },
   { id: 'ach', title: 'ACH' },
   { id: 'wire', title: 'Wire' },
];

type PaymentMethod = {
   id: string;
   title: string;
};

export const SubmitPayment = () => {
   const router = useRouter();
   const { offering, amount } = router.query;

   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
      id: 'cc',
      title: 'Credit card',
   });

   let schema = yup.object().shape({
      offeringSlug: yup.string().required(),
      paymentMethod: yup.string().required(),
      transactionAmount: yup.number().required().positive().integer(),
      cc: yup.object().when('paymentMethod', {
         is: (paymentMethod: string) => paymentMethod == 'cc',
         then: yup
            .object()
            .shape({
               ownerName: yup.string().required(),
               cardNumber: yup.number().required().positive().integer(),
               expirationDate: yup.string().required(),
               cvvNumber: yup.number().required().positive().integer(),
               cardType: yup.string().oneOf(['VI', 'MC', 'DI']).required(), // [“VI”,”MC”,”DI”]
               createdIpAddress: yup.string().required(),
            })
            .required('Credit card information is filled out incorrectly.'),
      }),
      ach: yup.object().when('paymentMethod', {
         is: (paymentMethod: string) => paymentMethod == 'ach',
         then: yup
            .object()
            .shape({
               accountHolderName: yup.string().required(),
               accountName: yup.string().required(),
               routingNumber: yup.number().required().positive().integer(),
               accountNumber: yup.number().required().positive().integer(),
               bankName: yup.string().required(),
               accountType: yup.string().required(),
            })
            .required('ACH information is filled out incorrectly'),
      }),
   });

   const {
      register,
      watch,
      formState: { errors },
      handleSubmit,
   } = useForm<PaymentMethodForm>({
      resolver: yupResolver(schema),
   });
   const watchPaymentMethod = watch('paymentMethod');
   const paymentForm = usePaymentMethodStore();

   useEffect(() => {
      paymentForm.setPaymentMethod(watchPaymentMethod);
   }, [watchPaymentMethod]);

   useEffect(() => {
      if (!offering || !amount) {
         console.log('Uh-oh');
         // TODO: show recently viewed offerings and ask user if they meant to invest is one of these offerings then if they click on one, display an amount and then go straight into the process
      }
      if (typeof offering == 'string') {
         console.log(offering);
         paymentForm.setOfferingSlug(offering);
      }
      if (typeof amount == 'string') {
         console.log(amount);
         paymentForm.setTransactionAmount(parseInt(amount));
      }
   }, [offering, amount]);

   return (
      <>
         {/* Payment */}
         <div className="-pt-10">
            <h2 className="text-lg font-medium text-gray-900">Payment</h2>

            <fieldset className="mt-4">
               <legend className="sr-only">Payment type</legend>
               <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                     <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                           <input
                              onChange={() => setPaymentMethod(paymentMethod)}
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              defaultChecked
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                           />
                        ) : (
                           <input
                              onChange={() => setPaymentMethod(paymentMethod)}
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                           />
                        )}

                        <label
                           htmlFor={paymentMethod.id}
                           className="ml-3 block text-sm font-medium text-gray-700"
                        >
                           {paymentMethod.title}
                        </label>
                     </div>
                  ))}
               </div>
            </fieldset>

            {paymentMethod.id == 'cc' && <CreditCardPayment />}
            {paymentMethod.id == 'ach' && <ACHPayment />}
            {paymentMethod.id == 'wire' && <WirePayment />}
         </div>
      </>
   );
};
