import { CheckCircleIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Header from '../../components/navigation/Header';
import { Sidebar } from '../../components/navigation/Sidebar';

const user = {
   name: 'Chelsea Hagon',
   email: 'chelsea.hagon@example.com',
   imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const tabs = [
   { name: 'Transactions', href: '/profile', current: true },
   { name: 'Transactions', href: '/profile/transactions', current: false },
];

const transactions = [
   {
      id: 'AAPS0L',
      company: 'Chase & Co.',
      share: 'CAC',
      commission: '+$4.37',
      price: '$3,509.00',
      quantity: '12.00',
      netAmount: '$4,397.00',
   },
   // More transactions...
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
                     <div className="bg-white shadow">
                        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                           <div className="py-6 md:flex md:items-center md:justify-between">
                              <div className="min-w-0 flex-1">
                                 {/* Profile */}
                                 <div className="flex items-center">
                                    <div>
                                       <div className="flex items-center">
                                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                             Welcome to ChainRaise
                                          </h1>
                                       </div>
                                       <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                          <dt className="sr-only">
                                             Account status
                                          </dt>
                                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                             <CheckCircleIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                                aria-hidden="true"
                                             />
                                             Verified account
                                          </dd>
                                       </dl>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-4 bg-white shadow">
                        <form action="#" method="POST">
                           <div className="sm:overflow-hidden sm:rounded-md">
                              <div className="px-4 py-5 sm:p-6">
                                 <div className="mt-2 px-4">
                                    <div className="sm:flex sm:items-center">
                                       <div className="sm:flex-auto">
                                          <h1 className="text-xl font-semibold text-gray-900">
                                             Transactions
                                          </h1>
                                          <p className="mt-2 text-sm text-gray-700">
                                             A table of placeholder stock market
                                             data that does not make any sense.
                                          </p>
                                       </div>
                                       <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                          <button
                                             type="button"
                                             className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                          >
                                             Export
                                          </button>
                                       </div>
                                    </div>
                                    <div className="mt-8 flex flex-col">
                                       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                   <thead className="bg-gray-50">
                                                      <tr>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                         >
                                                            Transaction ID
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Company
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Share
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Commision
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Price
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Quantity
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                         >
                                                            Net amount
                                                         </th>
                                                         <th
                                                            scope="col"
                                                            className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                                                         >
                                                            <span className="sr-only">
                                                               Edit
                                                            </span>
                                                         </th>
                                                      </tr>
                                                   </thead>
                                                   <tbody className="divide-y divide-gray-200 bg-white">
                                                      {transactions.map(
                                                         (transaction) => (
                                                            <tr
                                                               key={
                                                                  transaction.id
                                                               }
                                                            >
                                                               <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                                  {
                                                                     transaction.id
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                                  {
                                                                     transaction.company
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                                                                  {
                                                                     transaction.share
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                                                  {
                                                                     transaction.commission
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                                                  {
                                                                     transaction.price
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                                                  {
                                                                     transaction.quantity
                                                                  }
                                                               </td>
                                                               <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                                                  {
                                                                     transaction.netAmount
                                                                  }
                                                               </td>
                                                               <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                  <DotsHorizontalIcon className="h-4 w-4" />
                                                               </td>
                                                            </tr>
                                                         )
                                                      )}
                                                   </tbody>
                                                </table>
                                             </div>
                                          </div>
                                       </div>
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
