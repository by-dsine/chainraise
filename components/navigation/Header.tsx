import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];
const navigation = {
   categories: [
      {
         name: 'Browse Offerings',
         link: '/offerings',
         featured: [
            {
               name: 'New Offerings',
               href: '/offerings',
               imageSrc: '/logomark.png',
               imageAlt:
                  'Models sitting back to back, wearing Basic Tee in black and bone.',
            },
            {
               name: 'Clubs',
               href: '/clubs',
               imageSrc:
                  'https://images.unsplash.com/photo-1550304952-9d1e3444f713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2x1YiUyMHNhbmR3aWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60',
               imageAlt:
                  'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
            },
            {
               name: 'Organizations',
               href: '/organizations',
               imageSrc:
                  'https://media.istockphoto.com/photos/stack-of-hands-unity-and-teamwork-concept-picture-id1289963489?b=1&k=20&m=1289963489&s=170667a&w=0&h=5RZ6cQ5UWYgyjK52ele9lSmyIBem2uMIR66S-1faWSs=',
               imageAlt:
                  'Model wearing minimalist watch with black wristband and white watch face.',
            },
            {
               name: 'Content',
               href: '/blog',
               imageSrc:
                  'https://images.unsplash.com/photo-1513705153361-9bc726c8db67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGlsZSUyMG9mJTIwcGFwZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60',
               imageAlt:
                  'Model opening tan leather long wallet with credit card pockets and cash pouch.',
            },
         ],
      },
   ],
   pages: [{ name: 'Raise', href: '/raise-funds' }],
};

