import { SearchIcon } from '@heroicons/react/outline';

const people = [
   {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@example.com',
      role: 'Member',
   },
   // More people...
];

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}
export const TeamTab = () => {
   return (
      <>
         {/* Left column */}
         <div className="flex">
            <main
               className="w-full flex-col"
               aria-labelledby="profile-overview-title"
            >
               <div className="overflow-hidden rounded-lg bg-white shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                     Team Members
                  </h2>
                  <div className="bg-white p-6">
                     <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                           <div className="sm:flex-auto">
                              <h1 className="text-xl font-semibold text-gray-900">
                                 Team Members
                              </h1>
                              <p className="mt-2 text-sm text-gray-700">
                                 A list of all the users that represent your
                                 organization including their name, title, email
                                 and role.
                              </p>
                           </div>
                           <div className="px-12 lg:px-0">
                              <div className="mx-auto w-full max-w-xs lg:max-w-md">
                                 <label htmlFor="search" className="sr-only">
                                    Search
                                 </label>
                                 <div className="relative text-gray-700 focus-within:text-gray-600">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                       <SearchIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                       />
                                    </div>
                                    <input
                                       id="search"
                                       className="block w-full rounded-md border border-cr-primary bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5  placeholder-black focus:border-transparent focus:bg-opacity-100 focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                                       placeholder="Search"
                                       type="search"
                                       name="search"
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                              <button
                                 type="button"
                                 className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                              >
                                 Add user
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
                                       Title
                                    </th>
                                    <th
                                       scope="col"
                                       className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                    >
                                       Email
                                    </th>
                                    <th
                                       scope="col"
                                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                       Role
                                    </th>
                                    <th
                                       scope="col"
                                       className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                       <span className="sr-only">Edit</span>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                 {people.map((person) => (
                                    <tr key={person.email}>
                                       <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                          {person.name}
                                          <dl className="font-normal lg:hidden">
                                             <dt className="sr-only">Title</dt>
                                             <dd className="mt-1 truncate text-gray-700">
                                                {person.title}
                                             </dd>
                                             <dt className="sr-only sm:hidden">
                                                Email
                                             </dt>
                                             <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                                {person.email}
                                             </dd>
                                          </dl>
                                       </td>
                                       <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                          {person.title}
                                       </td>
                                       <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                          {person.email}
                                       </td>
                                       <td className="px-3 py-4 text-sm text-gray-500">
                                          {person.role}
                                       </td>
                                       <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                     Communications
                  </h2>
                  <div className="bg-white p-6">
                     <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                           <div className="sm:flex-auto">
                              <h1 className="text-xl font-semibold text-gray-900">
                                 Communications
                              </h1>
                              <p className="mt-2 text-sm text-gray-700">
                                 Select a team member above to see all of their
                                 public communications.
                              </p>
                           </div>
                           <div className="px-12 lg:px-0">
                              <div className="mx-auto w-full max-w-xs lg:max-w-md">
                                 <label htmlFor="search" className="sr-only">
                                    Search
                                 </label>
                                 <div className="relative text-gray-700 focus-within:text-gray-600">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                       <SearchIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                       />
                                    </div>
                                    <input
                                       id="search"
                                       className="block w-full rounded-md border border-cr-primary bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5  placeholder-black focus:border-transparent focus:bg-opacity-100 focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                                       placeholder="Search"
                                       type="search"
                                       name="search"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                           <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                                 <tr>
                                    <th
                                       scope="col"
                                       className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                       Timestamp
                                    </th>
                                    <th
                                       scope="col"
                                       className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                       Location
                                    </th>
                                    <th
                                       scope="col"
                                       className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                    >
                                       Body
                                    </th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white"></tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
};
