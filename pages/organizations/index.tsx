import { Menu, Transition } from '@headlessui/react';
import {
   ChevronDownIcon,
   ExternalLinkIcon,
   UserAddIcon,
} from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { Fragment } from 'react';
import Header from '../../components/navigation/Header';
import { prisma } from '../../lib/db';

const organizations = [
   {
      name: 'ChainRaise',
      title: 'Crowdfunding Platform',
      role: 'Finance',
      email: 'info@chainraise.io',
      telephone: '+1-202-555-0170',
      imageUrl: '/chainraise_logo.png',
      shortDescription:
         'oooooh gibberish lorem ipsum yeah we do stuff and make money',
   },
   // More people...
];

const sortOptions = [
   { name: 'Most Popular', href: '#', current: true },
   { name: 'Ending Soon', href: '#', current: false },
   { name: 'Newest', href: '#', current: false },
   { name: 'Minimum: Low to High', href: '#', current: false },
   { name: 'Minimum: High to Low', href: '#', current: false },
];

const subCategories = [
   { name: 'Energy', href: '#' },
   { name: 'Fintech & Finance', href: '#' },
   { name: 'Media', href: '#' },
   { name: 'Real Estate', href: '#' },
   { name: 'Technology', href: '#' },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function OfferingLanding() {
   return (
      <div className="min-h-screen bg-gray-100">
         <Header />

         <div className="py-6">
            <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
               <main className="lg:col-span-8">
                  <h1 className="text-3xl font-semibold leading-6 text-gray-900">
                     Invest in the next big opportunity here!
                  </h1>
                  <h2 className="text-l mt-4 leading-6 text-gray-600">
                     All companies are vetted & have passed our due dilligence
                     process.{' '}
                  </h2>
                  <h2 className="text-l leading-6 text-gray-600">
                     {' '}
                     Click{' '}
                     <span className="cursor-pointer text-cyan-500">
                        here
                     </span>{' '}
                     to learn more.
                  </h2>

                  <div className="flex items-center justify-end">
                     <Menu as="div" className="relative z-40 inline-block">
                        <div className="">
                           <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                              Sort
                              <ChevronDownIcon
                                 className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                           <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                 {sortOptions.map((option) => (
                                    <Menu.Item key={option.name}>
                                       {({ active }) => (
                                          <a
                                             href={option.href}
                                             className={classNames(
                                                option.current
                                                   ? 'font-medium text-gray-900'
                                                   : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm'
                                             )}
                                          >
                                             {option.name}
                                          </a>
                                       )}
                                    </Menu.Item>
                                 ))}
                              </div>
                           </Menu.Items>
                        </Transition>
                     </Menu>
                  </div>

                  <hr className="my-4" />
                  <ul
                     role="list"
                     className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                  >
                     {organizations.map((organization) => (
                        <li
                           key={organization.email}
                           className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                        >
                           <div className="flex flex-1 flex-col p-8">
                              <img
                                 className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                                 src={organization.imageUrl}
                                 alt=""
                              />
                              <h3 className="mt-6 text-sm font-medium text-gray-900">
                                 {organization.name}
                              </h3>
                              <dl className="mt-1 flex flex-grow flex-col justify-between">
                                 {/* <dt className="sr-only">Title</dt>
                                 <dd className="text-sm text-gray-500">
                                    {organization.title}
                                 </dd> */}
                                 <dt className="sr-only">Role</dt>
                                 <dd className="mt-3">
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                       {organization.role}
                                    </span>
                                 </dd>
                                 <dt className="sr-only">Description</dt>
                                 <dd className="mt-3">
                                    <span className="text-xs font-medium">
                                       {organization.shortDescription}
                                    </span>
                                 </dd>
                              </dl>
                           </div>
                           <div>
                              <div className="-mt-px flex divide-x divide-gray-200">
                                 <div className="flex w-0 flex-1">
                                    <a
                                       href="#"
                                       className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    >
                                       <UserAddIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                       />
                                       <span className="ml-3">Follow</span>
                                    </a>
                                 </div>
                                 <div className="-ml-px flex w-0 flex-1">
                                    <a
                                       href="/organizations/test-organization"
                                       className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    >
                                       <ExternalLinkIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                       />
                                       <span className="ml-3">Visit</span>
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </main>
               <aside className="mt-36 hidden sm:col-span-4 sm:block">
                  <div className="sticky top-6 space-y-4">
                     <form className="hidden lg:block">
                        <h3 className="sr-only">Categories</h3>
                        <ul
                           role="list"
                           className="space-y-4 border-b pb-6 text-sm font-medium text-gray-900"
                        >
                           {subCategories.map((category) => (
                              <li key={category.name}>
                                 <a href={category.href}>{category.name}</a>
                              </li>
                           ))}
                        </ul>
                     </form>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   var offerings = await prisma.offering.findFirst({
      where: {
         statusId: 3, // "active" status
      },
      select: {
         name: true,
         shortDescription: true,
         slug: true,
         type: true,
         goal: true,
         minimumInvestment: true,
      },
   });

   return {
      props: {},
      revalidate: 60,
   };
};