const userNavigation = [
   { name: 'Your Profile', href: '/profile' },
   { name: 'Settings', href: '#' },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Header() {
   const [open, setOpen] = useState(false);
   const router = useRouter();
   const { data: session } = useSession();

   return (
      <>
         {/* Mobile menu */}
         <Transition.Root show={open} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-40 lg:hidden"
               onClose={setOpen}
            >
               <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
               </Transition.Child>

               <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                     as={Fragment}
                     enter="transition ease-in-out duration-300 transform"
                     enterFrom="-translate-x-full"
                     enterTo="translate-x-0"
                     leave="transition ease-in-out duration-300 transform"
                     leaveFrom="translate-x-0"
                     leaveTo="-translate-x-full"
                  >
                     <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div className="flex px-4 pt-5 pb-2">
                           <button
                              type="button"
                              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                              onClick={() => setOpen(false)}
                           >
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                           </button>
                        </div>

                        {/* Links */}
                        <Tab.Group as="div" className="mt-2">
                           <div className="border-b border-gray-200">
                              <Tab.List className="-mb-px flex space-x-8 px-4">
                                 {navigation.categories.map((category) => (
                                    <Tab
                                       key={category.name}
                                       className={({ selected }) =>
                                          classNames(
                                             selected
                                                ? 'border-indigo-600 text-indigo-600'
                                                : 'border-transparent text-gray-900',
                                             'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                          )
                                       }
                                    >
                                       {category.name}
                                    </Tab>
                                 ))}
                              </Tab.List>
                           </div>
                           <Tab.Panels as={Fragment}>
                              {navigation.categories.map((category) => (
                                 <Tab.Panel
                                    key={category.name}
                                    className="space-y-12 px-4 py-6"
                                 >
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                       {category.featured.map((item) => (
                                          <div
                                             key={item.name}
                                             className="group relative"
                                          >
                                             <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                <img
                                                   src={item.imageSrc}
                                                   alt={item.imageAlt}
                                                   className="object-cover object-center"
                                                />
                                             </div>
                                             <a
                                                href={item.href}
                                                className="mt-6 block text-sm font-medium text-gray-900"
                                             >
                                                <span
                                                   className="absolute inset-0 z-10"
                                                   aria-hidden="true"
                                                />
                                                {item.name}
                                             </a>
                                          </div>
                                       ))}
                                    </div>
                                 </Tab.Panel>
                              ))}
                           </Tab.Panels>
                        </Tab.Group>

                        <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                           {navigation.pages.map((page) => (
                              <div key={page.name} className="flow-root">
                                 <a
                                    href={page.href}
                                    className="-m-2 block p-2 font-medium text-gray-900"
                                 >
                                    {page.name}
                                 </a>
                              </div>
                           ))}
                        </div>

                        <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                           {session ? (
                              <>
                                 <div className="flow-root">
                                    <button
                                       onClick={() => signOut()}
                                       className="-m-2 block p-2 font-medium text-gray-900"
                                    >
                                       Your Profile
                                    </button>
                                 </div>
                                 <div className="flow-root">
                                    <button
                                       onClick={() => signOut()}
                                       className="-m-2 block p-2 font-medium text-gray-900"
                                    >
                                       Settings
                                    </button>
                                 </div>
                                 <div className="flow-root">
                                    <button
                                       onClick={() => signOut()}
                                       className="-m-2 block p-2 font-medium text-gray-900"
                                    >
                                       Sign Out
                                    </button>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <div className="flow-root">
                                    <a
                                       href="#"
                                       className="-m-2 block p-2 font-medium text-gray-900"
                                    >
                                       Create an account
                                    </a>
                                 </div>
                                 <div className="flow-root">
                                    <Link
                                       href="/auth/signin"
                                       className="-m-2 block p-2 font-medium text-gray-900"
                                    >
                                       Sign In/Sign Up
                                    </Link>
                                 </div>
                              </>
                           )}
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </Dialog>
         </Transition.Root>

         <header className="relative z-20">
            <nav aria-label="Top">
               <div className="bg-white">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                     <div className="flex h-16 items-center justify-between">
                        {/* Logo (lg+) */}
                        <div className="hidden lg:flex lg:flex-1 lg:items-center">
                           <span className="sr-only">ChainRaise</span>
                           <Link href="/">
                              <img
                                 className="h-8 w-auto cursor-pointer"
                                 src="/chainraise_logo_black_text.png"
                                 alt=""
                              />
                           </Link>
                        </div>

                        <div className="hidden h-full lg:flex">
                           {/* Flyout menus */}
                           <Popover.Group className="inset-x-0 bottom-0 px-4">
                              <div className="flex h-full justify-center space-x-8">
                                 {navigation.categories.map((category) => (
                                    <Popover
                                       key={category.name}
                                       className="flex"
                                    >
                                       {({ open }) => (
                                          <>
                                             <div className="relative flex">
                                                <Popover.Button
                                                   className={classNames(
                                                      open
                                                         ? 'text-cr-primary'
                                                         : 'text-gray-700 hover:text-cr-secondary',
                                                      'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                                   )}
                                                >
                                                   {category.name}
                                                   <span
                                                      className={classNames(
                                                         open
                                                            ? 'bg-indigo-600'
                                                            : '',
                                                         'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                                      )}
                                                      aria-hidden="true"
                                                   />
                                                </Popover.Button>
                                             </div>

                                             <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                             >
                                                <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                                                   {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                   <div
                                                      className="absolute inset-0 top-1/2 bg-white shadow"
                                                      aria-hidden="true"
                                                   />
                                                   {/* Fake border when menu is open */}
                                                   <div
                                                      className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                      aria-hidden="true"
                                                   >
                                                      <div
                                                         className={classNames(
                                                            open
                                                               ? 'bg-gray-200'
                                                               : 'bg-transparent',
                                                            'h-px w-full transition-colors duration-200 ease-out'
                                                         )}
                                                      />
                                                   </div>

                                                   <div className="relative">
                                                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                         <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                                            {category.featured.map(
                                                               (item) => (
                                                                  <div
                                                                     key={
                                                                        item.name
                                                                     }
                                                                     className="group relative"
                                                                  >
                                                                     <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                        <img
                                                                           src={
                                                                              item.imageSrc
                                                                           }
                                                                           alt={
                                                                              item.imageAlt
                                                                           }
                                                                           className="object-cover object-center"
                                                                        />
                                                                     </div>
                                                                     <a
                                                                        href={
                                                                           item.href
                                                                        }
                                                                        className="mt-4 block font-medium text-gray-900"
                                                                     >
                                                                        <span
                                                                           className="absolute inset-0 z-10"
                                                                           aria-hidden="true"
                                                                        />
                                                                        {
                                                                           item.name
                                                                        }
                                                                     </a>
                                                                     <p
                                                                        aria-hidden="true"
                                                                        className="mt-1"
                                                                     >
                                                                        View now
                                                                     </p>
                                                                  </div>
                                                               )
                                                            )}
                                                         </div>
                                                      </div>
                                                   </div>
                                                </Popover.Panel>
                                             </Transition>
                                          </>
                                       )}
                                    </Popover>
                                 ))}

                                 {navigation.pages.map((page) => (
                                    <a
                                       key={page.name}
                                       href={page.href}
                                       className="flex items-center text-sm font-medium text-gray-700 hover:text-cr-secondary"
                                    >
                                       {page.name}
                                    </a>
                                 ))}

                                 {session && (
                                    <>
                                       <div className="my-auto h-8 border border-gray-300"></div>
                                       {userNavigation.map((page) => (
                                          <a
                                             key={page.name}
                                             href={page.href}
                                             className="flex items-center text-sm font-medium text-gray-700 hover:text-cr-secondary"
                                          >
                                             {page.name}
                                          </a>
                                       ))}
                                    </>
                                 )}
                              </div>
                           </Popover.Group>
                        </div>

                        {/* Mobile menu and search (lg-) */}
                        <div className="flex flex-1 items-center lg:hidden">
                           <button
                              type="button"
                              className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                              onClick={() => setOpen(true)}
                           >
                              <span className="sr-only">Open menu</span>
                              <MenuIcon
                                 className="h-6 w-6"
                                 aria-hidden="true"
                              />
                           </button>
                        </div>

                        {/* Logo (lg-) */}
                        <a href="/" className="lg:hidden">
                           <span className="sr-only">Workflow</span>
                           <img
                              src="/chainraise_logo.png"
                              alt="ChainRaise Logo"
                              className="h-8 w-auto"
                           />
                        </a>

                        <div className="flex flex-1 items-center justify-end">
                           {session ? (
                              <button
                                 onClick={() => signOut()}
                                 className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:ml-8 lg:block"
                              >
                                 Sign Out
                              </button>
                           ) : (
                              <Link
                                 href="/auth/signin"
                                 className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:ml-8 lg:block"
                              >
                                 Sign In/Sign Up
                              </Link>
                           )}

                           {session && (
                              <div className="flex items-center lg:ml-8">
                                 <span className="relative inline-block">
                                    <Link href="/profile">
                                       <img
                                          className="h-12 w-12 cursor-pointer rounded-full"
                                          src={
                                             session?.user?.image ||
                                             '/default_user.png'
                                          }
                                          alt=""
                                       />
                                    </Link>

                                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-cr-secondary ring-2 ring-white" />
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </nav>
         </header>
      </>
   );
}
