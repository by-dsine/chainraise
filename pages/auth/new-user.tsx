/* This example requires Tailwind CSS v2.0+ */
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import useOrCreateProfile from '../../hooks/useOrCreateProfile';

const items = [
   {
      name: 'Submit your contact information',
      description:
         'Get your identity verified prior to completing an investment.',
      href: '/profile/my-info',
      iconColor: 'bg-green-500',
      icon: BadgeCheckIcon,
   },
   // {
   //   name: 'Verify your accreditation status',
   //   description: 'Select your accreditation status and submit any necessary documentation.',
   //   href: '#',
   //   iconColor: 'bg-purple-500',
   //   icon: TerminalIcon,
   // },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function NewUser() {
   const { profile, session, isLoading, isError } = useOrCreateProfile();

   return (
      <>
         <div className="mx-auto mt-24 max-w-lg">
            <h2 className="text-lg font-medium text-gray-900">
               Welcome to ChainRaise!
            </h2>
            <p className="mt-1 text-sm text-gray-500">
               Complete the KYC/AML process and verify your accreditation status
               prior to investing.
            </p>
            <ul
               role="list"
               className="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200"
            >
               {items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                     <div className="group relative flex items-start space-x-3 py-4">
                        <div className="flex-shrink-0">
                           <span
                              className={classNames(
                                 item.iconColor,
                                 'inline-flex h-10 w-10 items-center justify-center rounded-lg'
                              )}
                           >
                              <item.icon
                                 className="h-6 w-6 text-white"
                                 aria-hidden="true"
                              />
                           </span>
                        </div>
                        <div className="min-w-0 flex-1">
                           <div className="text-sm font-medium text-gray-900">
                              <a href={item.href}>
                                 <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                 />
                                 {item.name}
                              </a>
                           </div>
                           <p className="text-sm text-gray-500">
                              {item.description}
                           </p>
                        </div>
                        <div className="flex-shrink-0 self-center">
                           <ChevronRightIcon
                              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                           />
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
            <div className="mt-6 flex">
               <Link href="/offerings">
                  <p className="cursor-pointer text-sm font-medium text-cr-primary hover:text-indigo-800">
                     Or begin browsing offerings
                     <span aria-hidden="true"> &rarr;</span>
                  </p>
               </Link>
            </div>
         </div>
      </>
   );
}

// const createProfile = async () => {
//   await prisma.profile.upsert({
//     where: {
//       userId: session?.user.uid
//     },
//     update: {
//       userId: session?.user.uid
//     },
//     create: {
//       userId: session?.user.uid
//     }
//   })
// }
