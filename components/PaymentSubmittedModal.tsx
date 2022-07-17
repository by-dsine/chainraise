/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { usePaymentSubmittedModalStore } from '../lib/zustand/paymentSubmittedModalStore';

export default function PaymentSubmittedModal() {
   const paymentSubmittedModalStore = usePaymentSubmittedModalStore();

   return (
      <Transition.Root
         show={paymentSubmittedModalStore.modalOpen}
         as={Fragment}
      >
         <Dialog
            as="div"
            className="relative z-10"
            onClose={() => paymentSubmittedModalStore.setModalOpen(false)}
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                           <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title
                                 as="h3"
                                 className="text-lg font-medium leading-6 text-gray-900"
                              >
                                 Payment submitted
                              </Dialog.Title>
                              <div className="mt-2">
                                 <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Share why you believe in ChainRaise!
                                 </label>
                                 <div className="mt-1">
                                    <textarea
                                       rows={4}
                                       name="comment"
                                       id="comment"
                                       className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       defaultValue={''}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                           <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent border-cr-primary bg-white px-4 py-2 text-base font-medium text-cr-primary shadow-sm hover:ring-cr-primary focus:outline-none sm:text-sm"
                              onClick={() =>
                                 paymentSubmittedModalStore.setModalOpen(false)
                              }
                           >
                              Share
                           </button>
                           <button
                              type="button"
                              className="mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              onClick={() =>
                                 paymentSubmittedModalStore.setModalOpen(false)
                              }
                           >
                              Go back to dashboard
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
}
