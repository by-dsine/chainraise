import { Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import Header from '../../components/navigation/Header';
import { MainTab } from '../../components/organizations/MainTab';

const organization = {
   name: 'ChainRaise',
   email: 'info@chainraise.io',
   role: 'Human Resources Manager',
   imageUrl: '/chainraise_logo.png',
   description: 'oooooh gibberish lorem ipsum yeah we do stuff and make money',
};

const navigation = ['Home', 'Communications', 'Links', 'Manage'];

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
               className="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24"
            >
               {({ open }) => (
                  <>
                     <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                           {/* Logo */}
                           <div className="absolute left-0 flex-shrink-0 py-5 lg:static">
                              <a href="#">
                                 <span className="sr-only">Workflow</span>
                                 {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                                 <svg
                                    className="h-8 w-auto"
                                    fill="none"
                                    viewBox="0 0 35 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       fill="#A5F3FC"
                                       d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
                                    />
                                 </svg>
                              </a>
                           </div>

                           {/* Right section on desktop */}
                           <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5"></div>

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
                                 <div className="px-12 lg:px-0">
                                    {/* Search */}
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
                                 </div>
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
