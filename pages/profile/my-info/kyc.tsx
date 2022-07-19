import Header from '../../../components/navigation/Header';
import { Sidebar } from '../../../components/navigation/Sidebar';

const user = {
   name: 'Chelsea Hagon',
   email: 'chelsea.hagon@example.com',
   imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const tabs = [
   { name: 'Contact Info', href: '/profile/my-info', current: false },
   { name: 'KYC/AML', href: '/profile/my-info/kyc', current: true },
   {
      name: 'Accreditation',
      href: '/profile/my-info/accreditation',
      current: false,
   },
];

const people = [
   {
      name: 'license.png',
      size: '10 MB',
      status: 'In Review',
   },
   // More people...
];

const whoToFollow = [
   {
      name: 'Leonard Krasner',
      handle: 'leonardkrasner',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   // More people...
];
const trendingPosts = [
   {
      id: 1,
      user: {
         name: 'Floyd Miles',
         imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
      comments: 291,
   },
   // More posts...
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function ProfileInfo() {
   return (
      <>
         <Header />
         <div className="min-h-full">
            <div className="py-10">
               <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
                  <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                     <Sidebar />
                  </div>
                  <main className="lg:col-span-7 xl:col-span-8">
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
                        <form action="#" method="POST">
                           <div className="shadow sm:overflow-hidden sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                 <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
                                    <dl className="sm:divide-y sm:divide-gray-200">
                                       <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                          <dt className="text-sm font-medium text-gray-500">
                                             KYC Status
                                          </dt>
                                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                             Needs Attention
                                          </dd>
                                       </div>
                                    </dl>
                                 </div>

                                 <div className="mt-2 px-4">
                                    <div className="sm:flex sm:items-center">
                                       <div className="sm:flex-auto">
                                          <h1 className="text-xl font-semibold text-gray-900">
                                             Documents
                                          </h1>
                                          <p className="mt-2 text-sm text-gray-700">
                                             Manage documents for KYC
                                             verification
                                          </p>
                                       </div>
                                       <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                          <button
                                             type="button"
                                             className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                          >
                                             New document
                                          </button>
                                       </div>
                                    </div>
                                    <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                                       <table className="min-w-full divide-y divide-gray-300">
                                          <thead className="bg-gray-50">
                                             <tr>
                                                <th
                                                   scope="col"
                                                   className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                >
                                                   Name
                                                </th>
                                                <th
                                                   scope="col"
                                                   className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                                >
                                                   Size
                                                </th>
                                                <th
                                                   scope="col"
                                                   className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                                >
                                                   Status
                                                </th>
                                                <th
                                                   scope="col"
                                                   className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                >
                                                   <span className="sr-only">
                                                      Edit
                                                   </span>
                                                </th>
                                                <th
                                                   scope="col"
                                                   className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                >
                                                   <span className="sr-only">
                                                      Remove
                                                   </span>
                                                </th>
                                             </tr>
                                          </thead>
                                          <tbody className="divide-y divide-gray-200 bg-white">
                                             {people.map((person) => (
                                                <tr key={person.status}>
                                                   <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                                      {person.name}
                                                      <dl className="font-normal lg:hidden">
                                                         <dt className="sr-only">
                                                            Title
                                                         </dt>
                                                         <dd className="mt-1 truncate text-gray-700">
                                                            {person.size}
                                                         </dd>
                                                         <dt className="sr-only sm:hidden">
                                                            Email
                                                         </dt>
                                                         <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                                            {person.status}
                                                         </dd>
                                                      </dl>
                                                   </td>
                                                   <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                                      {person.size}
                                                   </td>
                                                   <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                      {person.status}
                                                   </td>
                                                   <td className="py-4 px-1 text-right text-sm font-medium sm:px-2">
                                                      <a
                                                         href="#"
                                                         className="text-indigo-600 hover:text-indigo-900"
                                                      >
                                                         Edit
                                                         <span className="sr-only">
                                                            , {person.name}
                                                         </span>
                                                      </a>
                                                   </td>
                                                   <td className="py-4 px-1 text-right text-sm font-medium sm:px-2 sm:pr-4">
                                                      <a
                                                         href="#"
                                                         className="text-indigo-600 hover:text-indigo-900"
                                                      >
                                                         Remove
                                                         <span className="sr-only">
                                                            , {person.name}
                                                         </span>
                                                      </a>
                                                   </td>
                                                </tr>
                                             ))}
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  </main>
               </div>
            </div>
         </div>
      </>
   );
}
