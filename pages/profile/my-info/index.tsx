import Header from '../../../components/navigation/Header';
import { Sidebar } from '../../../components/navigation/Sidebar';
import AccountType from '../../../components/profile/my-info/AccountType';
import { useProfileInfoStore } from '../../../lib/zustand/profileStore';

const tabs = [
   { name: 'Contact Info', href: '/profile/my-info', current: true },
   { name: 'KYC/AML', href: '/profile/my-info/kyc', current: false },
   {
      name: 'Accreditation',
      href: '/profile/my-info/accreditation',
      current: false,
   },
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function ProfileInfo() {
   const accountType = useProfileInfoStore((store) => store.accountType);
   const setAccountType = useProfileInfoStore((store) => store.setAccountType);

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
                              <div className="bg-white px-4 pt-5 sm:p-6">
                                 <label className="text-base font-medium text-gray-900">
                                    Account Type
                                 </label>

                                 <div className="flex items-center">
                                    <div className="w-full">
                                       <AccountType />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                     <div className="mt-4">
                        <form action="#" method="POST">
                           <div className="shadow sm:overflow-hidden sm:rounded-md">
                              <div className="bg-white px-4 pt-5 sm:p-6">
                                 <label className="text-base font-medium text-gray-900">
                                    Contact Info
                                 </label>
                              </div>
                              <div className="space-y-6 bg-white px-6">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       {accountType == 'organization'
                                          ? 'Logo'
                                          : 'Photo'}
                                    </label>
                                    <div className="mt-1 flex items-center">
                                       <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                          <svg
                                             className="h-full w-full text-gray-300"
                                             fill="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                          </svg>
                                       </span>
                                       <button
                                          type="button"
                                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                       >
                                          Change
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white px-4 py-5 sm:p-6">
                                 <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          First name
                                       </label>
                                       <input
                                          type="text"
                                          name="first-name"
                                          id="first-name"
                                          autoComplete="given-name"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-1">
                                       <label
                                          htmlFor="middle-initial"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Middle Initial
                                       </label>
                                       <input
                                          type="text"
                                          name="middle-initial"
                                          id="middle-initial"
                                          autoComplete="middle-initial"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Last name
                                       </label>
                                       <input
                                          type="text"
                                          name="last-name"
                                          id="last-name"
                                          autoComplete="family-name"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                       <label
                                          htmlFor="email-address"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Email address
                                       </label>
                                       <input
                                          type="text"
                                          name="email-address"
                                          id="email-address"
                                          autoComplete="email"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                       <label
                                          htmlFor="phone-number"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Phone number
                                       </label>
                                       <input
                                          type="text"
                                          name="phone-number"
                                          id="phone-number"
                                          autoComplete="tel"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="country"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Country
                                       </label>
                                       <select
                                          id="country"
                                          name="country"
                                          autoComplete="country-name"
                                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       >
                                          <option>United States</option>
                                          <option>Canada</option>
                                          <option>Mexico</option>
                                       </select>
                                    </div>

                                    <div className="col-span-6">
                                       <label
                                          htmlFor="street-address"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Address 1
                                       </label>
                                       <input
                                          type="text"
                                          name="street-address"
                                          id="street-address"
                                          autoComplete="street-address"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6">
                                       <label
                                          htmlFor="street-address"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          Address 2
                                       </label>
                                       <input
                                          type="text"
                                          name="street-address"
                                          id="street-address"
                                          autoComplete="street-address"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                       <label
                                          htmlFor="city"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          City
                                       </label>
                                       <input
                                          type="text"
                                          name="city"
                                          id="city"
                                          autoComplete="address-level2"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                       <label
                                          htmlFor="region"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          State / Province
                                       </label>
                                       <input
                                          type="text"
                                          name="region"
                                          id="region"
                                          autoComplete="address-level1"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                       <label
                                          htmlFor="postal-code"
                                          className="block text-sm font-medium text-gray-700"
                                       >
                                          ZIP / Postal code
                                       </label>
                                       <input
                                          type="text"
                                          name="postal-code"
                                          id="postal-code"
                                          autoComplete="postal-code"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                 <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                 >
                                    Save
                                 </button>
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
