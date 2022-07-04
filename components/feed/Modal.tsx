import React, { ChangeEvent, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
   CameraIcon,
   ExclamationIcon,
   XIcon,
   NewspaperIcon,
} from '@heroicons/react/outline';
import { PaperClipIcon } from '@heroicons/react/solid';

import Link from 'next/link';

const Modal = () => {
   const [open, setOpen] = useState(false);
   const filePickerRef = useRef<HTMLInputElement | null>(null);
   const titleRef = useRef<HTMLInputElement | null>(null);
   const captionRef = useRef<HTMLInputElement | null>(null);
   const [loading, setLoading] = useState(false);
   const [fileSelected, setFileSelected] = React.useState<File>();

   const uploadPost = async () => {
      console.log('Upload Post function triggered');

      setOpen(false);
      setLoading(false);
      setFileSelected(undefined);
   };

   const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      const fileList = e.target.files;

      if (!fileList) return;
      reader.readAsDataURL(fileList[0]);

      reader.onload = (readerEvent) => {
         setFileSelected(fileList[0]);
      };
   };

   return (
      <Transition.Root show={open} as={Fragment}>
         <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={setOpen}
         >
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
               </Transition.Child>

               {/* This element is to trick the browser into centering the modal contents. */}
               <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
               >
                  &#8203;
               </span>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               >
                  <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle">
                     {/* dialog header  */}
                     <div className="relative flex justify-center border-b">
                        {/* dialog new article button  */}
                        <div className="absolute left-0 p-2">
                           <Link href="/articles/create">
                              <a onClick={() => setOpen(false)}>
                                 <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                 >
                                    New Article
                                    <NewspaperIcon
                                       className="ml-2 -mr-1 h-5 w-5"
                                       aria-hidden="true"
                                    />
                                 </button>
                              </a>
                           </Link>
                        </div>
                        {/* dialog title  */}
                        <Dialog.Title className=" py-4 text-xl font-bold">
                           Create Post
                        </Dialog.Title>
                        {/* dialog close icon button  */}
                        <div className="absolute right-0 p-2">
                           <button
                              className="rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
                              onClick={() => setOpen(false)}
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                 />
                              </svg>
                           </button>
                        </div>
                     </div>
                     {/* dialog body  */}
                     <Dialog.Description>
                        {/* post author profile */}
                        <div className="my-2 flex items-center space-x-2 px-4">
                           <div>
                              <div className="flex cursor-pointer items-center space-x-2 rounded-lg px-2 py-1 font-bold"></div>
                           </div>
                        </div>

                        {/* create post interface */}
                        <div className="px-4 py-2">
                           <div className="mb-4">
                              <textarea
                                 className="w-full resize-none rounded-md border-gray-300 text-xl placeholder-gray-700 focus:outline-none"
                                 rows={6}
                                 placeholder=""
                              />
                           </div>
                        </div>

                        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                           <div className="flex">
                              <button
                                 type="button"
                                 className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                              >
                                 <PaperClipIcon
                                    className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                                    aria-hidden="true"
                                 />
                                 <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                                    Attach a file
                                 </span>
                              </button>
                           </div>
                           <div className="flex-shrink-0">
                              <button
                                 type="submit"
                                 className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                 Create
                              </button>
                           </div>
                        </div>
                     </Dialog.Description>
                  </div>
               </Transition.Child>
            </div>
         </Dialog>
      </Transition.Root>
   );
};

export default Modal;
