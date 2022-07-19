import {
   AcademicCapIcon,
   BadgeCheckIcon,
   CashIcon,
   ClockIcon,
   ReceiptRefundIcon,
   UsersIcon,
} from '@heroicons/react/outline';

const organization = {
   name: 'ChainRaise',
   email: 'info@chainraise.io',
   role: 'Human Resources Manager',
   imageUrl: '/chainraise_logo.png',
   description: 'oooooh gibberish lorem ipsum yeah we do stuff and make money',
};

const stats = [
   { label: 'Live offering', value: 1 },
   { label: 'Followers', value: 420 },
   { label: 'dollars raised so far', value: 2500000 },
];
const actions = [
   {
      icon: ClockIcon,
      name: 'Offering 1',
      href: '#',
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
   },
   {
      icon: BadgeCheckIcon,
      name: 'Offering 2',
      href: '#',
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
   },
   {
      icon: UsersIcon,
      name: 'Offering 3',
      href: '#',
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
   },
   {
      icon: CashIcon,
      name: 'Offering 4',
      href: '#',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
   },
   {
      icon: ReceiptRefundIcon,
      name: 'Offering 5',
      href: '#',
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
   },
   {
      icon: AcademicCapIcon,
      name: 'Offering 6',
      href: '#',
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
   },
];
const teamMembers = [
   {
      name: 'Leonard Krasner',
      handle: 'leonardkrasner',
      imageUrl:
         'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
   },
   {
      name: 'Floyd Miles',
      handle: 'floydmiles',
      imageUrl:
         'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
   },
   {
      name: 'Emily Selman',
      handle: 'emilyselman',
      imageUrl:
         'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
   },
   {
      name: 'Kristin Watson',
      handle: 'kristinwatson',
      imageUrl:
         'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
   },
];
const announcements = [
   {
      id: 1,
      title: 'Office closed on July 2nd',
      href: '#',
      preview:
         'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
   },
   {
      id: 2,
      title: 'New password policy',
      href: '#',
      preview:
         'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
   },
   {
      id: 3,
      title: 'Office closed on July 2nd',
      href: '#',
      preview:
         'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
   },
];
function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}
export const MainTab = () => {
   return (
      <>
         <h1 className="sr-only">Profile</h1>
         {/* Main 3 column grid */}
         <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
               {/* Welcome panel */}
               <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                     <h2 className="sr-only" id="profile-overview-title">
                        Profile Overview
                     </h2>
                     <div className="bg-white p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                           <div className="sm:flex sm:space-x-5">
                              <div className="flex-shrink-0">
                                 <img
                                    className="mx-auto h-20 w-20 rounded-full"
                                    src={organization.imageUrl}
                                    alt=""
                                 />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                 <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {organization.name}
                                 </p>
                                 <p className="text-sm font-medium text-gray-600">
                                    {organization.description}
                                 </p>
                              </div>
                           </div>
                           <div className="mt-5 flex justify-center sm:mt-0">
                              <a
                                 href="#"
                                 className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                              >
                                 New offering
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                        {stats.map((stat) => (
                           <div
                              key={stat.label}
                              className="px-6 py-5 text-center text-sm font-medium"
                           >
                              <span className="text-gray-900">
                                 {stat.value}
                              </span>{' '}
                              <span className="text-gray-600">
                                 {stat.label}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Actions panel */}
               <section aria-labelledby="quick-links-title">
                  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                     <h2 className="sr-only" id="quick-links-title">
                        Quick links
                     </h2>
                     {actions.map((action, actionIdx) => (
                        <div
                           key={action.name}
                           className={classNames(
                              actionIdx === 0
                                 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                 : '',
                              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                              actionIdx === actions.length - 2
                                 ? 'sm:rounded-bl-lg'
                                 : '',
                              actionIdx === actions.length - 1
                                 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                 : '',
                              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                           )}
                        >
                           <div>
                              <span
                                 className={classNames(
                                    action.iconBackground,
                                    action.iconForeground,
                                    'inline-flex rounded-lg p-3 ring-4 ring-white'
                                 )}
                              >
                                 <action.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                 />
                              </span>
                           </div>
                           <div className="mt-8">
                              <h3 className="text-lg font-medium">
                                 <a
                                    href={action.href}
                                    className="focus:outline-none"
                                 >
                                    {/* Extend touch target to entire panel */}
                                    <span
                                       className="absolute inset-0"
                                       aria-hidden="true"
                                    />
                                    {action.name}
                                 </a>
                              </h3>
                              <p className="mt-2 text-sm text-gray-500">
                                 Doloribus dolores nostrum quia qui natus
                                 officia quod et dolorem. Sit repellendus qui ut
                                 at blanditiis et quo et molestiae.
                              </p>
                           </div>
                           <span
                              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                              aria-hidden="true"
                           >
                              <svg
                                 className="h-6 w-6"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                              </svg>
                           </span>
                        </div>
                     ))}
                  </div>
               </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
               {/* Announcements */}
               <section aria-labelledby="announcements-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                     <div className="p-6">
                        <h2
                           className="text-base font-medium text-gray-900"
                           id="announcements-title"
                        >
                           Announcements
                        </h2>
                        <div className="mt-6 flow-root">
                           <ul
                              role="list"
                              className="-my-5 divide-y divide-gray-200"
                           >
                              {announcements.map((announcement) => (
                                 <li key={announcement.id} className="py-5">
                                    <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                       <h3 className="text-sm font-semibold text-gray-800">
                                          <a
                                             href={announcement.href}
                                             className="hover:underline focus:outline-none"
                                          >
                                             {/* Extend touch target to entire panel */}
                                             <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                             />
                                             {announcement.title}
                                          </a>
                                       </h3>
                                       <p className="line-clamp-2 mt-1 text-sm text-gray-600">
                                          {announcement.preview}
                                       </p>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="mt-6">
                           <a
                              href="#"
                              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                           >
                              View all
                           </a>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Recent Hires */}
               <section aria-labelledby="recent-hires-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                     <div className="p-6">
                        <h2
                           className="text-base font-medium text-gray-900"
                           id="recent-hires-title"
                        >
                           Team Members
                        </h2>
                        <div className="mt-6 flow-root">
                           <ul
                              role="list"
                              className="-my-5 divide-y divide-gray-200"
                           >
                              {teamMembers.map((person) => (
                                 <li key={person.handle} className="py-4">
                                    <div className="flex items-center space-x-4">
                                       <div className="flex-shrink-0">
                                          <img
                                             className="h-8 w-8 rounded-full"
                                             src={person.imageUrl}
                                             alt=""
                                          />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <p className="truncate text-sm font-medium text-gray-900">
                                             {person.name}
                                          </p>
                                          <p className="truncate text-sm text-gray-500">
                                             {'@' + person.handle}
                                          </p>
                                       </div>
                                       <div>
                                          <a
                                             href={person.href}
                                             className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                          >
                                             View
                                          </a>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="mt-6">
                           <a
                              href="#"
                              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                           >
                              View all
                           </a>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </>
   );
};
