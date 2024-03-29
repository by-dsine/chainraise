import React from 'react';
import {
   ChatAlt2Icon,
   CheckCircleIcon,
   SaveIcon,
   ShareIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

const tabs = [
   { name: 'Following', href: '#', current: true },
   { name: 'Trending', href: '#', current: false },
];

const messages = [
   {
      id: 1,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'post',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
   {
      id: 2,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'post',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
   {
      id: 3,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'article',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
   {
      id: 4,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'post',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
   {
      id: 5,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'post',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
   {
      id: 6,
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'DJ Dilla, CTO',
      senderPic: '/dylan.png',
      previewPic: '/logomark.png',
      time: '1d ago',
      type: 'article',
      datetime: '2021-01-27T16:35',
      preview:
         'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
   },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export function Feed() {
   return (
      <section aria-labelledby="my-feed">
         <h2 className="sr-only" id="my-feed">
            My feed
         </h2>
         <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
               <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
                  <div className="md:flex md:items-center md:justify-between">
                     <h3 className="text-lg font-medium leading-6 text-gray-900">
                        My Feed
                     </h3>
                     <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
                        <button
                           type="button"
                           className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                           Find Connections
                        </button>
                        <Link href="/post/create">
                           <button
                              type="button"
                              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                           >
                              Create Post
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="mt-4">
                     <div className="sm:hidden">
                        <label htmlFor="current-tab" className="sr-only">
                           Select a tab
                        </label>
                        <select
                           id="current-tab"
                           name="current-tab"
                           className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           defaultValue={tabs.find((tab) => tab.current)!.name}
                        >
                           {tabs.map((tab) => (
                              <option key={tab.name}>{tab.name}</option>
                           ))}
                        </select>
                     </div>
                     <div className="hidden sm:block">
                        <nav className="-mb-px flex space-x-8">
                           {tabs.map((tab) => (
                              <a
                                 key={tab.name}
                                 href={tab.href}
                                 className={classNames(
                                    tab.current
                                       ? 'border-indigo-500 text-indigo-600'
                                       : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                 )}
                                 aria-current={tab.current ? 'page' : undefined}
                              >
                                 {tab.name}
                              </a>
                           ))}
                        </nav>
                     </div>
                  </div>
                  <ul role="list" className="divide-y divide-gray-200">
                     {messages.map((message) => (
                        <li
                           key={message.id}
                           className="relative bg-white px-4 pt-5 pb-1"
                        >
                           <div className="flex justify-between space-x-3">
                              <div className="min-w-0 flex-1">
                                 <div className="flex items-center space-x-4">
                                    <span className="relative inline-block">
                                       <img
                                          className="h-10 w-10 rounded-full"
                                          src={message.senderPic}
                                          alt=""
                                       />
                                       <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white">
                                          <CheckCircleIcon className="text-white" />
                                       </span>
                                    </span>
                                    <div className="flex flex-col">
                                       <p className="truncate text-sm font-medium text-gray-900">
                                          {message.sender}
                                       </p>
                                       <p className="truncate text-sm text-gray-500">
                                          {message.subject}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <time
                                 dateTime={message.datetime}
                                 className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                              >
                                 {message.time}
                              </time>
                           </div>
                           <div className="mt-2">
                              <div className="flex">
                                 <p className="line-clamp-2 flex-grow text-sm text-gray-600">
                                    {message.preview}
                                 </p>
                                 {message.previewPic && (
                                    <img
                                       className="aspect-square max-h-12"
                                       src={message.previewPic}
                                       alt="preview pic"
                                    />
                                 )}
                              </div>
                           </div>
                           <div className="bg-gray grid w-full grid-cols-1 justify-items-stretch p-1 pt-2 md:grid-cols-2 lg:grid-cols-3">
                              <button className="col-span-1 rounded-sm hover:bg-gray-50">
                                 Comments
                                 <ChatAlt2Icon className="inline-flex h-6 w-6 px-1" />
                              </button>
                              <button className="col-span-1 rounded-sm hover:bg-gray-50">
                                 Share
                                 <ShareIcon className="inline-flex h-6 w-6 px-1" />
                              </button>
                              <button className="col-span-1 rounded-sm hover:bg-gray-50">
                                 Save
                                 <SaveIcon className="inline-flex h-6 w-6 px-1" />
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
}
