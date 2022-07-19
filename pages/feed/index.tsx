import { Menu, Transition } from '@headlessui/react';

import {
   ChatAltIcon,
   CodeIcon,
   DotsVerticalIcon,
   EyeIcon,
   FlagIcon,
   PlusSmIcon,
   ShareIcon,
   StarIcon,
   ThumbUpIcon,
} from '@heroicons/react/solid';
import { Fragment } from 'react';
import Header from '../../components/navigation/Header';
import { Sidebar } from '../../components/navigation/Sidebar';

const user = {
   name: 'Chelsea Hagon',
   email: 'chelsea.hagon@example.com',
   imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const tabs = [
   { name: 'Recent', href: '#', current: true },
   { name: 'Favorites', href: '#', current: false },
   { name: 'Most Shared', href: '#', current: false },
];
const questions = [
   {
      id: '81614',
      likes: '29',
      replies: '11',
      views: '2.7k',
      author: {
         name: 'ChainRaise',
         imageUrl: 'chainraise_logo.png',
         href: '#',
      },
      date: 'December 9 at 11:43 AM',
      datetime: '2020-12-09T11:43:00',
      href: '#',
      body: `
      <p>Check out our first live offering over <a href="#">here</a>!</p>
    `,
   },
   // More questions...
];
const whoToFollow = [
   {
      name: 'Corey Goodlander',
      handle: 'coreygoodlander',
      href: '#',
      imageUrl: 'corey.png',
   },
   // More people...
];
const trendingPosts = [
   {
      id: 1,
      user: {
         name: 'ChainRaise',
         imageUrl: 'chainraise_logo.png',
      },
      body: "We're two weeks ahead of our end date! Get in now before it's too late!",
      comments: 291,
   },
   // More posts...
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Example() {
   return (
      <>
         {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
         <Header />
         <div className="min-h-full">
            <div className="py-10">
               <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
                  <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                     <Sidebar />
                  </div>
                  <main className="lg:col-span-9 xl:col-span-6">
                     <div className="px-4 sm:px-0">
                        <div className="sm:hidden">
                           <label htmlFor="question-tabs" className="sr-only">
                              Select a tab
                           </label>
                           <select
                              id="question-tabs"
                              className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                              defaultValue={
                                 tabs.find((tab) => tab.current)!.name
                              }
                           >
                              {tabs.map((tab) => (
                                 <option key={tab.name}>{tab.name}</option>
                              ))}
                           </select>
                        </div>
                        <div className="hidden sm:block">
                           <nav
                              className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
                              aria-label="Tabs"
                           >
                              {tabs.map((tab, tabIdx) => (
                                 <a
                                    key={tab.name}
                                    href={tab.href}
                                    aria-current={
                                       tab.current ? 'page' : undefined
                                    }
                                    className={classNames(
                                       tab.current
                                          ? 'text-gray-900'
                                          : 'text-gray-500 hover:text-gray-700',
                                       tabIdx === 0 ? 'rounded-l-lg' : '',
                                       tabIdx === tabs.length - 1
                                          ? 'rounded-r-lg'
                                          : '',
                                       'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                                    )}
                                 >
                                    <span>{tab.name}</span>
                                    <span
                                       aria-hidden="true"
                                       className={classNames(
                                          tab.current
                                             ? 'bg-rose-500'
                                             : 'bg-transparent',
                                          'absolute inset-x-0 bottom-0 h-0.5'
                                       )}
                                    />
                                 </a>
                              ))}
                           </nav>
                        </div>
                     </div>
                     <div className="mt-4">
                        <h1 className="sr-only">Recent questions</h1>
                        <ul role="list" className="space-y-4">
                           {questions.map((question) => (
                              <li
                                 key={question.id}
                                 className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                              >
                                 <article
                                    aria-labelledby={
                                       'question-title-' + question.id
                                    }
                                 >
                                    <div>
                                       <div className="flex space-x-3">
                                          <div className="flex-shrink-0">
                                             <img
                                                className="h-10 w-10 rounded-full"
                                                src={question.author.imageUrl}
                                                alt=""
                                             />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <p className="text-sm font-medium text-gray-900">
                                                <a
                                                   href={question.author.href}
                                                   className="hover:underline"
                                                >
                                                   {question.author.name}
                                                </a>
                                             </p>
                                             <p className="text-sm text-gray-500">
                                                <a
                                                   href={question.href}
                                                   className="hover:underline"
                                                >
                                                   <time
                                                      dateTime={
                                                         question.datetime
                                                      }
                                                   >
                                                      {question.date}
                                                   </time>
                                                </a>
                                             </p>
                                          </div>
                                          <div className="flex flex-shrink-0 self-center">
                                             <Menu
                                                as="div"
                                                className="relative inline-block text-left"
                                             >
                                                <div>
                                                   <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                                      <span className="sr-only">
                                                         Open options
                                                      </span>
                                                      <DotsVerticalIcon
                                                         className="h-5 w-5"
                                                         aria-hidden="true"
                                                      />
                                                   </Menu.Button>
                                                </div>

                                                <Transition
                                                   as={Fragment}
                                                   enter="transition ease-out duration-100"
                                                   enterFrom="transform opacity-0 scale-95"
                                                   enterTo="transform opacity-100 scale-100"
                                                   leave="transition ease-in duration-75"
                                                   leaveFrom="transform opacity-100 scale-100"
                                                   leaveTo="transform opacity-0 scale-95"
                                                >
                                                   <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                      <div className="py-1">
                                                         <Menu.Item>
                                                            {({ active }) => (
                                                               <a
                                                                  href="#"
                                                                  className={classNames(
                                                                     active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                     'flex px-4 py-2 text-sm'
                                                                  )}
                                                               >
                                                                  <StarIcon
                                                                     className="mr-3 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"
                                                                  />
                                                                  <span>
                                                                     Add to
                                                                     favorites
                                                                  </span>
                                                               </a>
                                                            )}
                                                         </Menu.Item>
                                                         <Menu.Item>
                                                            {({ active }) => (
                                                               <a
                                                                  href="#"
                                                                  className={classNames(
                                                                     active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                     'flex px-4 py-2 text-sm'
                                                                  )}
                                                               >
                                                                  <CodeIcon
                                                                     className="mr-3 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"
                                                                  />
                                                                  <span>
                                                                     Embed
                                                                  </span>
                                                               </a>
                                                            )}
                                                         </Menu.Item>
                                                         <Menu.Item>
                                                            {({ active }) => (
                                                               <a
                                                                  href="#"
                                                                  className={classNames(
                                                                     active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-700',
                                                                     'flex px-4 py-2 text-sm'
                                                                  )}
                                                               >
                                                                  <FlagIcon
                                                                     className="mr-3 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"
                                                                  />
                                                                  <span>
                                                                     Report
                                                                     content
                                                                  </span>
                                                               </a>
                                                            )}
                                                         </Menu.Item>
                                                      </div>
                                                   </Menu.Items>
                                                </Transition>
                                             </Menu>
                                          </div>
                                       </div>
                                    </div>
                                    <div
                                       className="mt-3 space-y-4 text-sm text-gray-700"
                                       dangerouslySetInnerHTML={{
                                          __html: question.body,
                                       }}
                                    />
                                    <div className="mt-5 flex justify-between space-x-8">
                                       <div className="flex space-x-6">
                                          <span className="inline-flex items-center text-sm">
                                             <button
                                                type="button"
                                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                             >
                                                <ThumbUpIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                                <span className="font-medium text-gray-900">
                                                   {question.likes}
                                                </span>
                                                <span className="sr-only">
                                                   likes
                                                </span>
                                             </button>
                                          </span>
                                          <span className="inline-flex items-center text-sm">
                                             <button
                                                type="button"
                                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                             >
                                                <ChatAltIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                                <span className="font-medium text-gray-900">
                                                   {question.replies}
                                                </span>
                                                <span className="sr-only">
                                                   replies
                                                </span>
                                             </button>
                                          </span>
                                          <span className="inline-flex items-center text-sm">
                                             <button
                                                type="button"
                                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                             >
                                                <EyeIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                                <span className="font-medium text-gray-900">
                                                   {question.views}
                                                </span>
                                                <span className="sr-only">
                                                   views
                                                </span>
                                             </button>
                                          </span>
                                       </div>
                                       <div className="flex text-sm">
                                          <span className="inline-flex items-center text-sm">
                                             <button
                                                type="button"
                                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                             >
                                                <ShareIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                                <span className="font-medium text-gray-900">
                                                   Share
                                                </span>
                                             </button>
                                          </span>
                                       </div>
                                    </div>
                                 </article>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </main>
                  <aside className="hidden xl:col-span-4 xl:block">
                     <div className="sticky top-4 space-y-4">
                        <section aria-labelledby="who-to-follow-heading">
                           <div className="rounded-lg bg-white shadow">
                              <div className="p-6">
                                 <h2
                                    id="who-to-follow-heading"
                                    className="text-base font-medium text-gray-900"
                                 >
                                    Who to follow
                                 </h2>
                                 <div className="mt-6 flow-root">
                                    <ul
                                       role="list"
                                       className="-my-4 divide-y divide-gray-200"
                                    >
                                       {whoToFollow.map((user) => (
                                          <li
                                             key={user.handle}
                                             className="flex items-center space-x-3 py-4"
                                          >
                                             <div className="flex-shrink-0">
                                                <img
                                                   className="h-8 w-8 rounded-full"
                                                   src={user.imageUrl}
                                                   alt=""
                                                />
                                             </div>
                                             <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                   <a href={user.href}>
                                                      {user.name}
                                                   </a>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                   <a href={user.href}>
                                                      {'@' + user.handle}
                                                   </a>
                                                </p>
                                             </div>
                                             <div className="flex-shrink-0">
                                                <button
                                                   type="button"
                                                   className="inline-flex items-center rounded-full bg-rose-50 px-3 py-0.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
                                                >
                                                   <PlusSmIcon
                                                      className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                                                      aria-hidden="true"
                                                   />
                                                   <span>Follow</span>
                                                </button>
                                             </div>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="mt-6">
                                    <a
                                       href="#"
                                       className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                       View all
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </section>
                        <section aria-labelledby="trending-heading">
                           <div className="rounded-lg bg-white shadow">
                              <div className="p-6">
                                 <h2
                                    id="trending-heading"
                                    className="text-base font-medium text-gray-900"
                                 >
                                    Trending
                                 </h2>
                                 <div className="mt-6 flow-root">
                                    <ul
                                       role="list"
                                       className="-my-4 divide-y divide-gray-200"
                                    >
                                       {trendingPosts.map((post) => (
                                          <li
                                             key={post.id}
                                             className="flex space-x-3 py-4"
                                          >
                                             <div className="flex-shrink-0">
                                                <img
                                                   className="h-8 w-8 rounded-full"
                                                   src={post.user.imageUrl}
                                                   alt={post.user.name}
                                                />
                                             </div>
                                             <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-800">
                                                   {post.body}
                                                </p>
                                                <div className="mt-2 flex">
                                                   <span className="inline-flex items-center text-sm">
                                                      <button
                                                         type="button"
                                                         className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                                      >
                                                         <ChatAltIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                         />
                                                         <span className="font-medium text-gray-900">
                                                            {post.comments}
                                                         </span>
                                                      </button>
                                                   </span>
                                                </div>
                                             </div>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="mt-6">
                                    <a
                                       href="#"
                                       className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                       View all
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </section>
                     </div>
                  </aside>
               </div>
            </div>
         </div>
      </>
   );
}
