/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { useNewAccountModalStore } from '../../lib/zustand/newAccountModalStore';

export default function NewAccountModal() {
   const newAccountModalOpen = useNewAccountModalStore(
      (state) => state.modalOpen
   );

   const setNewAccountModalOpen = useNewAccountModalStore(
      (state) => state.setModalOpen
   );

   const cancelButtonRef = useRef(null);

   return (
      <Transition.Root show={newAccountModalOpen} as={Fragment}>
         <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setNewAccountModalOpen}
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
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="sm:flex-col sm:items-start">
                           <div className="w-full">
                              {' '}
                              <h3 className="mt-2 text-xl font-bold text-gray-900">
                                 Enter your information below!
                              </h3>
                           </div>
                           <div className="mt-6 grid w-full grid-cols-6 gap-y-6 gap-x-4">
                              <div className="sm:col-span-3">
                                 <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    First name
                                 </label>
                                 <div className="mt-1">
                                    <input
                                       type="text"
                                       name="first-name"
                                       id="first-name"
                                       autoComplete="given-name"
                                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                 </div>
                              </div>

                              <div className="sm:col-span-3">
                                 <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Last name
                                 </label>
                                 <div className="mt-1">
                                    <input
                                       type="text"
                                       name="last-name"
                                       id="last-name"
                                       autoComplete="family-name"
                                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                 </div>
                              </div>

                              <div className="sm:col-span-4">
                                 <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                 >
                                    Email address
                                 </label>
                                 <div className="mt-1">
                                    <input
                                       id="email"
                                       name="email"
                                       type="email"
                                       autoComplete="email"
                                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="mt-2 pt-4 sm:flex sm:flex-row-reverse">
                           <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-cr-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => setNewAccountModalOpen(false)}
                           >
                              Activate
                           </button>
                           <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                              onClick={() => setNewAccountModalOpen(false)}
                              ref={cancelButtonRef}
                           >
                              Cancel
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
