import React, { ChangeEvent, Fragment, useRef, useState } from 'react';
import {
   EmojiHappyIcon as EmojiHappyIconOutline,
   PaperClipIcon,
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import {
   EmojiHappyIcon as EmojiHappyIconSolid,
   EmojiSadIcon,
   FireIcon,
   HeartIcon,
   ThumbUpIcon,
   XIcon,
} from '@heroicons/react/solid';
import { INewPostForm } from '../../types/typings';
import {
   Controller,
   ControllerRenderProps,
   SubmitHandler,
   useForm,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';

const moods = [
   {
      name: 'Excited',
      value: 'excited',
      icon: FireIcon,
      iconColor: 'text-white',
      bgColor: 'bg-red-500',
   },
   {
      name: 'Loved',
      value: 'loved',
      icon: HeartIcon,
      iconColor: 'text-white',
      bgColor: 'bg-pink-400',
   },
   {
      name: 'Happy',
      value: 'happy',
      icon: EmojiHappyIconSolid,
      iconColor: 'text-white',
      bgColor: 'bg-green-400',
   },
   {
      name: 'Sad',
      value: 'sad',
      icon: EmojiSadIcon,
      iconColor: 'text-white',
      bgColor: 'bg-yellow-400',
   },
   {
      name: 'Thumbsy',
      value: 'thumbsy',
      icon: ThumbUpIcon,
      iconColor: 'text-white',
      bgColor: 'bg-blue-500',
   },
   {
      name: 'I feel nothing',
      value: null,
      icon: XIcon,
      iconColor: 'text-gray-400',
      bgColor: 'bg-transparent',
   },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function QuickPost() {
   const { data: session } = useSession();

   const [selected, setSelected] = useState(moods[5]);
   const [submitted, setSubmitted] = useState(false);
   const [fileSelected, setFileSelected] = React.useState<File>();

   const {
      control,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<INewPostForm>();

   const onSubmit = handleSubmit(async (data) => {
      const result = await fetch(`/api/posts/createPost`, {
         body: JSON.stringify(data),
         method: 'POST',
      });

      const json = await result.json();
   });

   const handleChange = (
      event: any,
      field: ControllerRenderProps<INewPostForm, 'mood'>
   ) => {
      field.onChange(event);
      setSelected(event);
   };

   return (
      <section aria-labelledby="quick-post">
         <h2 className="sr-only" id="quick-post">
            Quick Post
         </h2>
         <div className="overflow-visible rounded-lg bg-white shadow">
            <div className="p-6">
               <div className="min-w-0 flex-1">
                  <form onSubmit={onSubmit}>
                     <div className="border-b border-gray-200 focus-within:border-indigo-600">
                        <label htmlFor="comment" className="sr-only">
                           Post
                        </label>
                        <textarea
                           {...register('body')}
                           rows={3}
                           className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                        />
                     </div>
                     <div className="flex justify-between pt-2">
                        <div className="flex items-center space-x-5">
                           <div className="flow-root">
                              <button
                                 type="button"
                                 className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                              >
                                 <PaperClipIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                 />
                                 <span className="sr-only">Attach a file</span>
                                 <input
                                    {...register('image')}
                                    className="absolute w-6 opacity-0"
                                    type="file"
                                 />
                              </button>
                           </div>
                           <div className="flow-root">
                              <Controller
                                 name="mood"
                                 control={control}
                                 render={({ field }) => (
                                    <Listbox
                                       value={field.value}
                                       onChange={(event) =>
                                          handleChange(event, field)
                                       }
                                    >
                                       {({ open }) => (
                                          <>
                                             <Listbox.Label className="sr-only">
                                                Your mood
                                             </Listbox.Label>
                                             <div className="relative">
                                                <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                                   <span className="flex items-center justify-center">
                                                      {selected.value ===
                                                      null ? (
                                                         <span>
                                                            <EmojiHappyIconOutline
                                                               className="h-6 w-6 flex-shrink-0"
                                                               aria-hidden="true"
                                                            />
                                                            <span className="sr-only">
                                                               Add your mood
                                                            </span>
                                                         </span>
                                                      ) : (
                                                         <span>
                                                            <span
                                                               className={classNames(
                                                                  selected.bgColor,
                                                                  'flex h-8 w-8 items-center justify-center rounded-full'
                                                               )}
                                                            >
                                                               <selected.icon
                                                                  className="h-5 w-5 flex-shrink-0 text-white"
                                                                  aria-hidden="true"
                                                               />
                                                            </span>
                                                            <span className="sr-only">
                                                               {selected.name}
                                                            </span>
                                                         </span>
                                                      )}
                                                   </span>
                                                </Listbox.Button>

                                                <Transition
                                                   show={open}
                                                   as={Fragment}
                                                   leave="transition ease-in duration-100"
                                                   leaveFrom="opacity-100"
                                                   leaveTo="opacity-0"
                                                >
                                                   <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                      {moods.map((mood) => (
                                                         <Listbox.Option
                                                            key={mood.value}
                                                            className={({
                                                               active,
                                                            }) =>
                                                               classNames(
                                                                  active
                                                                     ? 'bg-gray-100'
                                                                     : 'bg-white',
                                                                  'relative cursor-default select-none py-2 px-3'
                                                               )
                                                            }
                                                            value={mood}
                                                         >
                                                            <div className="flex items-center">
                                                               <div
                                                                  className={classNames(
                                                                     mood.bgColor,
                                                                     'flex h-8 w-8 items-center justify-center rounded-full'
                                                                  )}
                                                               >
                                                                  <mood.icon
                                                                     className={classNames(
                                                                        mood.iconColor,
                                                                        'h-5 w-5 flex-shrink-0'
                                                                     )}
                                                                     aria-hidden="true"
                                                                  />
                                                               </div>
                                                               <span className="ml-3 block truncate font-medium">
                                                                  {mood.name}
                                                               </span>
                                                            </div>
                                                         </Listbox.Option>
                                                      ))}
                                                   </Listbox.Options>
                                                </Transition>
                                             </div>
                                          </>
                                       )}
                                    </Listbox>
                                 )}
                              />
                           </div>
                           {fileSelected && (
                              <div className="flow-root">
                                 <p>{fileSelected.name}</p>
                              </div>
                           )}
                        </div>
                        <div className="flex-shrink-0">
                           <button className="inline-flex items-center rounded-md border border-transparent bg-cr-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Post
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}
