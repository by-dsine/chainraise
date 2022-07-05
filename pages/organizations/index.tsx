import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import {
   ArrowRightIcon,
   ChevronLeftIcon,
   FilterIcon,
   MailIcon,
   PhoneIcon,
   SearchIcon,
} from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import Header from '../../components/navigation/Header';

const directory = {
   A: [
      {
         id: 1,
         name: 'Leslie Abbott',
         role: 'Co-Founder / CEO',
         imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 2,
         name: 'Hector Adams',
         role: 'VP, Marketing',
         imageUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 3,
         name: 'Blake Alexander',
         role: 'Account Coordinator',
         imageUrl:
            'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 4,
         name: 'Fabricio Andrews',
         role: 'Senior Art Director',
         imageUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   B: [
      {
         id: 5,
         name: 'Angela Beaver',
         role: 'Chief Strategy Officer',
         imageUrl:
            'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 6,
         name: 'Yvette Blanchard',
         role: 'Studio Artist',
         imageUrl:
            'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 7,
         name: 'Lawrence Brooks',
         role: 'Content Specialist',
         imageUrl:
            'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   C: [
      {
         id: 8,
         name: 'Jeffrey Clark',
         role: 'Senior Art Director',
         imageUrl:
            'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 9,
         name: 'Kathryn Cooper',
         role: 'Associate Creative Director',
         imageUrl:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   E: [
      {
         id: 10,
         name: 'Alicia Edwards',
         role: 'Junior Copywriter',
         imageUrl:
            'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 11,
         name: 'Benjamin Emerson',
         role: 'Director, Print Operations',
         imageUrl:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 12,
         name: 'Jillian Erics',
         role: 'Designer',
         imageUrl:
            'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 13,
         name: 'Chelsea Evans',
         role: 'Human Resources Manager',
         imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   G: [
      {
         id: 14,
         name: 'Michael Gillard',
         role: 'Co-Founder / CTO',
         imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 15,
         name: 'Dries Giuessepe',
         role: 'Manager, Business Relations',
         imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   M: [
      {
         id: 16,
         name: 'Jenny Harrison',
         role: 'Studio Artist',
         imageUrl:
            'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 17,
         name: 'Lindsay Hatley',
         role: 'Front-end Developer',
         imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 18,
         name: 'Anna Hill',
         role: 'Partner, Creative',
         imageUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   S: [
      {
         id: 19,
         name: 'Courtney Samuels',
         role: 'Designer',
         imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 20,
         name: 'Tom Simpson',
         role: 'Director, Product Development',
         imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   T: [
      {
         id: 21,
         name: 'Floyd Thompson',
         role: 'Principal Designer',
         imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 22,
         name: 'Leonard Timmons',
         role: 'Senior Designer',
         imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 23,
         name: 'Whitney Trudeau',
         role: 'Copywriter',
         imageUrl:
            'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   W: [
      {
         id: 24,
         name: 'Kristin Watson',
         role: 'VP, Human Resources',
         imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
         id: 25,
         name: 'Emily Wilson',
         role: 'VP, User Experience',
         imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
   Y: [
      {
         id: 26,
         name: 'Emma Young',
         role: 'Senior Front-end Developer',
         imageUrl:
            'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   ],
};

const team = [
   {
      name: 'Leslie Alexander',
      handle: 'lesliealexander',
      role: 'Co-Founder / CEO',
      imageUrl:
         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Michael Foster',
      handle: 'michaelfoster',
      role: 'Co-Founder / CTO',
      imageUrl:
         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Dries Vincent',
      handle: 'driesvincent',
      role: 'Manager, Business Relations',
      imageUrl:
         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Lindsay Walton',
      handle: 'lindsaywalton',
      role: 'Front-end Developer',
      imageUrl:
         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
];

const organization = {
   name: 'ChainRaise',
   imageUrl: '/chainraise_logo.png',
   coverImageUrl: '',
   about: `
     <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
     <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
   `,
   fields: {
      Phone: '(555) 123-4567',
      Email: 'ricardocooper@example.com',
      Title: 'Senior Front-End Developer',
      Team: 'Product Development',
      Location: 'San Francisco',
      Sits: 'Oasis, 4th floor',
      Salary: '$145,000',
      Birthday: 'June 8, 1990',
   },
};

const tabs = [
   { name: 'Profile', href: '#', current: true },
   { name: 'Calendar', href: '#', current: false },
   { name: 'Recognition', href: '#', current: false },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Organizations() {
   const [open, setOpen] = useState(false);
   const [organizationSelected, setOrganizationSelected] = useState(false);

   return (
      <>
         <Header />
         <div className="inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
         </div>
         <div className="flex h-full">
            <div className="relative z-0 flex flex-1 overflow-hidden">
               <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                  {/* Breadcrumb */}
                  <nav
                     className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                     aria-label="Breadcrumb"
                  >
                     <a
                        href="#"
                        className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                     >
                        <ChevronLeftIcon
                           className="-ml-2 h-5 w-5 text-gray-400"
                           aria-hidden="true"
                        />
                        <span>Directory</span>
                     </a>
                  </nav>

                  <article>
                     {organizationSelected ? (
                        <>
                           <div>
                              <div>
                                 {organization.coverImageUrl ? (
                                    <img
                                       className="h-32 w-full object-cover lg:h-48"
                                       src={organization.coverImageUrl}
                                       alt=""
                                    />
                                 ) : (
                                    <div className="h-32 w-full object-cover lg:h-48"></div>
                                 )}
                              </div>
                              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                 <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                    <div className="flex">
                                       <img
                                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                          src={organization.imageUrl}
                                          alt=""
                                       />
                                    </div>
                                    <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                       <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                          <h1 className="truncate text-2xl font-bold text-gray-900">
                                             {organization.name}
                                          </h1>
                                       </div>
                                       <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                          <button
                                             type="button"
                                             className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                          >
                                             <MailIcon
                                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                             />
                                             <span>Message</span>
                                          </button>
                                          <button
                                             type="button"
                                             className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                          >
                                             <PhoneIcon
                                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                             />
                                             <span>Call</span>
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                    <h1 className="truncate text-2xl font-bold text-gray-900">
                                       {organization.name}
                                    </h1>
                                 </div>
                              </div>
                           </div>

                           <div className="mt-6 sm:mt-2 2xl:mt-5">
                              <div className="border-b border-gray-200">
                                 <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                    <nav
                                       className="-mb-px flex space-x-8"
                                       aria-label="Tabs"
                                    >
                                       {tabs.map((tab) => (
                                          <a
                                             key={tab.name}
                                             href={tab.href}
                                             className={classNames(
                                                tab.current
                                                   ? 'border-pink-500 text-gray-900'
                                                   : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                             )}
                                             aria-current={
                                                tab.current ? 'page' : undefined
                                             }
                                          >
                                             {tab.name}
                                          </a>
                                       ))}
                                    </nav>
                                 </div>
                              </div>
                           </div>

                           <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                 {Object.keys(organization.fields).map(
                                    (field) => (
                                       <div
                                          key={field}
                                          className="sm:col-span-1"
                                       >
                                          <dt className="text-sm font-medium text-gray-500">
                                             {field}
                                          </dt>
                                          <dd className="mt-1 text-sm text-gray-900">
                                             {/* ignore for now, this works */}
                                             {/* @ts-ignore */}
                                             {organization.fields[field]}
                                          </dd>
                                       </div>
                                    )
                                 )}
                                 <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                       About
                                    </dt>
                                    <dd
                                       className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                                       dangerouslySetInnerHTML={{
                                          __html: organization.about,
                                       }}
                                    />
                                 </div>
                              </dl>
                           </div>

                           <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                              <h2 className="text-sm font-medium text-gray-500">
                                 Team members
                              </h2>
                              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                 {team.map((person) => (
                                    <div
                                       key={person.handle}
                                       className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                                    >
                                       <div className="flex-shrink-0">
                                          <img
                                             className="h-10 w-10 rounded-full"
                                             src={person.imageUrl}
                                             alt=""
                                          />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <a
                                             href="#"
                                             className="focus:outline-none"
                                          >
                                             <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                             />
                                             <p className="text-sm font-medium text-gray-900">
                                                {person.name}
                                             </p>
                                             <p className="truncate text-sm text-gray-500">
                                                {person.role}
                                             </p>
                                          </a>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </>
                     ) : (
                        <div className="mx-auto max-w-xl pt-20">
                           <div className="text-center">
                              <svg
                                 className="mx-auto h-12 w-12 text-gray-400"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 48 48"
                                 aria-hidden="true"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                                 />
                              </svg>
                              <h2 className="mt-2 text-lg font-medium text-gray-900">
                                 Search for an organization or create your own
                              </h2>
                              <p className="mt-1 text-sm text-gray-500"></p>
                           </div>
                           <form action="#" className="mt-6 flex">
                              <label htmlFor="name" className="sr-only">
                                 Organization Name
                              </label>
                              <input
                                 type="name"
                                 name="name"
                                 id="name"
                                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cr-primary focus:ring-cr-primary sm:text-sm"
                                 placeholder="      Enter your organization name"
                              />
                              <button
                                 type="submit"
                                 className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-cr-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cr-primary focus:outline-none focus:ring-2 focus:ring-cr-primary focus:ring-offset-2"
                              >
                                 Create your organization
                              </button>
                           </form>
                           <div className="mt-2 flex items-center">
                              <div className="mx-auto">
                                 <button
                                    onClick={() => setOpen(true)}
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 underline hover:font-bold hover:underline-offset-1 focus:outline-none"
                                 >
                                    Got an invite code?
                                    <div>
                                       <ArrowRightIcon className="text-gray-700" />
                                    </div>
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}
                  </article>
               </main>
               <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
                  <div className="px-6 pt-6 pb-4">
                     <h2 className="text-lg font-medium text-gray-900">
                        Directory
                     </h2>
                     <p className="mt-1 text-sm text-gray-600">
                        Search our directory of supported organizations
                     </p>
                     <form className="mt-6 flex space-x-4" action="#">
                        <div className="min-w-0 flex-1">
                           <label htmlFor="search" className="sr-only">
                              Search
                           </label>
                           <div className="relative rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                 <SearchIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                 />
                              </div>
                              <input
                                 type="search"
                                 name="search"
                                 id="search"
                                 className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                                 placeholder="Search"
                              />
                           </div>
                        </div>
                        <button
                           type="submit"
                           className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                           <FilterIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                           />
                           <span className="sr-only">Search</span>
                        </button>
                     </form>
                  </div>
                  {/* Directory list */}
                  <nav
                     className="min-h-0 flex-1 overflow-y-auto"
                     aria-label="Directory"
                  >
                     {Object.keys(directory).map((letter) => (
                        <div key={letter} className="relative">
                           <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                              <h3>{letter}</h3>
                           </div>
                           <ul
                              role="list"
                              className="relative z-0 divide-y divide-gray-200"
                           >
                              {/* ignore for now, this works */}
                              {/* @ts-ignore */}
                              {directory[letter].map((person) => (
                                 <li
                                    key={person.id}
                                    onClick={() =>
                                       setOrganizationSelected(true)
                                    }
                                 >
                                    <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                                       <div className="flex-shrink-0">
                                          <img
                                             className="h-10 w-10 rounded-full"
                                             src={person.imageUrl}
                                             alt=""
                                          />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <a
                                             href="#"
                                             className="focus:outline-none"
                                          >
                                             {/* Extend touch target to entire panel */}
                                             <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                             />
                                             <p className="text-sm font-medium text-gray-900">
                                                {person.name}
                                             </p>
                                             <p className="truncate text-sm text-gray-500">
                                                {person.role}
                                             </p>
                                          </a>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </nav>
               </aside>
            </div>
            <Transition.Root show={open} as={Fragment}>
               <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                       Enter your invitation code below
                                    </Dialog.Title>
                                    <div className="mx-auto mt-2">
                                       <div>
                                          <label
                                             htmlFor="invite-code"
                                             className="sr-only"
                                          >
                                             Invitation Code
                                          </label>
                                          <input
                                             type="invite-code"
                                             name="invite-code"
                                             id="invite-code"
                                             className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             placeholder="ABC123"
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="mt-5 sm:mt-6">
                                 <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                 >
                                    Submit code
                                 </button>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition.Root>
         </div>
      </>
   );
}
