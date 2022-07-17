/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { useNewDocModalStore } from '../../lib/zustand/newDocModalStore';

export default function DocumentModal() {
   const newDocModalStore = useNewDocModalStore();
   const [numPages, setNumPages] = useState(0);
   const [pageNumber, setPageNumber] = useState(1);
   let sigPad = {};

   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
      setNumPages(numPages);
   }

   return (
      <Transition.Root show={newDocModalStore.modalOpen} as={Fragment}>
         <Dialog
            as="div"
            className="relative z-10"
            onClose={() => newDocModalStore.setModalOpen(false)}
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
                           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon
                                 className="h-6 w-6 text-green-600"
                                 aria-hidden="true"
                              />
                           </div>
                           <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title
                                 as="h3"
                                 className="text-lg font-medium leading-6 text-gray-900"
                              >
                                 Sign offering agreement
                              </Dialog.Title>
                              <div className="mt-2">
                                 <button
                                    type="button"
                                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                 ></button>
                              </div>
                           </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                           <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              onClick={() =>
                                 newDocModalStore.setModalOpen(false)
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
