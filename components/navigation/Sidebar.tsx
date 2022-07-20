import {
   CashIcon,
   HomeIcon,
   NewspaperIcon,
   UserCircleIcon,
} from '@heroicons/react/outline';

const navigation = [
   { name: 'Home', href: '/profile', icon: HomeIcon, current: true },
   {
      name: 'Feed',
      href: '/feed',
      icon: NewspaperIcon,
      current: false,
   },
   {
      name: 'My Info',
      href: '/profile/my-info',
      icon: UserCircleIcon,
      current: false,
   },
   {
      name: 'Payments',
      href: '/profile/my-info/payments',
      icon: CashIcon,
      current: false,
   },
];

const communities = [
   { name: 'Movies', href: '#' },
   { name: 'Food', href: '#' },
   { name: 'Sports', href: '#' },
   { name: 'Animals', href: '#' },
   { name: 'Science', href: '#' },
   { name: 'Dinosaurs', href: '#' },
   { name: 'Talents', href: '#' },
   { name: 'Gaming', href: '#' },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export const Sidebar = () => {
   return (
      <nav
         aria-label="Sidebar"
         className="sticky top-4 divide-y divide-gray-300"
      >
         <div className="space-y-1 pb-8">
            {navigation.map((item) => (
               <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                     item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50',
                     'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
               >
                  <item.icon
                     className={classNames(
                        item.current
                           ? 'text-gray-500'
                           : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                     )}
                     aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
               </a>
            ))}
         </div>
         {/* <div className="pt-10">
            <p
               className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
               id="communities-headline"
            >
               My communities
            </p>
            <div
               className="mt-3 space-y-2"
               aria-labelledby="communities-headline"
            >
               {communities.map((community) => (
                  <a
                     key={community.name}
                     href={community.href}
                     className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                     <span className="truncate">{community.name}</span>
                  </a>
               ))}
            </div>
         </div> */}
      </nav>
   );
};
