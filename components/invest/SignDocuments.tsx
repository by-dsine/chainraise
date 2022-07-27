/* This example requires Tailwind CSS v2.0+ */
import {
   CalendarIcon,
   ClockIcon,
   PhotographIcon,
   TableIcon,
   ViewBoardsIcon,
   ViewListIcon,
   PencilIcon,
} from '@heroicons/react/outline';

const items = [
   {
      title: 'Sign your agreement',
      description: 'Please please! Can I get your autograph?!',
      icon: PencilIcon,
      background: 'bg-cr-primary',
   },
   // {
   //   title: 'Create a Calendar',
   //   description: 'Stay on top of your deadlines, or don’t — it’s up to you.',
   //   icon: CalendarIcon,
   //   background: 'bg-yellow-500',
   // },
   // {
   //   title: 'Create a Gallery',
   //   description: 'Great for mood boards and inspiration.',
   //   icon: PhotographIcon,
   //   background: 'bg-green-500',
   // },
   // {
   //   title: 'Create a Board',
   //   description: 'Track tasks in different stages of your project.',
   //   icon: ViewBoardsIcon,
   //   background: 'bg-blue-500',
   // },
   // {
   //   title: 'Create a Spreadsheet',
   //   description: 'Lots of numbers and things — good for nerds.',
   //   icon: TableIcon,
   //   background: 'bg-indigo-500',
   // },
   // {
   //   title: 'Create a Timeline',
   //   description: 'Get a birds-eye-view of your procrastination.',
   //   icon: ClockIcon,
   //   background: 'bg-purple-500',
   // },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Example() {
   return (
      <div>
         <h2 className="text-lg font-medium text-gray-900">Documents</h2>
         <p className="mt-1 text-sm text-gray-500">
            You haven’t created a project yet. Get started by selecting a
            template or start from an empty project.
         </p>
         <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2"
         >
            {items.map((item, itemIdx) => (
               <li key={itemIdx} className="flow-root">
                  <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                     <div
                        className={classNames(
                           item.background,
                           'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
                        )}
                     >
                        <item.icon
                           className="h-6 w-6 text-white"
                           aria-hidden="true"
                        />
                     </div>
                     <div>
                        <h3 className="text-sm font-medium text-gray-900">
                           <a href="#" className="focus:outline-none">
                              <span
                                 className="absolute inset-0"
                                 aria-hidden="true"
                              />
                              {item.title}
                              <span aria-hidden="true"> &rarr;</span>
                           </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                           {item.description}
                        </p>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
         <div className="pt-5">
            <div className="flex justify-end">
               <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
               >
                  Next
               </button>
            </div>
         </div>
      </div>
   );
}
