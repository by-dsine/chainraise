import { Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import Header from '../../components/navigation/Header';
import { MainTab } from '../../components/organizations/MainTab';
import { ManageTab } from '../../components/organizations/ManageTab';
import { TeamTab } from '../../components/organizations/TeamTab';

const organization = {
   name: 'ChainRaise',
   email: 'info@chainraise.io',
   role: 'Human Resources Manager',
   imageUrl: '/chainraise_logo.png',
   description: 'oooooh gibberish lorem ipsum yeah we do stuff and make money',
};

const navigation = ['Home', 'Team', 'Manage'];

const userNavigation = [
   { name: 'Your Profile', href: '#' },
   { name: 'Settings', href: '#' },
   { name: 'Sign out', href: '#' },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function OfferingPage() {
   const [tab, setTab] = useState('Home');
   return (
      <>
         <Header />

         <div className="min-h-full">
            <Popover
               as="header"
               className="bg-gradient-to-l from-cr-secondary to-cr-primary pb-24"
            >
               {({ open }) => (
                  <>
                     <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                           <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                              <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
                                 {/* Left nav */}
                                 <div className="hidden lg:col-span-2 lg:block">
                                    <nav className="flex space-x-4">
                                       {navigation.map((item) => (
                                          <a
                                             key={item}
                                             className={classNames(
                                                tab == item
                                                   ? 'text-white'
                                                   : 'text-cyan-100',
                                                'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10'
                                             )}
                                             onClick={() => setTab(item)}
                                          >
                                             {item}
                                          </a>
                                       ))}
                                    </nav>
                                 </div>
                                 {/* <div className="px-12 lg:px-0">
                                    <div className="mx-auto w-full max-w-xs lg:max-w-md">
                                       <label
                                          htmlFor="search"
                                          className="sr-only"
                                       >
                                          Search
                                       </label>
                                       <div className="relative text-white focus-within:text-gray-600">
                                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                             <SearchIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                             />
                                          </div>
                                          <input
                                             id="search"
                                             className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-white placeholder-white focus:border-transparent focus:bg-opacity-100 focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                                             placeholder="Search"
                                             type="search"
                                             name="search"
                                          />
                                       </div>
                                    </div>
                                 </div> */}
                              </div>
                           </div>

                           {/* Menu button */}
                           <div className="absolute right-0 flex-shrink-0 lg:hidden">
                              {/* Mobile menu button */}
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 ) : (
                                    <MenuIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 )}
                              </Popover.Button>
                           </div>
                        </div>
                     </div>

                     <Transition.Root as={Fragment}>
                        <div className="lg:hidden">
                           <Transition.Child
                              as={Fragment}
                              enter="duration-150 ease-out"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="duration-150 ease-in"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                           >
                              <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                           </Transition.Child>

                           <Transition.Child
                              as={Fragment}
                              enter="duration-150 ease-out"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="duration-150 ease-in"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                           >
                              <Popover.Panel
                                 focus
                                 className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                              >
                                 <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="pt-3 pb-2">
                                       <div className="flex items-center justify-between px-4">
                                          <div>
                                             <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                                alt="Workflow"
                                             />
                                          </div>
                                          <div className="-mr-2">
                                             <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                                <span className="sr-only">
                                                   Close menu
                                                </span>
                                                <XIcon
                                                   className="h-6 w-6"
                                                   aria-hidden="true"
                                                />
                                             </Popover.Button>
                                          </div>
                                       </div>
                                       <div className="mt-3 space-y-1 px-2">
                                          {navigation.map((item) => (
                                             <a
                                                key={item}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                onClick={() => setTab(item)}
                                             >
                                                {item}
                                             </a>
                                          ))}
                                       </div>
                                    </div>
                                    <div className="pt-4 pb-2">
                                       <div className="flex items-center px-5">
                                          <div className="flex-shrink-0">
                                             <img
                                                className="h-10 w-10 rounded-full"
                                                src={organization.imageUrl}
                                                alt=""
                                             />
                                          </div>
                                          <div className="ml-3 min-w-0 flex-1">
                                             <div className="truncate text-base font-medium text-gray-800">
                                                {organization.name}
                                             </div>
                                             <div className="truncate text-sm font-medium text-gray-500">
                                                {organization.email}
                                             </div>
                                          </div>
                                          <button
                                             type="button"
                                             className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                          >
                                             <span className="sr-only">
                                                View notifications
                                             </span>
                                             <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                             />
                                          </button>
                                       </div>
                                       <div className="mt-3 space-y-1 px-2">
                                          {userNavigation.map((item) => (
                                             <a
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                             >
                                                {item.name}
                                             </a>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </Popover.Panel>
                           </Transition.Child>
                        </div>
                     </Transition.Root>
                  </>
               )}
            </Popover>
            <main className="-mt-24 pb-8">
               <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  {tab == 'Home' && <MainTab />}
                  {tab == 'Team' && <TeamTab />}
                  {tab == 'Manage' && <ManageTab />}
               </div>
            </main>
            <footer>
               <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                     <span className="block sm:inline">
                        &copy; 2021 Tailwind Labs Inc.
                     </span>{' '}
                     <span className="block sm:inline">
                        All rights reserved.
                     </span>
                  </div>
               </div>
            </footer>
         </div>
      </>
   );
}
